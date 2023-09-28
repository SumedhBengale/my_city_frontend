import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, getWeekOfMonth, isSameMonth, addDays, } from 'date-fns';
import LeftArrow from '../assets/images/property/left.svg';
import RightArrow from '../assets/images/property/right.svg';
import { fetchBookedDatesFromBackend } from './api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DateRangePicker = ({ initialStartDate, initialEndDate, residenceMinNights, residenceId, returnData, blockBooking, title, bookNow }) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(
    initialStartDate ? initialStartDate : new Date()
  );
  const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate : null);
  const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate : null);
  const [totalNights, setTotalNights] = useState(initialStartDate && initialEndDate ? (initialEndDate.getTime() - initialStartDate.getTime()) / (1000 * 3600 * 24) : 0);
  const [data, setData] = useState(null); // To store booked dates from the backend
  const datePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [bookingBlocked, setBookingBlocked] = useState(true);
  const changeBookingBlocked = (value) => {
    setBookingBlocked(value)
    blockBooking(value)
  }

  useEffect(() => {
    //print initial start date and end date
    console.log("Initial Start Date", initialStartDate)
    console.log("Initial End Date", initialEndDate)
    console.log("Initial MinNights", residenceMinNights)
    // Fetch booked dates from the backend
    try {
      setLoading(true);
      data === null &&
        fetchBookedDatesFromBackend(residenceId, format(new Date(), 'yyyy-MM-dd'), format(
          //1 year from today
          new Date().setFullYear(new Date().getFullYear() + 1)
          , 'yyyy-MM-dd')).then((data) => {
            if (data.status === 400) {
              console.log("Error fetching booked dates")
              setFetchComplete(true);
              setLoading(false);
              setData(null);
            } else {
              console.log("Dates Data", data)
              setData(data);
              setFetchComplete(true);
              setLoading(false);

              return;
            }
          });

      if (bookedDatesBetween(startDate, endDate, data)) {
        console.log("Booked Dates Between")
        //Check if any toast is already being displayed, if not display toast
        if (!toast.isActive('bookedDatesBetween')) {
          toast.error('The dates you selected are not available', { toastId: 'bookedDatesBetween' })
        }
        changeBookingBlocked(true)
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
      if (new Date(data[i].date) > startDate && new Date(data[i].date) < endDate && (
        data[i].status === 'booked' ||
        data[i].status === 'unavailable' ||
        data[i].status === 'reserved'
      )) {
        return true;
      }
    }

  }


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
      return;
    }
    //If startDate is null, set startDate to the day
    if (startDate === null) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    //If endDate is null, set endDate to the day
    if (endDate === null) {
      setEndDate(day);

      //If clicking on the same date, set startDate and endDate to null
      if (isSameDay(day, startDate)) {
        setStartDate(null);
        setEndDate(null);
        return;
      }

      //Make sure startDate is not booked
      if (isBooked(startDate)) {
        //Check if any toast is already being displayed, if not display toast
        if (!toast.isActive('isBooked')) {
          toast.error('The dates you selected are not available', { toastId: 'isBooked' })
        }
        changeBookingBlocked(true)
        return;
      }
      //Check the minimum number of nights for the startDate from the data array and compare with the total nights
      for (let i = 0; i < data.length; i++) {
        if (format(startDate, 'yyyy-MM-dd') === format(new Date(data[i].date), 'yyyy-MM-dd')) {
          console.log("Min Nights", data[i].minNights)
          if (data[i].minNights > (day.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) {
            //Check if any toast is already being displayed, if not display toast
            if (!toast.isActive('minNights')) {
              toast.error(`Please select a minimum of ${data[i].minNights} nights`, { toastId: 'minNights' })
            }
            changeBookingBlocked(true)
            return;
          }
        }
      }

      //Compare the total nights with the minimum nights for the residence
      if (residenceMinNights && residenceMinNights > (day.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) {
        //Check if any toast is already being displayed, if not display toast
        if (!toast.isActive('minNights')) {
          toast.error(`Please select a minimum of ${residenceMinNights} nights`, { toastId: 'minNights' })
        }
        changeBookingBlocked(true)
        return;
      }

      //If booked dates are between start date and end date, return
      if (bookedDatesBetween(startDate, day, data)) {
        //Check if any toast is already being displayed, if not display toast
        if (!toast.isActive('bookedDatesBetween')) {
          toast.error('The dates you selected are not available', { toastId: 'bookedDatesBetween' })
        }
        changeBookingBlocked(true)
        return;
      }
      setTotalNights((day.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
      returnData({
        startDate: startDate,
        endDate: day,
      })
      changeBookingBlocked(false)
      return;
    }

    //If same date is clicked, set startDate and endDate to null
    if (isSameDay(day, startDate)) {
      setStartDate(null);
      setEndDate(null);
      changeBookingBlocked(true)
      return;
    }

    //If startDate and endDate are not null, set startDate to the day and set endDate to null
    if (startDate !== null && endDate !== null) {
      setStartDate(day);
      setEndDate(null);
      changeBookingBlocked(true)
      return;
    }
  };

  return (
    <div>{fetchComplete === true && loading === false ?
      <div className='flex flex-col w-96'>
        <div className='my-5 sm:mt-10 lg:mt-0 bg-white shadow-lg rounded-lg'>
          <div className='text-lg font-custom-lora font-bold text-primary pl-5 pt-2'>{
            //End date - Start date
            startDate === null || endDate === null ? 'Select the Date Range' :
              totalNights + ` Nights in ${title}`
          }</div>
          <div className='text-sms pl-5 font-custom-lora text-primary'>{`${startDate === null ? '' : format(startDate, 'dd MMMM')
            } - ${endDate === null ? '' : format(endDate, 'dd MMMM')
            }`}</div>
          <div className=" px-5 pb-5 h-min lg:h-full  rounded-md shadow-none" ref={datePickerRef}>
            <div className=''>
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
                      }

                      ${
                      //If less than current date, disable
                      day.date < new Date(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z') ? 'text-gray-500 cursor-not-allowed' : ''
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
          <div className='w-full p-2'>
            {bookingBlocked ? <button className="bg-primary w-full text-white font-custom-lora text-lg py-2 rounded-md shadow-md hover:bg-primary/90 focus:outline-none"
              onClick={() => {
                localStorage.getItem('luxe') === true ?
                  navigate('/luxe/properties', {
                    state: {
                      filterData: {
                        location: "any",
                        startDate: startDate,
                        endDate: endDate,
                        bedrooms: "any",
                        guests: localStorage.getItem('guestCount') ? localStorage.getItem('guestCount') : 1,
                        bathrooms: "any",
                        priceRange: [0, 10000],
                        amenities: [],
                      },
                    }
                  }) :
                  navigate('/properties', {
                    state: {
                      filterData: {
                        location: "any",
                        startDate: startDate,
                        endDate: endDate,
                        bedrooms: "any",
                        guests: localStorage.getItem('guestCount') ? localStorage.getItem('guestCount') : 1,
                        bathrooms: "any",
                        priceRange: [0, 10000],
                        amenities: [],
                      },
                    }
                  })
              }}
            >See Available Properties</button>
              : <button className="bg-primary w-full text-white font-custom-lora text-lg py-2 rounded-md shadow-md hover:bg-primary/90 focus:outline-none"
                onClick={() => {
                  bookNow()
                }}
              >Book Now</button>
            }
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





// ${data !== null && startDate === null && day.booked ? 'text-red-400' : ''
// }${data !== null && startDate !== null && ((day.booked && isBooked(addDays(day.date, -1))) || bookedDatesBetween(startDate, day.date, data) || day.date < startDate) ? 'text-red-400' : ''
// }