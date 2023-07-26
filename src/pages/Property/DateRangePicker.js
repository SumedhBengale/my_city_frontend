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
import LeftArrow from '../../assets/images/property/left.svg';
import RightArrow from '../../assets/images/property/right.svg';



const DateRangePicker = ({ setSelectedDate, onClickOutside }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const datePickerRef = useRef(null);

  const weekdaysShort = ['Sun' ,'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day) => {
    if (startDate === null) {
      // Set the start date if it hasn't been selected yet
      console.log(format(day, 'e'));
      setStartDate(day);
      setEndDate(null); // Clear the end date
    } else if (endDate === null) {
      // Set the end date if the start date has been selected
      if (day >= startDate) {
        setEndDate(day);
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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className='m-3 sm:mt-10 lg:mt-0'>
    <div className='text-lg font-custom font-bold pl-5'>{
      //End date - Start date
      startDate === null || endDate === null ? 'Select the Date Range' :
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + ' Nights in Apetite De Bone'
    }</div>
    <div className='text-sms pl-5'>{`${
      startDate === null ? '' : format(startDate, 'dd MMMM')
    } - ${
      endDate === null ? '' : format(endDate, 'dd MMMM')
    }`}</div>
    <div className=" p-5 h-min lg:h-full bg-white border border-gray-300 rounded-md shadow-lg" ref={datePickerRef}>
      <div>
        <div className="font-bold"> Please select the Date Range</div>
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
          <div className=' py-2 flex justify-center items-center'>
          <div
            key={day}
            className={`flex w-full items-center justify-center cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-500'
                : isSameDay(day, startDate)
                ? `bg-black text-white rounded-l-2xl`
                : isSameDay(day, endDate)
                ? 'bg-black text-white rounded-r-2xl'
                : (startDate === null || endDate === null) ? "" 
                : isWithinRange(day) && (getWeekOfMonth(day) !== getWeekOfMonth(endDate)) ? 
                format(day, 'e') === '1' ? 'bg-gradient-to-r from-black/70 to-black/60 rounded-l-2xl' : 
                format(day, 'e') === '2' ? 'bg-gradient-to-r from-black/60 to-black/50' : 
                format(day, 'e') === '3' ? 'bg-gradient-to-r from-black/50 to-black/40' : 
                format(day, 'e') === '4' ? 'bg-gradient-to-r from-black/40 to-black/30' : 
                format(day, 'e') === '5' ? 'bg-gradient-to-r from-black/30 to-black/20' : 
                format(day, 'e') === '6' ? 'bg-gradient-to-r from-black/20 to-black/10' : 
                format(day, 'e') === '7' ? 'bg-gradient-to-r from-black/10 to-black/0 rounded-r-2xl' : ''
                : isWithinRange(day) && (getWeekOfMonth(day) === getWeekOfMonth(endDate)) ? 
                format(day, 'e') === '7' ? 'bg-gradient-to-l from-black/70 to-black/60 rounded-r-2xl' : 
                format(day, 'e') === '6' ? 'bg-gradient-to-l from-black/60 to-black/50' : 
                format(day, 'e') === '5' ? 'bg-gradient-to-l from-black/50 to-black/40' : 
                format(day, 'e') === '4' ? 'bg-gradient-to-l from-black/40 to-black/30' : 
                format(day, 'e') === '3' ? 'bg-gradient-to-l from-black/30 to-black/20' : 
                format(day, 'e') === '2' ? 'bg-gradient-to-l from-black/20 to-black/10' : 
                format(day, 'e') === '1' ? 'bg-gradient-to-l from-black/10 to-black/0 rounded-l-2xl' : ''
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
  );
};

DateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default DateRangePicker;
