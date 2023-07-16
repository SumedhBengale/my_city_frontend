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
      <div className='fixed top-0 w-full flex justify-center items-center h-full z-10 backdrop-filter backdrop-blur-sm'>
        <CustomDatePicker selectedDate={startDate} setSelectedDate={(date)=>{setStartDate(date); console.log(date); setStartDatePickerVisible(false)}} onClickOutside={()=>setStartDatePickerVisible(false)}></CustomDatePicker>
      </div>
      }

      {endDatePickerVisible && 
      <div className='fixed top-0 w-full flex justify-center items-center h-full z-10 backdrop-filter backdrop-blur-sm'>
        <CustomDatePicker selectedDate={endDate} setSelectedDate={(date)=>{setEndDate(date); console.log(date); setEndDatePickerVisible(false)}} onClickOutside={()=>setEndDatePickerVisible(false)}></CustomDatePicker>
      </div>
      }
      {filterVisible &&
      <Filter apply={(data)=>{
        setFilterVisible(false)
        console.log('filter applied')
        console.log(data)
      }} close={()=>setFilterVisible(false)}></Filter>}
      <div className="z-0 m-4 w-full md:w-4/5 h-96 bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md lg:hidden" >
        <div className='grid grid-cols-2 gap-9 text-white'>

          <div className='col-span-2 flex justify-between'>{/* Location and Filter */}
              <div className='flex'>
                <img src={locationPin} alt='location pin' className=''></img>
                <div className='pl-2'>
                  <div className='text-sm'>Select Location</div>
                  <div className='font-bold font-custom text-xl'>Where to?</div>
                </div>
              </div>
            <div className='text-white text-[18px] font-bold active:scale-105 transition duration-75 cursor-pointer' onClick={()=>setFilterVisible(true)}>
              <img src={filterIcon} alt='filter' className=''></img>
            </div>
          </div>

          <div className='col-span-2 flex justify-between'>{/* Start and End Date Selector */}

            <div className='flex active:scale-90 transition ease-in duration-50' onClick={()=>setStartDatePickerVisible(true)}>
              <img src={calendar} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>Check-in Date</div>
                <div className='font-custom text-xl font-bold'>Select</div>
              </div>
            </div>

            <div className='flex active:scale-90 transition ease-in duration-50' onClick={()=>setEndDatePickerVisible(!endDatePickerVisible)}>
              <img src={calendar} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>Check-out Date</div>
                <div className='font-custom text-xl font-bold'>Select</div>
              </div>
            </div>

          </div>

          <div className='col-span-2 flex justify-between'>{/* Number of Guests and Rooms Selector */}
            <div className='flex'>
              <img src={guests} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>No. of guests</div>
                <div className='font-custom text-xl font-bold'>2{/*Get this input */}</div>
              </div>
            </div>

            <div className='flex'>
              <img src={rooms} alt='calendar' className=''></img>
              <div className='pl-2'>
                <div className='text-sm'>No. of rooms</div>
                <div className='font-custom text-xl font-bold'>1{/*Get this input */}</div>
              </div>
            </div>

          </div>


          <div className="w-full col-span-2 h-10 bg-white text-black rounded-lg border active:scale-105 transition duration-75 active:bg-gray-200 active:text-white" onClick={()=>navigate('/properties')}>
          <div className="w-full relative h-full z-0 flex">
              <div className='w-full text-center self-center flex justify-center items-center'>Search</div>
          </div>
          </div>

        </div>

      </div>


      <div className="z-0 mx-4 py-8 w-full max-w-7xl bg-white text-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md hidden lg:block" >

          <div className='col-span-2 flex justify-around gap-1'>

              <div className='flex items-center'>
                <img src={locationPin} alt='location pin' className='w-8 h-8'></img>
                <div className='pl-2'>
                  <div className='text-[12px]'>Select Location</div>
                  <div className='font-bold font-custom text-xl'>Where to?</div>
                </div>
              </div>

              <div className='h-20 w-[2px] bg-white '></div>
            
            <div className='flex items-center active:scale-90 transition ease-in duration-50' onClick={()=>setStartDatePickerVisible(true)}>
              <img src={calendar} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                <div className='text-[12px]'>Check-in Date</div>
                <div className='font-custom text-xl font-bold'>Select</div>
              </div>
            </div>

            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center active:scale-90 transition ease-in duration-50' onClick={()=>setEndDatePickerVisible(!endDatePickerVisible)}>
              <img src={calendar} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                <div className='text-[12px]'>Check-out Date</div>
                <div className='font-custom text-xl font-bold'>Select</div>
              </div>
            </div>
            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center'>
              <img src={guests} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                <div className='text-[12px]'>No. of guests</div>
                <div className='font-custom text-xl font-bold'>2{/*Get this input */}</div>
              </div>
            </div>
          
            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center'>
              <img src={rooms} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                <div className='text-[12px]'>No. of rooms</div>
                <div className='font-custom text-xl font-bold'>1{/*Get this input */}</div>
              </div>
            </div>

            <div className='h-20 w-[2px] bg-white'></div>

            <div className='text-white text-[18px] font-bold flex items-center hover:scale-110 transition duration-75 cursor-pointer' onClick={()=>setFilterVisible(true)}>
              <img src={filterIcon} alt='filter' className=''></img>
            </div>

            <div className='h-20 w-[2px] bg-white'></div>

            <div className="w-32 h-6 md:h-10 self-center bg-white text-black hover:scale-105 transition duration-75 cursor-pointer hover:bg-gray-200  rounded-lg border" onClick={()=>navigate('/properties')}>
              <div className="relative h-full z-0 flex">
                  <div className='w-full text-center font-bold self-center flex justify-center items-center'>Search</div>
              </div>
            </div>

          </div>
      </div>
    </>

  )
}

export default SearchCard



