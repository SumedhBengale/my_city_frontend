import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth,startOfWeek,endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import LeftArrow from '../assets/images/home/left.svg';
import RightArrow from '../assets/images/home/right.svg';

const CustomDatePicker = ({ selectedDate, setSelectedDate, onClickOutside }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);


  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleDateClick = (day) => {
      console.log("handleDateClick")
      setSelectedDate(day);
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
        <div className='font-bold'> Please select a Date</div>
        <div className="flex items-center justify-between py-2">
          <span className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
          <div className='flex justify-end gap-2'>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              onClick={handlePrevMonth}
            >
              <img src={LeftArrow} alt="left arrow" className='w-5 h-5' />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              onClick={handleNextMonth}
            >
            <img src={RightArrow} alt="right arrow" className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    //if click outside of datePickerRef, close the datepicker
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        console.log("outside click")
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  },[onClickOutside])

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
              !isSameMonth(day, monthStart) ? 'text-gray-500' : isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''
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
    <div className="w-full m-10  p-5 h-96 bg-white border border-gray-300 rounded-md shadow-lg" ref={datePickerRef}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default CustomDatePicker;
