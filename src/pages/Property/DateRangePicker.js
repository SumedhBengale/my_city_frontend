import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfISOWeek,
  endOfISOWeek,
  isSameDay,
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

  const weekdaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDateClick = (day) => {
    if (startDate === null) {
      // Set the start date if it hasn't been selected yet
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
  const monthStartDate = startOfISOWeek(monthStart);
  const monthEndDate = endOfISOWeek(monthEnd);

  const days = [];
  let day = monthStartDate;

  while (day <= monthEndDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const isWithinRange = (day) => {
    if (startDate === null || endDate === null) {return false} 
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
    <div className="m-3 sm:m-10 p-5 h-min bg-white border border-gray-300 rounded-md shadow-lg" ref={datePickerRef}>
      <div>
        <div className="font-bold"> Please select the Date Range</div>
        <div className="flex items-center justify-between py-2">
          <span className="font-custom font-bold text-lg">
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
      <div className="flex mb-2">
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
            className={`flex w-full items-center justify-center  cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-500'
                : isSameDay(day, startDate)
                ?  //Gradient black to gray
                `bg-gradient-to-r from-black to-gray-300 text-white rounded-l-2xl`
                : isSameDay(day, endDate)
                ? 'bg-gradient-to-l from-black to-gray-300 text-white rounded-r-2xl'
                : (startDate === null || endDate === null) ? "" : (day.getTime() === startDate?.getTime() || day.getTime() === endDate?.getTime()) 
                ? 'bg-red'
                : isWithinRange(day) ? 'bg-gray-300  text-white' : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default DateRangePicker;
