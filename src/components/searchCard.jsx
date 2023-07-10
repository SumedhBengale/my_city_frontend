import React, { useState } from 'react'
import filterIcon from '../assets/images/home/filter_icon.svg'
import locationPin from '../assets/images/home/location_pin.svg'
import calendar from '../assets/images/home/calendar.svg'
import guests from '../assets/images/home/guests.svg'
import rooms from '../assets/images/home/rooms.svg'
import CustomDatePicker from './CustomDatePicker'
import Filter from './filter.jsx'
import { useNavigate } from 'react-router-dom'


function SearchCard() {
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false)
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [filterVisible, setFilterVisible] = useState(false)
  const navigate = useNavigate()
  return (
    <>

    {startDatePickerVisible && 
      <div className='absolute top-0 w-full flex justify-center items-center h-full z-10 backdrop-filter backdrop-blur-sm'>
        <CustomDatePicker selectedDate={startDate} setSelectedDate={(date)=>{setStartDate(date); console.log(date); setStartDatePickerVisible(false)}} onClickOutside={()=>setStartDatePickerVisible(false)}></CustomDatePicker>
      </div>}

      {endDatePickerVisible && 
      <div className='absolute top-0 w-full flex justify-center items-center h-full z-10 backdrop-filter backdrop-blur-sm'>
        <CustomDatePicker selectedDate={endDate} setSelectedDate={(date)=>{setEndDate(date); console.log(date); setEndDatePickerVisible(false)}} onClickOutside={()=>setEndDatePickerVisible(false)}></CustomDatePicker>
      </div>}
      {filterVisible &&
      <Filter apply={(data)=>{
        setFilterVisible(false)
        console.log('filter applied')
        console.log(data)
      }} close={()=>setFilterVisible(false)}></Filter>}
      <div className="Rectangle z-0 m-4 w-full h-96 bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md" >
        <div className='grid grid-cols-2 gap-9 text-white'>

          <div className='col-span-2 flex justify-between'>{/* Location and Filter */}
              <div className='flex'>
                <img src={locationPin} alt='location pin' className=''></img>
                <div className='pl-2'>
                  <div className='text-sm'>Select Location</div>
                  <div className='font-bold text-2xl'>Where to?</div>
                </div>
              </div>
            <div className='text-white text-[18px] font-bold' onClick={()=>setFilterVisible(true)}>
              <img src={filterIcon} alt='filter' className=''></img>
            </div>
          </div>

          <div className='col-span-2 flex justify-between'>{/* Start and End Date Selector */}

            <div className='flex active:scale-90 transition ease-in duration-50' onClick={()=>setStartDatePickerVisible(true)}>
              <img src={calendar} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>Check-in Date</div>
                <div className='text-2xl font-bold'>Select</div>
              </div>
            </div>

            <div className='flex active:scale-90 transition ease-in duration-50' onClick={()=>setEndDatePickerVisible(!endDatePickerVisible)}>
              <img src={calendar} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>Check-out Date</div>
                <div className='text-2xl font-bold'>Select</div>
              </div>
            </div>

          </div>

          <div className='col-span-2 flex justify-between'>{/* Number of Guests and Rooms Selector */}
            <div className='flex'>
              <img src={guests} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>No. of guests</div>
                <div className='text-2xl font-bold'>2{/*Get this input */}</div>
              </div>
            </div>

            <div className='flex'>
              <img src={rooms} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>No. of rooms</div>
                <div className='text-2xl font-bold'>1{/*Get this input */}</div>
              </div>
            </div>

          </div>


          <div className="w-full col-span-2 h-12 bg-white rounded-lg border" onClick={()=>navigate('/properties')}>
          <div className="w-full relative h-full z-0 flex">
              <div className='w-full text-center self-center text-black flex justify-center items-center'>Search</div>
          </div>
          </div>

        </div>

      </div>
    </>

  )
}

export default SearchCard



