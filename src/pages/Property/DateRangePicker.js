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

  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day) => {
    if (!startDate) {
      // Set the start date if it hasn't been selected yet
      setStartDate(day);
      setEndDate(null); // Clear the end date
    } else if (!endDate) {
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
    }
    console.log(startDate)
    console.log(endDate)
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
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
    );
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

  const renderDaysOfWeek = () => {
    return (
      <div className="flex mb-2">
        {weekdaysShort.map((day) => (
          <div key={day} className="w-12 text-center text-sm text-gray-600 font-medium">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className={`px-5 py-1.5 flex items-center justify-center rounded-full cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-500'
                : isSameDay(day, startDate) || isSameDay(day, endDate)
                ? 'bg-blue-500 text-white'
                : startDate && endDate && day > startDate && day < endDate
                ? 'bg-white'
                : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="m-3 sm:m-10 p-5 h-min bg-white border border-gray-300 rounded-md shadow-lg" ref={datePickerRef}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};

DateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default DateRangePicker;
