import React, { useEffect, useState } from 'react'
import filterIcon from '../assets/images/home/filter_icon.svg'
import locationPin from '../assets/images/home/location_pin.svg'
import calendar from '../assets/images/home/calendar.svg'
import guests from '../assets/images/home/guests.svg'
import rooms from '../assets/images/home/rooms.svg'
import Filter from '../components/filter'
import DateRangePicker from './DateRangePicker'
import { getCities } from './api'


function SearchCard({search}) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedBedrooms, setSelectedBedrooms] = useState('any');
  const [selectedGuests, setSelectedGuests] = useState('any');
  const [selectedbathrooms, setSelectedbathrooms] = useState('any');
  const [location, setLocation] = useState('any');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [cities, setCities] = useState(null)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [guestNumberPickerVisible, setGuestNumberPickerVisible] = useState(false)
  const [roomNumberPickerVisible, setRoomNumberPickerVisible] = useState(false)
  const [locationPickerVisible, setLocationPickerVisible] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)

  useEffect(() => {
    getCities().then((data)=>{
      console.log("City List",data)
      setCities(data.cities.results)
    })
  }, [])

  return (
    <>
         {filterVisible &&
      <div className='h-screen w-screen absolute overflow-scroll'>
      <Filter
      initialData = {
        {
          location: location,
          selectedBedrooms: selectedBedrooms,
          selectedGuests: selectedGuests,
          selectedbathrooms: selectedbathrooms,
          priceRange: priceRange,
          selectedAmenities: selectedAmenities
        }
      }
      apply={(data)=>{
        setFilterVisible(false)
        console.log('filter applied')
        console.log(data)
        setSelectedBedrooms(data.bedrooms)
        setSelectedGuests(data.guests)
        setSelectedbathrooms(data.bathrooms)
        setPriceRange(data.priceRange)
        setSelectedAmenities(data.amenities)
      }} close={()=>setFilterVisible(false)}></Filter>
      </div>}
    {datePickerVisible && 
      <div className='fixed top-0 w-full flex flex-col justify-center items-center h-full z-10 backdrop-filter backdrop-blur-sm'>
        <DateRangePicker initialStartDate={startDate} initialEndDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}
          returnData={(data)=>{
            setDatePickerVisible(false)
            setStartDate(data.startDate)
            setEndDate(data.endDate)
          }}
          blockBooking={()=>null}
        ></DateRangePicker>
      </div>
      }
      <div className='px-2 sm:px-10 w-full flex justify-center'>
      <div className="z-0 m-4 w-full md:w-3/5 lg:w-full h-min md:h-min bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md lg:hidden" >
        <div className='grid grid-cols-2 gap-3 md:gap-9 text-white'>

          <div className='col-span-2 flex justify-between'>{/* Location and Filter */}
              <div className='flex' onClick={()=>locationPickerVisible !== true && setLocationPickerVisible(!locationPickerVisible)}>
                <img src={locationPin} alt='location pin' className=''></img>
                <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Select Location</div>
                  <div className=' text-md sm:text-md font-bold'>{location ? (location === 'any' ? 'Select': location.city) : 'Select'}</div>
                </div>
                {locationPickerVisible && <div className='absolute top-0 h-min w-40 translate-y-10 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    {cities!== null ? cities.map((city)=>{
                      return <li className='px-2 hover:bg-gray-200' onClick={()=>{
                        setLocationPickerVisible(false)
                        console.log(locationPickerVisible)
                        setLocation(city)
                        console.log(city.city)
                      }}>{city.city}</li>
                    }): <div className='flex justify-center items-center h-10'>
                        <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                      </div>}
                  </ul>
                </div>}
              </div>
            <div className='text-white text-[18px] font-bold active:scale-105 transition duration-75 cursor-pointer' onClick={()=>setFilterVisible(true)}>
              <img src={filterIcon} alt='filter' className=''></img>
            </div>
          </div>

          <div className='col-span-2 flex justify-between'>{/* Start and End Date Selector */}
            <div className='flex flex-col gap-5'>
              <div className='flex active:scale-90 transition ease-in duration-50' onClick={()=>setDatePickerVisible(!datePickerVisible)}>
                <img src={calendar} alt='calendar' className='w-5 sm:w-7 h-full'></img>
                <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Check-in Date</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    startDate.getDate() + '/' + (startDate.getMonth()+1) + '/' + startDate.getFullYear()
                  }</div>
                </div>
              </div>

              <div className='col-span-2 flex justify-between'>{/* Number of Guests and Rooms Selector */}
              <div className='flex relative' onClick={()=>setGuestNumberPickerVisible(!guestNumberPickerVisible)}>
                <img src={guests} alt='calendar' className=''></img>
                <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Number of guests</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    selectedGuests === 'any' ? 'Any' : selectedGuests
                  }</div>
                </div>
                { guestNumberPickerVisible && <div className='absolute top-0 h-min w-full translate-y-10 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests('any')}>Any</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(0)}>0</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(1)}>1</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(2)}>2</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(3)}>3</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(4)}>4</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests('5+')}>5+</li>
                  </ul>
                </div>}

              </div>
            </div>

          </div>
            <div className='flex flex-col gap-5'>
              <div className='flex active:scale-90 transition ease-in duration-50 ' onClick={()=>setDatePickerVisible(!datePickerVisible)}>
                <img src={calendar} alt='calendar' className='w-5 sm:w-7 h-full'></img>
                <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Check-out Date</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    endDate.getDate() + '/' + (endDate.getMonth()+1) + '/' + endDate.getFullYear()
                  }</div>
                </div>
              </div>

              <div className='flex relative' onClick={()=>setRoomNumberPickerVisible(!roomNumberPickerVisible)}>
                <img src={rooms} alt='calendar' className=''></img>
                <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Number of rooms</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    selectedBedrooms === 'any' ? 'Any' : selectedBedrooms
                  }</div>
                </div>
                { roomNumberPickerVisible && <div className='absolute top-0 h-min w-full translate-y-10 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms('any')}>Any</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(0)}>0</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(1)}>1</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(2)}>2</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(3)}>3</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(4)}>4</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms('5+')}>5+</li>
                  </ul>
                </div>}
              </div>
            </div>
          </div>


          <div className="w-full col-span-2 h-10 md:mb-3 bg-white text-black active:scale-105 transition duration-75 cursor-pointer active:bg-gray-200 rounded-lg" onClick={()=>search({
                location: location,
                startDate:startDate,
                endDate:endDate,
                bedrooms: selectedBedrooms,
                guests: selectedGuests,
                bathrooms: selectedbathrooms,
                priceRange: priceRange,
                amenities: selectedAmenities
               })}>
          <div className="w-full relative h-full z-0 flex">
              <div className='w-full text-center self-center font-black flex justify-center items-center'>Search</div>
          </div>
          </div>
        </div>

      </div>
      </div>

      <div className="z-0 mx-4 py-8 w-full max-w-7xl bg-white text-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md hidden lg:block" >

          <div className='col-span-2 flex justify-around gap-1'>

          <div className='flex items-center' onClick={()=>locationPickerVisible !== true && setLocationPickerVisible(!locationPickerVisible)}>
                <img src={locationPin} alt='location pin' className='w-8 h-8'></img>
                <div className='pl-2'>
                  <div className='text-[12px]'>Select Location</div>
                  <div className='font-bold  text-xl'>{location ? (location === 'any' ? 'Select': location.city) : 'Select'}</div>
                </div>
                {locationPickerVisible && <div className='absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    {cities ? cities.map((city)=>{
                      return <li className='px-2 hover:bg-gray-200' onClick={()=>{
                        setLocationPickerVisible(false)
                        console.log(locationPickerVisible)
                        setLocation(city)
                        console.log(city.city)
                      }}>{city.city}</li>
                    })
                    : <div className='flex justify-center items-center h-10'>
                    <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                  </div>
                  }
                  </ul>
                </div>}
              </div>

              <div className='h-20 w-[2px] bg-white '></div>
            
            <div className='flex items-center active:scale-90 transition ease-in duration-50' onClick={()=>setDatePickerVisible(!datePickerVisible)}>
              <img src={calendar} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Check-in Date</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    startDate.getDate() + '/' + (startDate.getMonth()+1) + '/' + startDate.getFullYear()
                  }</div>
                </div>
            </div>

            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center active:scale-90 transition ease-in duration-50' onClick={()=>setDatePickerVisible(!datePickerVisible)}>
              <img src={calendar} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Check-out Date</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    endDate.getDate() + '/' + (endDate.getMonth()+1) + '/' + endDate.getFullYear()
                  }</div>
                </div>
            </div>
            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center' onClick={()=>setGuestNumberPickerVisible(!guestNumberPickerVisible)}>
              <img src={guests} alt='calendar relative' className='w-8 h-8'></img>
              <div className='pl-2'>
                  <div className='text-xs sm:text-sm'>Number of guests</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    selectedGuests === 'any' ? 'Any' : selectedGuests
                  }</div>
                </div>
                { guestNumberPickerVisible && <div className='absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests('any')}>Any</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(0)}>0</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(1)}>1</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(2)}>2</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(3)}>3</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests(4)}>4</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedGuests('5+')}>5+</li>
                  </ul>
                </div>}
            </div>
          
            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex items-center' onClick={()=>setRoomNumberPickerVisible(!roomNumberPickerVisible)}>
              <img src={rooms} alt='calendar' className='w-8 h-8'></img>
              <div className='pl-2 relative'>
                  <div className='text-xs sm:text-sm'>Number of rooms</div>
                  <div className=' text-md sm:text-md font-bold'>{
                    selectedBedrooms === 'any' ? 'Any' : selectedBedrooms
                  }</div>
                </div>
                { roomNumberPickerVisible && <div className='absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg z-20'>
                  <ul className='flex flex-col gap-1 text-black divide-y divide-black p-2 font-bold'>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms('any')}>Any</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(0)}>0</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(1)}>1</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(2)}>2</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(3)}>3</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms(4)}>4</li>
                    <li className='px-2 hover:bg-gray-200' onClick={()=>setSelectedBedrooms('5+')}>5+</li>
                  </ul>
                </div>}
            </div>

            <div className='h-20 w-[2px] bg-white'></div>

            <div className='flex gap-3'>
            <div className="w-32 h-6 md:h-10 self-center bg-white text-black hover:scale-105 transition duration-75 cursor-pointer hover:bg-gray-200 rounded-lg border" onClick={()=>search({
                location: location,
                startDate:startDate,
                endDate:endDate,
                bedrooms: selectedBedrooms,
                guests: selectedGuests,
                bathrooms: selectedbathrooms,
                priceRange: priceRange,
                amenities: selectedAmenities
               })}>
              <div className="relative h-full z-0 flex">
                  <div className='w-full text-center font-bold self-center flex justify-center items-center'>Search</div>
              </div>
            </div>

            <div className='text-white text-[18px] font-bold flex items-center hover:scale-110 transition duration-75 cursor-pointer' onClick={()=>setFilterVisible(true)}>
              <img src={filterIcon} alt='filter' className=''></img>
            </div>

            </div>



            

          </div>
      </div>
    </>

  )
}

export default SearchCard



