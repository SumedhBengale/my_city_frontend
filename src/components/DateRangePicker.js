import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {format,addMonths,subMonths,startOfMonth,endOfMonth,startOfWeek,endOfWeek,isSameDay,getWeekOfMonth,isSameMonth,addDays,} from 'date-fns';
import LeftArrow from '../assets/images/property/left.svg';
import RightArrow from '../assets/images/property/right.svg';
import { fetchBookedDatesFromBackend } from './api';
import { ToastContainer, toast } from 'react-toastify';

const DateRangePicker = ({ initialStartDate, initialEndDate, bookedDatesData, residenceId,returnData, blockBooking }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate : new Date());
  const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate : new Date());
  const [totalNights, setTotalNights] = useState(initialStartDate && initialEndDate ? (initialEndDate.getTime() - initialStartDate.getTime()) / (1000 * 3600 * 24) : 0);
  const [bookedDates, setBookedDates] = useState(bookedDatesData ? bookedDatesData : null); // To store booked dates from the backend
  const datePickerRef = useRef(null);
  const [fetchComplete, setFetchComplete] = useState(false);
  const weekdaysShort = ['Sun' ,'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    //print initial start date and end date
    console.log("Initial Start Date", initialStartDate)
    console.log("Initial End Date", initialEndDate)
    // Fetch booked dates from the backend
    try{
      bookedDates === null &&
    fetchBookedDatesFromBackend(residenceId, format(startDate, 'yyyy-MM-dd'), format(
      //1 year from start date
      new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1)
      , 'yyyy-MM-dd')).then((data) => {
      // for data.availiability array, if data.availabiliy[i] is not present in bookedDates, add it to bookedDates
      console.log("Dates Data", data)
      setBookedDates(data);
      if(bookedDatesBetween(startDate, endDate, data)){
        console.log("Booked Dates Between")
        //Check if any toast is already being displayed, if not display toast
        if(!toast.isActive('bookedDatesBetween')){
          toast.error('The dates you selected are not available', {toastId: 'bookedDatesBetween'})
        }
        blockBooking(true)
        setFetchComplete(true);
        return;
      }else{
        setFetchComplete(true);
      }
      return;
    });

    if(bookedDatesBetween(startDate, endDate, bookedDates)){
      console.log("Booked Dates Between")
      //Check if any toast is already being displayed, if not display toast
      if(!toast.isActive('bookedDatesBetween')){
        toast.error('The dates you selected are not available', {toastId: 'bookedDatesBetween'})
      }
      blockBooking(true)
      setFetchComplete(true);
      return;
    }else{
      setFetchComplete(true);
    }

  } catch (error) {
    console.error('Error fetching booked dates:', error);
    setFetchComplete(true);
  }
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthStartDate = startOfWeek(monthStart);
  const monthEndDate = endOfWeek(monthEnd);

  const isBooked = (day) => {
    if (bookedDates === null) {return false} 
    // Check if the day is present in the bookedDates array
    if (bookedDates.find((bookedDate) => format(day, 'yyyy-MM-dd') === bookedDate)) {
      return true;
    }
  }


  const days = []
  let day = monthStartDate;

  // Loop from month start date to month end date, adding 1 day each time, add the data for each day from the bookedDates array to the days array and return the days array
  while (day <= monthEndDate) {
    let dayData = {
      date: day,
      booked: isBooked(day),
    };
    days.push(dayData);
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

  const bookedDatesBetween = (startDate, endDate, data) => {
        // If there are booked dates between start date and end date, return true
    if (data === null) {return false}
    for (let i = 0; i < data.length; i++) {
      if (startDate.getTime() <= new Date(data[i]).getTime() && new Date(data[i]).getTime() <= endDate.getTime()) {
        return true;
      }
    }
    return false;
  }


  const handleDateClick = (day) => {
    if (isBooked(day)) {
      console.log('Date is booked')
      //show toast only if no other toast is being displayed
      if(!toast.isActive('bookedDate')){
        toast.error('Date is booked', {toastId: 'bookedDate'})
      }
      return; // Do nothing for booked or past dates
    }
    if(
      //compare only the date part
      format(day, 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')
    ){
      console.log(format(day, 'dddd-MM-yyyy'))
      console.log(format(new Date(), 'dddd-MM-yyyy'))
      console.log('Date is in the past')
      //show toast only if no other toast is being displayed
      if(!toast.isActive('pastDate')){
        toast.error('Date is in the past', {toastId: 'pastDate'})
      }
      return;
    }
    //If date is equal to start date, clear start date
    if (isSameDay(day, startDate)) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    if (startDate === null) {
      setStartDate(day);
      setEndDate(null); // Clear the end date
    } else if (endDate === null) {
      if (bookedDatesBetween(startDate, day, bookedDates)) {
        console.log('Booked dates between start date and end date')
        //show toast only if no other toast is being displayed
        if(!toast.isActive('bookedDatesBetween')){
          toast.error('The dates you selected are not available', {toastId: 'bookedDatesBetween'})
        }
        blockBooking(true)
        return; // Do nothing if there are booked dates between start date and end date
      }
      if (day >= startDate) {
        setEndDate(day);
        setTotalNights((day.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        blockBooking(false)
        returnData({startDate:startDate, endDate:day, totalNights:(day.getTime() - startDate.getTime()) / (1000 * 3600 * 24)});
      } else {
        setStartDate(day);
        setEndDate(null);
      }
    } else {
      // Clear both start and end dates if both have been selected
      //Check if any date is booked in between
      setStartDate(null);
      setEndDate(null);
      setStartDate(day);
    }
    console.log(startDate)
    console.log(endDate)
  };

  return (
    <div>{ fetchComplete ?
    <div className='my-5 sm:mt-10 lg:mt-0 bg-white shadow-lg rounded-lg'>
    <div className='text-lg font-custom-bold text-primary pl-5 pt-2'>{
      //End date - Start date
      startDate === null || endDate === null ? 'Select the Date Range' :
      totalNights + ' Nights in Apetite De Bone'
    }</div>
    <div className='text-sms pl-5 text-primary'>{`${
      startDate === null ? '' : format(startDate, 'dd MMMM')
    } - ${
      endDate === null ? '' : format(endDate, 'dd MMMM')
    }`}</div>
    <div className=" px-5 pb-5 h-min lg:h-full  rounded-md shadow-none" ref={datePickerRef}>
      <div>
        <div className="flex items-center justify-between py-2">
          <span className="font-custom font-normal text-primary text-md">
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
      key={day.date}
      className={`flex w-full items-center justify-center cursor-pointer ${
        !isSameMonth(day.date, monthStart) ? 'text-gray-500 cursor-not-allowed' : ''
      } ${
        isBooked(day.date) ? 'bg-red-200 text-gray-700 opacity-80 cursor-not-allowed' : ''
      } ${
        isSameDay(day.date, startDate) && !isBooked(day.date)
          ? 'bg-secondary text-white rounded-l-2xl'
          : isSameDay(day.date, endDate) && !isBooked(day.date)
          ? 'bg-secondary text-white rounded-r-2xl'
          : (startDate === null || endDate === null)
          ? ''
          : isWithinRange(day.date) &&
            getWeekOfMonth(day.date) !== getWeekOfMonth(endDate)
            && !isBooked(day.date)
          ? format(day.date, 'e') === '1'
            ? 'bg-gradient-to-r from-secondary/70 to-secondary/60 rounded-l-2xl'
            : format(day.date, 'e') === '2'
            ? 'bg-gradient-to-r from-secondary/60 to-secondary/50'
            : format(day.date, 'e') === '3'
            ? 'bg-gradient-to-r from-secondary/50 to-secondary/40'
            : format(day.date, 'e') === '4'
            ? 'bg-gradient-to-r from-secondary/40 to-secondary/30'
            : format(day.date, 'e') === '5'
            ? 'bg-gradient-to-r from-secondary/30 to-secondary/20'
            : format(day.date, 'e') === '6'
            ? 'bg-gradient-to-r from-secondary/20 to-secondary/10'
            : format(day.date, 'e') === '7'
            ? 'bg-gradient-to-r from-secondary/10 to-secondary/0 rounded-r-2xl'
            : ''
          : isWithinRange(day.date) && getWeekOfMonth(day.date) === getWeekOfMonth(endDate)
          ? format(day.date, 'e') === '7'
            ? 'bg-gradient-to-l from-secondary/70 to-secondary/60 rounded-r-2xl'
            : format(day.date, 'e') === '6'
            ? 'bg-gradient-to-l from-secondary/60 to-secondary/50'
            : format(day.date, 'e') === '5'
            ? 'bg-gradient-to-l from-secondary/50 to-secondary/40'
            : format(day.date, 'e') === '4'
            ? 'bg-gradient-to-l from-secondary/40 to-secondary/30'
            : format(day.date, 'e') === '3'
            ? 'bg-gradient-to-l from-secondary/30 to-secondary/20'
            : format(day.date, 'e') === '2'
            ? 'bg-gradient-to-l from-secondary/20 to-secondary/10'
            : format(day.date, 'e') === '1'
            ? 'bg-gradient-to-l from-secondary/10 to-secondary/0 rounded-l-2xl'
            : ''
          : ''
      }`}
      onClick={() => handleDateClick(day.date)}
    >
      {format(day.date, 'd')}
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
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    </div>
  );
};

DateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default DateRangePicker;