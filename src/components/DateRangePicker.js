import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  getWeekOfMonth,
  isSameMonth,
  addDays,
} from 'date-fns';
import LeftArrow from '../assets/images/property/left.svg';
import RightArrow from '../assets/images/property/right.svg';
import { fetchBookedDatesFromBackend } from './api';



const DateRangePicker = ({ initialStartDate, initialEndDate, residenceId,returnData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate : new Date());
  const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate : new Date());
  const [totalNights, setTotalNights] = useState(0);
  const [bookedDates, setBookedDates] = useState([]); // To store booked dates from the backend
  const datePickerRef = useRef(null);
  const [fetchComplete, setFetchComplete] = useState(false);

  const weekdaysShort = ['Sun' ,'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    console.log("StartDate",startDate)
    console.log("EndDate", endDate)
    // Fetch booked dates from the backend
    fetchBookedDatesFromBackend(residenceId).then((data) => {
      console.log("Dates",data)
      setBookedDates(data); // Assuming the data contains booked dates in an array
      setFetchComplete(true);
    });
  }, [startDate, endDate, residenceId]);

  const isBetweenBookedDates = (startDate, endDate) => {
    // Check if any of the bookedDates lie between the startDate and endDate
    return bookedDates.some((bookedDate) => {
      const date = new Date(bookedDate);
  
      // Check if the booked date falls within the range (inclusive)
      return date >= startDate && date <= endDate;
    });
  };

  const isBooked = (day) => {
    // Check if the clicked day is in the bookedDates array
    console.log("Booked Dates", bookedDates)
    return bookedDates.some((bookedDate) => isSameDay(day, new Date(bookedDate)));
  };
  

  const handleDateClick = (day) => {
    if (isBetweenBookedDates(day) || day < new Date()) {
      console.log('Booked or past date')
      return; // Do nothing for booked or past dates
    }
    if (startDate === null) {
      // Set the start date if it hasn't been selected yet
      console.log(format(day, 'e'));
      setStartDate(day);
      setEndDate(null); // Clear the end date
    } else if (endDate === null) {
      // Set the end date if the start date has been selected
      if (day >= startDate) {
        if (isBetweenBookedDates(startDate, day) || day < new Date()) {
          console.log('Booked or past date')
          return; // Do nothing for booked or past dates
        }
        setEndDate(day);
        setTotalNights((day.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        returnData({startDate:startDate, endDate:day, totalNights:(day.getTime() - startDate.getTime()) / (1000 * 3600 * 24)});
      } else {
        setStartDate(day);
        setEndDate(null);
      }
    } else {
      // Clear both start and end dates if both have been selected
      setStartDate(null);
      setEndDate(null);
      setStartDate(day);
    }
    console.log(startDate)
    console.log(endDate)
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthStartDate = startOfWeek(monthStart);
  const monthEndDate = endOfWeek(monthEnd);

  const days = [];
  let day = monthStartDate;

  while (day <= monthEndDate) {
    days.push(day);
    day = addDays(day, 1);
  }


  const isWithinRange = (day) => {
    if (startDate === null || endDate === null) {return false} 

    //Day is in the week of the end date
    return startDate.getTime() <= day.getTime() && day.getTime() <= endDate.getTime()
   }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  return (
    <div>{ fetchComplete ?
    <div className='m-3 sm:mt-10 lg:mt-0 bg-white border border-gray-300'>
    <div className='text-lg font-custom font-bold pl-5'>{
      //End date - Start date
      startDate === null || endDate === null ? 'Select the Date Range' :
      totalNights + ' Nights in Apetite De Bone'
    }</div>
    <div className='text-sms pl-5'>{`${
      startDate === null ? '' : format(startDate, 'dd MMMM')
    } - ${
      endDate === null ? '' : format(endDate, 'dd MMMM')
    }`}</div>
    <div className=" p-5 h-min lg:h-full  rounded-md shadow-lg" ref={datePickerRef}>
      <div>
        <div className="flex items-center justify-between py-2">
          <span className="font-custom font-normal text-md">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <div className="flex justify-end gap-2">
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              onClick={handlePrevMonth}
            >
              <img src={LeftArrow} alt="left arrow" className="w-5 h-5" />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              onClick={handleNextMonth}
            >
              <img src={RightArrow} alt="right arrow" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex mb-2 justify-around">
        {weekdaysShort.map((day) => (
          <div key={day} className="w-12 text-center text-sm text-gray-600 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
{days.map((day) => (
  <div className="py-2 flex justify-center items-center">
    <div
      key={day}
      className={`flex w-full items-center justify-center cursor-pointer ${
        !isSameMonth(day, monthStart) ? 'text-gray-500' : ''
      } ${
        isBooked(day) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : ''
      } ${
        isSameDay(day, startDate)
          ? 'bg-black text-white rounded-l-2xl'
          : isSameDay(day, endDate)
          ? 'bg-black text-white rounded-r-2xl'
          : (startDate === null || endDate === null)
          ? ''
          : isWithinRange(day) &&
            getWeekOfMonth(day) !== getWeekOfMonth(endDate)
          ? format(day, 'e') === '1'
            ? 'bg-gradient-to-r from-black/70 to-black/60 rounded-l-2xl'
            : format(day, 'e') === '2'
            ? 'bg-gradient-to-r from-black/60 to-black/50'
            : format(day, 'e') === '3'
            ? 'bg-gradient-to-r from-black/50 to-black/40'
            : format(day, 'e') === '4'
            ? 'bg-gradient-to-r from-black/40 to-black/30'
            : format(day, 'e') === '5'
            ? 'bg-gradient-to-r from-black/30 to-black/20'
            : format(day, 'e') === '6'
            ? 'bg-gradient-to-r from-black/20 to-black/10'
            : format(day, 'e') === '7'
            ? 'bg-gradient-to-r from-black/10 to-black/0 rounded-r-2xl'
            : ''
          : isWithinRange(day) && getWeekOfMonth(day) === getWeekOfMonth(endDate)
          ? format(day, 'e') === '7'
            ? 'bg-gradient-to-l from-black/70 to-black/60 rounded-r-2xl'
            : format(day, 'e') === '6'
            ? 'bg-gradient-to-l from-black/60 to-black/50'
            : format(day, 'e') === '5'
            ? 'bg-gradient-to-l from-black/50 to-black/40'
            : format(day, 'e') === '4'
            ? 'bg-gradient-to-l from-black/40 to-black/30'
            : format(day, 'e') === '3'
            ? 'bg-gradient-to-l from-black/30 to-black/20'
            : format(day, 'e') === '2'
            ? 'bg-gradient-to-l from-black/20 to-black/10'
            : format(day, 'e') === '1'
            ? 'bg-gradient-to-l from-black/10 to-black/0 rounded-l-2xl'
            : ''
          : ''
      }`}
      onClick={() => handleDateClick(day)}
    >
      {format(day, 'd')}
    </div>
  </div>
))}

      </div>
    </div>
    </div>
    : <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>  
    }
    </div>
  );
};

DateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default DateRangePicker;