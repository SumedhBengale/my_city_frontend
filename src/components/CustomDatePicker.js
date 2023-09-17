import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, getWeekOfMonth, isSameMonth, addDays, } from 'date-fns';
import LeftArrow from '../assets/images/property/left.svg';
import RightArrow from '../assets/images/property/right.svg';
import { fetchBookedDatesFromBackend } from './api';
import { ToastContainer, toast } from 'react-toastify';

const PlainDateRangePicker = ({ initialStartDate, initialEndDate, returnData }) => {
  const [currentMonth, setCurrentMonth] = useState(
    initialStartDate ? initialStartDate : new Date()
  );
  const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate : null);
  const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate : null);
  const [totalNights, setTotalNights] = useState(initialStartDate && initialEndDate ? (initialEndDate.getTime() - initialStartDate.getTime()) / (1000 * 3600 * 24) : 0);
  const datePickerRef = useRef(null);
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthStartDate = startOfWeek(monthStart);
  const monthEndDate = endOfWeek(monthEnd);


  const days = []
  let day = monthStartDate;

  // Loop from month start date to month end date, adding 1 day each time, add the data for each day from the data array to the days array and return the days array
  while (day <= monthEndDate) {
    let dayData = {
      date:
        //day in yyyy-mm-dd format and time is 00:00:00 and without any timezone offset
        new Date(format(day, 'yyyy-MM-dd') + 'T00:00:00.000Z'),
    };
    days.push(dayData);
    day = addDays(day, 1);
  }


  const isWithinRange = (day) => {
    if (startDate === null || endDate === null) { return false }

    //Day is in the week of the end date
    return startDate.getTime() <= day.getTime() && day.getTime() <= endDate.getTime()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };


  const handleDateClick = (day) => {
    console.log("Day", day)
    //If date is in the past, return
    if (day < new Date(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z')) {
      return;
    }
    //If the day is not in the current month, return
    if (!isSameMonth(day, monthStart)) {
      return;
    }
    //If less than start date, set startDate to the day
    if (day < startDate) {
      setStartDate(day);
      setEndDate(null);
      returnData({
        startDate: day,
        endDate: null,
      })
      return;
    }
    //If startDate is null, set startDate to the day
    if (startDate === null) {
      setStartDate(day);
      setEndDate(null);
      returnData({
        startDate: day,
        endDate: null,
      })
      return;
    }

    //If endDate is null, set endDate to the day
    if (endDate === null) {
      //If clicking on the same date, set startDate and endDate to null
      if (isSameDay(day, startDate)) {
        setStartDate(null);
        setEndDate(null);
        returnData({
          startDate: null,
          endDate: null,
        })
        return;
      }
      setTotalNights((day.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
      setEndDate(day);
      returnData({
        startDate: startDate,
        endDate: day,
      })
      return;
    }
    //If both startDate and endDate are not null, set startDate to the day and set endDate to null
    if (startDate !== null && endDate !== null) {
      setStartDate(day);
      setEndDate(null);
      returnData({
        startDate: day,
        endDate: null,
      })
      return;
    }
    //If clicking on the same date, set startDate and endDate to null
    if (isSameDay(day, startDate) || isSameDay(day, endDate)) {
      console.log("Same day")
      setStartDate(null);
      setEndDate(null);
      returnData({
        startDate: null,
        endDate: null,
      })
      return;
    }
  };

  return (
    <div>{
      <div className='my-5 sm:mt-10 lg:mt-0 bg-white shadow-lg rounded-lg'>
        <div className='text-lg font-custom-lora font-bold text-primary pl-5 pt-2'>{
          //End date - Start date
          startDate === null || endDate === null ? `${startDate === null ? 'Select Check-In Date' : 'Select Check-Out Date'
            }` :
            totalNights + ' Nights'
        }</div>
        <div className='text-sms pl-5 font-custom-lora text-primary'>{`${startDate === null ? '' : format(startDate, 'dd MMMM')
          } - ${endDate === null ? '' : format(endDate, 'dd MMMM')
          }`}</div>
        <div className=" px-5 pb-5 h-min lg:h-full  rounded-md shadow-none" ref={datePickerRef}>
          <div>
            <div className="flex items-center justify-between py-2">
              <span className="font-custom-lora font-normal text-primary text-md">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <div className="flex justify-end gap-2">
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors font-custom-lora focus:outline-none"
                  onClick={handlePrevMonth}
                >
                  <img src={LeftArrow} alt="left arrow" className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors font-custom-lora focus:outline-none"
                  onClick={handleNextMonth}
                >
                  <img src={RightArrow} alt="right arrow" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex mb-2 justify-around">
            {weekdaysShort.map((day) => (
              <div key={day} className="w-12 text-center font-custom-lora text-sm text-gray-600 font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => (
              <div className="py-2 flex justify-center items-center">
                <div
                  key={day.date}
                  className={`flex w-full font-custom-lora items-center justify-center cursor-pointer ${!isSameMonth(day.date, monthStart) ? 'text-gray-500 cursor-not-allowed' : ''
                    }${day.date < new Date(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z') ? 'text-gray-500 cursor-not-allowed' : ''
                    }
                     ${isSameDay(day.date, startDate)
                      ? 'bg-primary text-white rounded-l-2xl'
                      : isSameDay(day.date, endDate)
                        ? 'bg-primary text-white rounded-r-2xl'
                        : (startDate === null || endDate === null)
                          ? ''
                          : isWithinRange(day.date)
                            ? format(day.date, 'e') === '1'
                              ? 'bg-gradient-to-r from-primary/70 to-primary/60 rounded-l-2xl'
                              : format(day.date, 'e') === '2'
                                ? 'bg-gradient-to-r from-primary/60 to-primary/50'
                                : format(day.date, 'e') === '3'
                                  ? 'bg-gradient-to-r from-primary/50 to-primary/40'
                                  : format(day.date, 'e') === '4'
                                    ? 'bg-gradient-to-r from-primary/40 to-primary/30'
                                    : format(day.date, 'e') === '5'
                                      ? 'bg-gradient-to-r from-primary/30 to-primary/20'
                                      : format(day.date, 'e') === '6'
                                        ? 'bg-gradient-to-r from-primary/20 to-primary/10'
                                        : format(day.date, 'e') === '7'
                                          ? 'bg-gradient-to-r from-primary/10 to-primary/0 rounded-r-2xl'
                                          : ''
                            : isWithinRange(day.date) && getWeekOfMonth(day.date) === getWeekOfMonth(endDate)
                              ? format(day.date, 'e') === '7'
                                ? 'bg-gradient-to-l from-primary/70 to-primary/60 rounded-r-2xl'
                                : format(day.date, 'e') === '6'
                                  ? 'bg-gradient-to-l from-primary/60 to-primary/50'
                                  : format(day.date, 'e') === '5'
                                    ? 'bg-gradient-to-l from-primary/50 to-primary/40'
                                    : format(day.date, 'e') === '4'
                                      ? 'bg-gradient-to-l from-primary/40 to-primary/30'
                                      : format(day.date, 'e') === '3'
                                        ? 'bg-gradient-to-l from-primary/30 to-primary/20'
                                        : format(day.date, 'e') === '2'
                                          ? 'bg-gradient-to-l from-primary/20 to-primary/10'
                                          : format(day.date, 'e') === '1'
                                            ? 'bg-gradient-to-l from-primary/10 to-primary/0 rounded-l-2xl'
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

PlainDateRangePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default PlainDateRangePicker;