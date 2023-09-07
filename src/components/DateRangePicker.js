import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, getWeekOfMonth, isSameMonth, addDays, } from 'date-fns';
import LeftArrow from '../assets/images/property/left.svg';
import RightArrow from '../assets/images/property/right.svg';
import { fetchBookedDatesFromBackend } from './api';
import { ToastContainer, toast } from 'react-toastify';

const DateRangePicker = ({ initialStartDate, initialEndDate, bookedDatesData, residenceId, returnData, blockBooking }) => {
  const [currentMonth, setCurrentMonth] = useState(
    initialStartDate ? initialStartDate : new Date()
  );
  const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate : new Date());
  const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate : new Date());
  const [totalNights, setTotalNights] = useState(initialStartDate && initialEndDate ? (initialEndDate.getTime() - initialStartDate.getTime()) / (1000 * 3600 * 24) : 0);
  const [data, setData] = useState(bookedDatesData ? bookedDatesData : null); // To store booked dates from the backend
  const datePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    //print initial start date and end date
    console.log("Initial Start Date", initialStartDate)
    console.log("Initial End Date", initialEndDate)
    // Fetch booked dates from the backend
    try {
      setLoading(true);
      data === null &&
        fetchBookedDatesFromBackend(residenceId, format(new Date(), 'yyyy-MM-dd'), format(
          //1 year from today
          new Date().setFullYear(new Date(startDate).getFullYear() + 1)
          , 'yyyy-MM-dd')).then((data) => {
            if(data.status === 400){
              console.log("Error fetching booked dates")
              setFetchComplete(true);
              setLoading(false);
              setData(null);
            }else{
              console.log("Dates Data", data)
              setData(data);
              if (bookedDatesBetween(startDate, endDate, data)) {
                console.log("Booked Dates Between")
                //Check if any toast is already being displayed, if not display toast
                if (!toast.isActive('bookedDatesBetween')) {
                  toast.error('The dates you selected are not available', { toastId: 'bookedDatesBetween' })
                }
                setStartDate(null);
                setEndDate(null);
                blockBooking(true)
                setFetchComplete(true);
                setLoading(false);
                return;
              } else {
                setFetchComplete(true);
                setLoading(false);
              }
  
              return;
            }
          });

      if (bookedDatesBetween(startDate, endDate, data)) {
        console.log("Booked Dates Between")
        //Check if any toast is already being displayed, if not display toast
        if (!toast.isActive('bookedDatesBetween')) {
          toast.error('The dates you selected are not available', { toastId: 'bookedDatesBetween' })
        }
        blockBooking(true)
        setFetchComplete(true);
        return;
      } else {
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
    if (data === null) { return false }
    // Check if the day is present in the data in date property and its status is booked
    for (let i = 0; i < data.length; i++) {
      if (format(day, 'yyyy-MM-dd') === format(new Date(data[i].date), 'yyyy-MM-dd') && data[i].status === 'booked') {
        return true;
      }
    }
  }


  const days = []
  let day = monthStartDate;

  // Loop from month start date to month end date, adding 1 day each time, add the data for each day from the data array to the days array and return the days array
  while (day <= monthEndDate) {
    let dayData = {
      date:
        //day in yyyy-mm-dd format and time is 00:00:00 and without any timezone offset
        new Date(format(day, 'yyyy-MM-dd') + 'T00:00:00.000Z'),
      booked: isBooked(day),
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

  const bookedDatesBetween = (startDate, endDate, data) => {
    // If the status of any date between start date and end date is booked, return true, startDate and endDate are excluded
    if (data === null) { return false }
    for (let i = 0; i < data.length; i++) {
      if (new Date(data[i].date) > startDate && new Date(data[i].date) < endDate && data[i].status === 'booked') {
        return true;
      }
    }

  }


  const handleDateClick = (day) => {
    if (
      //compare only the date part
      format(day, 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')
    ) {
      console.log(format(day, 'dddd-MM-yyyy'))
      console.log(format(new Date(), 'dddd-MM-yyyy'))
      console.log('Date is in the past')
      //show toast only if no other toast is being displayed
      if (!toast.isActive('pastDate')) {
        toast.error('Date is in the past', { toastId: 'pastDate' })
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
      //If start date is booked, clear start date
      if (isBooked(day)) {
        console.log('Start date is booked')
        //show toast only if no other toast is being displayed
        if (!toast.isActive('bookedStartDate')) {
          toast.error('The dates you selected are not available', { toastId: 'bookedStartDate' })
        }
        blockBooking(true)
        return;
      }
      setStartDate(day);
      setEndDate(null); // Clear the end date
    } else if (endDate === null) {
      if(data === null){
        returnData({ startDate: startDate, endDate: day, totalNights: (day.getTime() - startDate.getTime()) / (1000 * 3600 * 24) });
        return;
      }
      //If start date is booked, clear start date
      //If enddate and startdate, both are booked, clear both
      if (startDate.booked && day.booked && //Both are adjacent dates
        addDays(startDate, 1).getTime() === day.getTime()
      
      ) {
        setStartDate(null);
        setEndDate(null);
        toast.error('The dates you selected are not availablees', { toastId: 'bookedDatesBetween' })
        return;
      }
      if (bookedDatesBetween(startDate, day, data)) {
        console.log('Booked dates between start date and end date')
        //show toast only if no other toast is being displayed
        if (!toast.isActive('bookedDatesBetween')) {
          toast.error('Booked dates between check-in and check-out date', { toastId: 'bookedDatesBetween' })
        }
        blockBooking(true)
        return; // Do nothing if there are booked dates between start date and end date
      }
      if (day >= startDate) {
        //For each day between start date and end date, print the status from the data array
        for (let i = 0; i < data.length; i++) {
          if (new Date(data[i].date) >= startDate && new Date(data[i].date) <= day) {
            const minNights = data[i].minNights;
            //If minNights are less than the number of nights selected, show toast
            if (minNights > (day.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) {
              console.log('Min nights not satisfied')
              //show toast only if no other toast is being displayed
              if (!toast.isActive('minNights')) {
                toast.error(`Minimum stay is ${minNights} nights for these dates`, { toastId: 'minNights' })
              }
              blockBooking(true)
              return;
            }
          }
        }
        setEndDate(day);
        setTotalNights((day.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        blockBooking(false)
        returnData({ startDate: startDate, endDate: day, totalNights: (day.getTime() - startDate.getTime()) / (1000 * 3600 * 24) });
      } else {
        if(isBooked(day)) {
          console.log('Start date is booked')
          //show toast only if no other toast is being displayed
          if (!toast.isActive('bookedStartDate')) {
            toast.error('The dates you selected are not available', { toastId: 'bookedStartDate' })
          }
          blockBooking(true)
          return;
        }
        setStartDate(day);
        setEndDate(null);
      }
    } else {
      // Clear both start and end dates if both have been selected
      //Check if any date is booked in between
      setStartDate(null);
      setEndDate(null);
      //If start date is booked, clear start date
      if (isBooked(day)) {
        console.log('Start date is booked')
        //show toast only if no other toast is being displayed
        if (!toast.isActive('bookedStartDate')) {
          toast.error('The dates you selected are not available', { toastId: 'bookedStartDate' })
        }
        blockBooking(true)
        return;
      }
      setStartDate(day);
    }
    console.log(day)
    console.log(startDate)
    console.log(endDate)
  };

  return (
    <div>{fetchComplete === true && loading === false ?
      <div className='my-5 sm:mt-10 lg:mt-0 bg-white shadow-lg rounded-lg'>
        <div className='text-lg font-custom-lora font-bold text-primary pl-5 pt-2'>{
          //End date - Start date
          startDate === null || endDate === null ? 'Select the Date Range' :
            totalNights + ' Nights in Apetite De Bone'
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
                    }${
                      data !== null && startDate === null && day.booked ? 'text-red-400' : ''
                    }${
                      data !== null && startDate !== null && ((day.booked && isBooked(addDays(day.date, -1))) || bookedDatesBetween(startDate, day.date, data) || day.date < startDate) ? 'text-red-400' : ''
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