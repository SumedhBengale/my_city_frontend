import {React, useEffect, useState} from 'react'
import Star from '../../assets/images/property/star.svg'
import PhotoGrid from './PhotoGrid'
import Amenities from './Amenities'
import ReviewShowcaseSection from '../HomePage/ReviewShowcaseSection'
import Footer from '../HomePage/Footer'
import DateRangePicker from '../../components/DateRangePicker'
import MapContainer from './MapContainer'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Carousel from './Carousel'
import { getResidence, getChat, initiateChat, addToWishlist, getShowcaseReviews } from './api'
import bed from '../../assets/images/home/bed.svg'
import shower from '../../assets/images/home/shower.svg'
import guest from '../../assets/images/home/person.svg'
import room from '../../assets/images/home/residence.svg'
import { ToastContainer, toast } from 'react-toastify'

function Property() {
  const location = useLocation();
  const id = useParams()
  const guests = location.state.guests
  const [carouselVisible, setCarouselVisible] = useState(false)
  const [carouselIndex, setCurrentCarouselIndex] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [gridExpanded, setGridExpanded] = useState(false)
  const [reviews, setReviews] = useState(null)
  const [residence, setResidence] = useState(null)
  const [startDate, setStartDate] = useState(
    localStorage.getItem('checkInDate') ? new Date(localStorage.getItem('checkInDate')) : new Date()
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem('checkOutDate') ? new Date(localStorage.getItem('checkOutDate')) : new Date(new Date().setDate(new Date().getDate() + 1)
  )
  );
  const [totalNights, setTotalNights] = useState(
    localStorage.getItem('checkInDate') && localStorage.getItem('checkOutDate') ? Math.floor((new Date(localStorage.getItem('checkOutDate')) - new Date(localStorage.getItem('checkInDate')))/ (1000 * 60 * 60 * 24)) : 1
  );
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getShowcaseReviews(id.id).then((res) => {
      setReviews(res.reviews)
    })
    //Get the property data from the API
    getResidence(id.id).then((res) => {
      setResidence(res.residence)
      console.log(res.residence)
    })
  }, [id]);

  const enquireHandler = () => {
    getChat(id.id).then((res) => {
    
      if(res.status === 200 || res.status === 201){
        initiateChat(id.id, res.chat._id).then((res) => { 
          if(res.status === 200){
            navigate('/messages', {state: {id:res.chat._id}})
          }
        })
      }

    })
}

  return (
    <>
    {carouselVisible && (
        <div
          className="fixed top-0 h-full w-full bg-black/20 z-30 flex justify-center items-center"
        >
          <div
            className="h-full w-full flex justify-center items-center backdrop-filter backdrop-blur-sm"onClick={()=>setCarouselVisible(false)}
          >
            <div className="w-4/5 md:w-1/2" onClick={(e) => e.stopPropagation()}>
              <Carousel images={residence.pictures} currIndex={carouselIndex}/>
            </div>
          </div>
        </div>
      )}
    <div className='md:hidden'>
    <div className='absolute z-10 w-full'>
        <div className='flex justify-between m-3'>
          <div className="w-10 h-10 bg-zinc-300 flex justify-center items-center rounded-full" onClick={()=>window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_223_1275)">
              <path d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_223_1275">
              <rect width="24" height="24" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <div className="w-10 h-10 bg-zinc-300 flex justify-center items-center rounded-full" onClick={()=>
            addToWishlist(residence).then((res) => {
              if(res.status === 201){
                console.log(res)
              }
            })
            }>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.16 4.99992C19.1 3.93713 17.6948 3.28846 16.1983 3.17109C14.7019 3.05372 13.2128 3.47539 12 4.35992C10.7277 3.41356 9.14399 2.98443 7.56792 3.15896C5.99185 3.33348 4.54044 4.0987 3.50597 5.30051C2.47151 6.50231 1.93082 8.05144 1.9928 9.63594C2.05478 11.2204 2.71482 12.7226 3.84 13.8399L10.05 20.0599C10.57 20.5717 11.2704 20.8585 12 20.8585C12.7296 20.8585 13.43 20.5717 13.95 20.0599L20.16 13.8399C21.3276 12.6652 21.9829 11.0762 21.9829 9.41992C21.9829 7.76365 21.3276 6.17465 20.16 4.99992ZM18.75 12.4599L12.54 18.6699C12.4693 18.7413 12.3852 18.7979 12.2925 18.8366C12.1999 18.8752 12.1004 18.8951 12 18.8951C11.8996 18.8951 11.8001 18.8752 11.7075 18.8366C11.6148 18.7979 11.5307 18.7413 11.46 18.6699L5.25 12.4299C4.46576 11.6283 4.02661 10.5514 4.02661 9.42992C4.02661 8.30846 4.46576 7.23158 5.25 6.42992C6.04916 5.64091 7.12697 5.19849 8.25 5.19849C9.37303 5.19849 10.4508 5.64091 11.25 6.42992C11.343 6.52365 11.4536 6.59804 11.5754 6.64881C11.6973 6.69958 11.828 6.72572 11.96 6.72572C12.092 6.72572 12.2227 6.69958 12.3446 6.64881C12.4664 6.59804 12.577 6.52365 12.67 6.42992C13.4692 5.64091 14.547 5.19849 15.67 5.19849C16.793 5.19849 17.8708 5.64091 18.67 6.42992C19.465 7.22107 19.9186 8.29211 19.9335 9.41361C19.9485 10.5351 19.5236 11.6179 18.75 12.4299V12.4599Z" fill="black"/>
          </svg>
          </div>
        </div>
      </div>

      {residence !== null ? <div className='absolute top-0 w-full z-0'>
      <Carousel images={residence.pictures} currIndex={0}/>
        <div className='flex justify-between w-full p-5 items-center'>
          <div className='text-xl text-primary font-custom-bold'>{residence.title}</div>


        </div>
        <div className='flex flex-row justify-between w-full p-5 items-center'>
          <div className='flex'>
            <div className='text-md self-center'>{residence.reviews.avg}</div>
            <div className='flex justify-center items-center h-full self-center'>
              <img src={Star} alt="bed" className='w-4 h-4 mx-2 -translate-y-[2px]'/>
            </div>
            <div className='w-[1px] bg-black'></div>
            <div className=" text-primary text-center text-md pl-2 line-clamp-2 pr-2">{residence.address.full}</div>
          </div>
          
          <div className=' flex justify-center' onClick={()=>enquireHandler()}>
            <button className='text-primary border border-primary active:bg-primary py-2 px-4 rounded-lg font-bold'>Enquire</button>
          </div>
        </div>

        <div className='h-full mx-2'>
            <hr className='w-full h-[2px]'></hr>
        </div>

        <div className="w-full text-primary font-custom-bold text-xl p-5">{residence.tag}</div>
        <div className=" text-primary text-xs px-5 flex gap-2">
          
        <div className='flex gap-1'>
            <img src={guest} alt='guest' className=''></img><div className='flex items-center'>{residence.accommodates+' guests'}</div>
          </div>

          <div className='flex gap-1'>
            <img src={bed} alt='bed' className=' w-6'></img><div className='flex items-center'>{residence.bedrooms+' bedrooms,'}</div>
          </div>

          <div className='flex gap-1'>
            <div className='flex items-center'>{residence.beds+' beds'}</div>
          </div>

          <div className='flex gap-1'>
            <img src={shower} alt='shower' className=''></img><div className='flex items-center'>{residence.bathrooms+' bathrooms'}</div>
          </div>

        </div>

        <div className='h-full mx-2 my-5'>
            <hr className='w-full h-[2px]'></hr>
        </div>

        <div className={`w-full px-5 text-primary text-xs font-normal leading-normal overflow-hidden overflow-ellipsis ${
          showFullDescription ? 'line-clamp-none' : 'line-clamp-3'
        }`}>{residence.publicDescription.summary}</div>

        <div className=" w-full text-primary underline font-bold text-xs px-5 py-2" onClick={()=>{setShowFullDescription(!showFullDescription)}}>{`${showFullDescription ? 'Collapse' : "Read More"} >`}</div>

        <div className='w-full px-5'>
          <div className='w-full flex justify-between px-5 border  rounded-lg py-3'>
            <div className='flex flex-col'>
              <div className='text-md font-bold'>{`£ ${(residence.prices.basePrice)*totalNights}`}</div>
              <div className='text-xs'>{`${
                // startDate in DD MMMM format
                startDate.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                })
                } - ${
                // endDate in DD MMMM format
                endDate.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                })
                } `}</div>
            </div>
            <div className=' flex justify-center'>
              <button className={`text-white border bg-secondary active:bg-primary py-2 px-4 rounded-lg font-bold ${bookingDisabled ? 'cursor-not-allowed' : ''} `}
                disabled={bookingDisabled}
                onClick={()=>navigate('/book',{
                  state: {
                    residence: residence,
                    startDate: startDate,
                    guests: guests,
                    endDate: endDate,
                    totalNights: totalNights
                  }
                })}>Book</button>
            </div>
          </div>
        </div>

        <div className='h-full mx-2 my-2'>
            <hr className='w-full h-[2px] '></hr>
        </div>

        <div className="mx-2 sm:container sm:mx-auto justify-center px-5 my-4 flex flex-col">
          <div className=' justify-center'>
            <DateRangePicker returnData={(props)=>{
              if(props.totalNights< residence.terms.minNights){
                toast.error(`Minimum stay is ${residence.terms.minNights} nights`)
                setBookingDisabled(true)
              }
              else{
                setBookingDisabled(false)
                console.log(props)
                setStartDate(props.startDate)
                setEndDate(props.endDate)
                setTotalNights(props.totalNights)
              }
            }}
            blockBooking={()=>setBookingDisabled(true)}
              initialStartDate={startDate}
              initialEndDate={endDate}
              residenceId={id.id}
            ></DateRangePicker>
          </div>
          
          <PhotoGrid carouselOpen={(index)=>{
            console.log("INDEX",index)
            setCurrentCarouselIndex(index)
            setCarouselVisible(true)}
            }
            isGridExpanded={(value)=>setGridExpanded(value)}
            images={residence.pictures}/>

          {residence ? <Amenities amenities={residence.amenities} expanded={gridExpanded}></Amenities> : 
            <div className='flex justify-center items-center mt-10'>
              <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
            </div>
          }
        </div>

        <div className='h-full mx-2 my-2'>
            <hr className='w-full h-[2px] '></hr>
        </div>

        {/* Map and Rules */}
        <div className='px-10 w-full md:col-span-4'>
        { residence ? <MapContainer coordinate={{lat: residence.address.lat,lng: residence.address.lng}} />
         :
          <div className='flex justify-center items-center mt-10'>
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
      }
        </div>

        <div className='flex m-5'>
          <div className='w-full rounded-lg bg-gray-200'>
            
            <div className='pl-5 text-lg font-custom-bold py-3'>Rules</div>

            {/* {residence.rules['smokingAllowed'] === false ? */}
             <div className='flex gap-2 pl-5 pb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.8 6.79999C17.0667 7.19999 18.2667 8.13333 18.2667 8.13333C19.2 8.79999 19.4667 9.19999 18.6667 10.6667C20.2667 10.8 21.8667 9.33333 21.2 7.59999C20.2667 4.66666 17.0667 5.59999 18.6667 2.66666C16.8 2.39999 14.8 4.66666 16.8 6.79999Z" fill="#1C1C1C"/>
                <path d="M4.33062 2.34322C3.78654 1.79225 2.89325 1.80483 2.36491 2.37092C1.8639 2.90772 1.87833 3.74497 2.39754 4.26418L19.8076 21.6743C20.3501 22.2167 21.2342 22.2015 21.7576 21.6407C22.2622 21.1 22.2405 20.2547 21.7087 19.7406L18.6667 16.8V12H13.8667L4.33062 2.34322Z" fill="#1C1C1C"/>
                <path d="M1.33331 14.6667C1.33331 16.1394 2.52722 17.3333 3.99998 17.3333H13.6L8.26665 12H3.99998C2.52722 12 1.33331 13.1939 1.33331 14.6667Z" fill="#1C1C1C"/>
                <path d="M22.6667 12H20V17.3333H22.6667V12Z" fill="#1C1C1C"/>
              </svg>
              <div className=' text-sm'>No smoking</div>
            </div>
            {/* : <></>} */}

            {/* {residence.rules['petsAllowed']=== false ? */}
             <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.97011 10.6714C7.92969 10.9385 7.1564 11.065 7.05799 11.0931C6.76273 11.1916 5.94727 10.8963 5.18804 10.4183C4.56941 10.0387 3.99296 9.53251 3.72582 9.02636C3.62741 8.84358 3.55711 8.74516 3.50087 8.71705C3.48681 8.73111 3.48681 8.74516 3.47275 8.77328C3.41651 8.89982 3.40245 9.13884 3.44463 9.34973C3.54305 9.9543 4.06326 10.3339 4.54129 10.6714C4.9209 10.9525 5.2724 11.2056 5.42706 11.5431L5.59577 11.9086C6.05974 12.9069 6.72055 14.3269 6.66431 15.283C6.65025 15.5923 6.63619 16.0141 6.66431 16.478C6.69243 16.8295 6.73461 17.2091 6.81897 17.5887C7.11423 18.9385 8.01405 19.1775 8.70298 19.0369C8.94199 18.9807 9.15289 18.8822 9.30755 18.7698C9.43408 18.6854 9.51844 18.587 9.51844 18.5026C9.51844 18.3902 9.30755 18.2917 8.78734 18.2917C8.56238 18.2917 8.39366 18.1652 8.25307 17.9824C8.14059 17.8278 8.04217 17.6169 7.98593 17.4341V17.42L7.97187 17.3919C7.85939 17.0967 7.83127 16.9982 7.85939 16.8858C7.88751 16.8014 7.94375 16.7733 8.01405 16.717C8.07029 16.6889 8.15465 16.6327 8.26713 16.5343C8.5202 16.2812 8.71704 15.9156 8.87169 15.5641C9.02635 15.2127 9.13883 14.8471 9.20913 14.594C9.4622 13.6098 10.5589 13.4271 11.5149 13.4974C11.6133 13.5114 11.7258 13.5114 11.8242 13.5255L8.97011 10.6714ZM17.181 11.6696C17.5044 11.1213 17.6731 10.6151 17.7575 10.1511C16.9139 9.9543 16.2249 9.65905 15.6344 9.32161C15.072 8.99824 14.6221 8.63269 14.2425 8.23901C14.116 8.43585 14.0316 8.54833 14.0316 8.54833C14.0316 8.56239 14.0176 8.57645 14.0035 8.59051C13.5958 8.8717 13.1459 9.12478 12.6678 9.36379C12.3023 9.53251 11.9367 9.70123 11.5571 9.84183L15.4798 13.7645C15.4798 13.7504 15.4938 13.7364 15.4938 13.7223V13.7083C15.5079 13.6942 15.522 13.6801 15.522 13.6661C16.2952 12.935 16.8295 12.2742 17.181 11.6696Z" fill="#1C1C1C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M20.5272 7.87348C20.4429 7.76101 20.2601 7.64853 19.9367 7.57823C19.2197 7.39545 17.884 6.04572 17.8137 5.97542C17.7856 5.9473 17.7715 5.91918 17.7715 5.877C17.8278 4.78034 17.6872 4.8647 17.6731 4.89282L17.0404 5.93324C17.0263 5.97542 16.9842 6.00354 16.942 6.00354C15.9297 6.13007 14.9314 7.29703 14.4112 8.01408C14.7768 8.3937 15.2267 8.75925 15.775 9.08262C16.3374 9.406 16.9982 9.68719 17.7996 9.88403C17.884 9.53254 18.1371 9.30758 18.4183 9.15292C18.7416 8.9842 19.0931 8.91391 19.3603 8.87173C19.7258 8.82955 20.1476 8.60459 20.4007 8.35152C20.485 8.26716 20.5413 8.16874 20.5694 8.08438C20.5835 8.01408 20.5694 7.94378 20.5272 7.87348ZM13.1599 14.8612C13.2021 15.0158 13.2443 15.1846 13.2864 15.3673C13.6098 16.464 14.1722 17.9121 14.3691 18.348C14.6221 18.9385 15.072 19.1494 15.4657 19.1353C15.7047 19.1353 15.9297 19.051 16.0703 18.9385C16.1968 18.8542 16.2531 18.7276 16.2109 18.6292C16.1546 18.4886 15.9437 18.348 15.5079 18.2355C15.4517 18.2215 15.4095 18.1793 15.3954 18.123C15.3532 17.8137 15.3251 17.5185 15.297 17.2513C15.2829 17.1529 15.2829 17.0686 15.2689 16.9842L13.1599 14.8612Z" fill="#1C1C1C"/>
              <path d="M18.3162 19.6335L4.31443 5.63172C3.95205 5.26933 3.95205 4.6818 4.31443 4.31942C4.67681 3.95704 5.26435 3.95704 5.62673 4.31942L19.6285 18.3212C19.9909 18.6836 19.9909 19.2712 19.6285 19.6335C19.2662 19.9959 18.6786 19.9959 18.3162 19.6335Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Pets</div>
            </div>
            {/* :<></>} */}

            {/* {residence.rules['partiesAllowed'] === false ?  */}
            <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.6505 1.38304C13.5393 1.36362 13.4216 1.38587 13.322 1.4573C12.9015 1.75828 12.2371 2.55464 12.7506 3.42658C12.8656 3.62134 12.8921 3.81632 12.8301 4.00666C12.7637 4.21468 12.6048 4.37887 12.4808 4.43198C12.2595 4.53388 12.1577 4.79506 12.2595 5.01638C12.3259 5.18899 12.4854 5.28607 12.6581 5.28607C12.72 5.28607 12.7768 5.27331 12.8387 5.24623C13.215 5.07805 13.534 4.71081 13.6712 4.2815C13.7686 3.98052 13.8176 3.50619 13.5122 2.98392C13.2864 2.59885 13.7771 2.22336 13.8346 2.17913C14.0338 2.03739 14.0782 1.76275 13.9366 1.56358C13.8658 1.46408 13.7617 1.40244 13.6505 1.38304ZM17.3409 3.45776C16.8275 3.53303 15.8751 3.94072 15.9327 4.94986C15.9416 5.1756 15.8755 5.36149 15.7339 5.50312C15.5789 5.65804 15.3618 5.72441 15.229 5.72441C14.99 5.71591 14.7781 5.8967 14.7648 6.14454C14.7516 6.38356 14.9371 6.59646 15.1849 6.60532H15.2515C15.6454 6.60532 16.0657 6.42383 16.3666 6.12728C16.5924 5.90155 16.8489 5.50698 16.8179 4.90059C16.7913 4.45356 17.4023 4.3432 17.4732 4.33435C17.7122 4.29892 17.8803 4.07369 17.8449 3.83468C17.8051 3.59125 17.5799 3.42237 17.3409 3.45776ZM9.9808 4.90319C9.94712 4.90035 9.91223 4.90032 9.87792 4.90457C9.74071 4.92229 9.62111 5.00197 9.55029 5.1259C6.87946 9.81718 4.24137 14.4214 1.4329 19.3387C1.33553 19.5113 1.36216 19.7278 1.50379 19.8695C1.58789 19.9536 1.70338 19.9983 1.81846 19.9983C1.8937 19.9983 1.96895 19.9802 2.03976 19.9405L16.2473 11.8231C16.3669 11.7478 16.4509 11.6283 16.4687 11.4911C16.4864 11.3539 16.4424 11.2168 16.345 11.1194L10.2496 5.02919C10.1766 4.95619 10.0818 4.91268 9.9808 4.90319ZM10.0327 6.06504L15.3042 11.3366L13.4015 12.4249L9.32899 7.29951L10.0327 6.06504ZM19.8263 7.71444C19.7151 7.73273 19.6109 7.79368 19.5401 7.89339C19.5003 7.95093 19.1239 8.44601 18.7344 8.21585C18.2077 7.91045 17.7387 7.95933 17.4377 8.05676C17.0128 8.18956 16.6412 8.50783 16.473 8.88404C16.3712 9.10535 16.473 9.37103 16.6943 9.4684C16.7518 9.49504 16.8139 9.50824 16.8758 9.50824C17.044 9.50824 17.2078 9.411 17.2787 9.24715C17.3318 9.12328 17.4995 8.96431 17.7031 8.89792C17.8934 8.83598 18.0884 8.86238 18.2832 8.97746C19.1595 9.49089 19.9567 8.82638 20.2576 8.40603C20.3993 8.20685 20.3504 7.93303 20.1556 7.79139C20.056 7.72067 19.9375 7.69616 19.8263 7.71444ZM8.86044 8.12765L12.6269 12.8676L11.3518 13.598L8.08588 9.48228L8.86044 8.12765ZM7.61215 10.3096L10.573 14.0406L9.30305 14.7668L6.83758 11.6642L7.61215 10.3096ZM6.35953 12.4915L8.51898 15.2094L7.25339 15.9356L5.58928 13.8418L6.35953 12.4915ZM17.7256 12.8235C15.0257 12.8235 12.8258 15.0234 12.8258 17.7233C12.8258 20.4232 15.0257 22.6231 17.7256 22.6231C20.4255 22.6231 22.6254 20.4232 22.6254 17.7233C22.6254 15.0234 20.4255 12.8235 17.7256 12.8235ZM17.7256 13.7087C19.9386 13.7087 21.7402 15.5103 21.7402 17.7233C21.7402 19.9364 19.9386 21.7379 17.7256 21.7379C15.5125 21.7379 13.711 19.9364 13.711 17.7233C13.711 15.5103 15.5125 13.7087 17.7256 13.7087ZM5.11987 14.6734L6.47882 16.3825L5.20373 17.1078L4.34531 16.0281L5.11987 14.6734ZM16.2543 15.8016C16.1414 15.8016 16.0285 15.8441 15.9422 15.9304C15.7696 16.103 15.7696 16.3819 15.9422 16.5545L17.1058 17.719L15.9422 18.8826C15.7696 19.0552 15.7696 19.3341 15.9422 19.5067C16.0307 19.5952 16.1409 19.6355 16.256 19.6355C16.3711 19.6355 16.4821 19.5908 16.5707 19.5067L17.7342 18.3431L18.8987 19.5067C18.9872 19.5952 19.0974 19.6355 19.2125 19.6355C19.3276 19.6355 19.4386 19.5908 19.5272 19.5067C19.6998 19.3341 19.6998 19.0552 19.5272 18.8826L18.3627 17.719L19.5272 16.5545C19.6909 16.3864 19.6911 16.103 19.5185 15.9304C19.3459 15.7578 19.067 15.7578 18.8944 15.9304L17.7299 17.0948L16.5663 15.9304C16.48 15.8441 16.3671 15.8016 16.2543 15.8016ZM3.87158 16.8562L4.42484 17.5547L3.01316 18.3604L3.87158 16.8562Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Parties</div>
            </div>
            {/* : <></>} */}

            {/* {residence.rules['childrenAllowed']=== false ?  */}
            <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.9 13.151C9.56275 13.6379 9.69705 14.5589 9.2 15.2081L7.7 17.1673C7.4167 17.5373 6.97215 17.755 6.5 17.755H4.5C3.67158 17.755 3 17.0972 3 16.2857C3 15.4742 3.67158 14.8163 4.5 14.8163H5.75L6.8 13.4448C7.29705 12.7956 8.23725 12.6641 8.9 13.151Z" fill="#1C1C1C"/>
              <path d="M19.737 15.009H18.135L17.8501 14.8807C17.1203 14.0862 15.9381 12.3589 14.9475 11.7659C14.5286 11.515 14.0576 11.3848 13.5794 11.3878H13.577H10.75L11.0429 17.7551H13.4074H13.408C13.7984 17.7544 14.1847 17.6685 14.5439 17.5022C14.9033 17.336 15.2283 17.0928 15.4995 16.7871L15.7843 16.4663C16.1438 16.8577 16.4758 17.7551 17.0095 17.7551H19.8039C20.1389 17.7551 20.3932 17.6105 20.6301 17.353C20.867 17.0955 21 16.7462 21 16.3821C21 16.018 20.867 15.6687 20.6301 15.4113C20.3932 15.1537 20.072 15.009 19.737 15.009ZM20 7.71431C20 9.47263 18.545 10.898 16.75 10.898C14.955 10.898 13.5 9.47263 13.5 7.71431C13.5 5.95599 14.955 4.53064 16.75 4.53064C18.545 4.53064 20 5.95599 20 7.71431Z" fill="#1C1C1C"/>
              <path d="M7.00003 13.9592C7.20003 12.5878 9.00003 11.2654 11.75 11.7551C12.5 13.7143 12.4014 17.6327 11.5 17.6327C9.00003 17.6327 8.58336 16.7347 8.25003 16.1633C7.75003 16 6.80003 15.3306 7.00003 13.9592Z" stroke="#1C1C1C" strokeWidth="0.5" strokeLinecap="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M16.75 9.9184C17.9927 9.9184 19 8.9316 19 7.71431C19 6.49702 17.9927 5.51023 16.75 5.51023C15.5073 5.51023 14.5 6.49702 14.5 7.71431C14.5 8.9316 15.5073 9.9184 16.75 9.9184ZM16.75 10.898C18.545 10.898 20 9.47263 20 7.71431C20 5.95599 18.545 4.53064 16.75 4.53064C14.955 4.53064 13.5 5.95599 13.5 7.71431C13.5 9.47263 14.955 10.898 16.75 10.898Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Children</div>
            </div>
            {/* :<></>} */}
          </div>
        </div>


        <div className='h-full mx-2 my-5'>
            <hr className='w-full h-[2px] '></hr>
        </div>

        <ReviewShowcaseSection reviews={reviews}></ReviewShowcaseSection>
        <div className='pb-5'></div>
        <Footer></Footer>
      </div>: 
        //Circular Progress
        <div className='flex justify-center items-center mt-10'>
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
      }
    </div>


    <div className='hidden md:block'>

    <DesktopNavbar></DesktopNavbar>
    {residence !== null ? <div>
    <div className='grid grid-cols-2 gap-3 container mx-auto px-5'>
      <div className='w-full relative'>
      <div className=' p-5 flex w-full justify-between absolute top-0 z-20'>
          <div className="w-10 h-10 bg-zinc-300 flex justify-center items-center rounded-full" onClick={()=>window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_223_1275)">
              <path d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_223_1275">
              <rect width="24" height="24" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <div className="w-10 h-10 bg-zinc-300 flex justify-center items-center rounded-full" onClick={()=>
            addToWishlist(residence).then((res) => {
              if(res.status === 201){
                console.log(res)
              }
            })
            }>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.16 4.99992C19.1 3.93713 17.6948 3.28846 16.1983 3.17109C14.7019 3.05372 13.2128 3.47539 12 4.35992C10.7277 3.41356 9.14399 2.98443 7.56792 3.15896C5.99185 3.33348 4.54044 4.0987 3.50597 5.30051C2.47151 6.50231 1.93082 8.05144 1.9928 9.63594C2.05478 11.2204 2.71482 12.7226 3.84 13.8399L10.05 20.0599C10.57 20.5717 11.2704 20.8585 12 20.8585C12.7296 20.8585 13.43 20.5717 13.95 20.0599L20.16 13.8399C21.3276 12.6652 21.9829 11.0762 21.9829 9.41992C21.9829 7.76365 21.3276 6.17465 20.16 4.99992ZM18.75 12.4599L12.54 18.6699C12.4693 18.7413 12.3852 18.7979 12.2925 18.8366C12.1999 18.8752 12.1004 18.8951 12 18.8951C11.8996 18.8951 11.8001 18.8752 11.7075 18.8366C11.6148 18.7979 11.5307 18.7413 11.46 18.6699L5.25 12.4299C4.46576 11.6283 4.02661 10.5514 4.02661 9.42992C4.02661 8.30846 4.46576 7.23158 5.25 6.42992C6.04916 5.64091 7.12697 5.19849 8.25 5.19849C9.37303 5.19849 10.4508 5.64091 11.25 6.42992C11.343 6.52365 11.4536 6.59804 11.5754 6.64881C11.6973 6.69958 11.828 6.72572 11.96 6.72572C12.092 6.72572 12.2227 6.69958 12.3446 6.64881C12.4664 6.59804 12.577 6.52365 12.67 6.42992C13.4692 5.64091 14.547 5.19849 15.67 5.19849C16.793 5.19849 17.8708 5.64091 18.67 6.42992C19.465 7.22107 19.9186 8.29211 19.9335 9.41361C19.9485 10.5351 19.5236 11.6179 18.75 12.4299V12.4599Z" fill="black"/>
          </svg>
          </div>
        </div>
        <Carousel images={residence.pictures} currIndex={0}/>
      </div>
      <div>
      <div className='flex justify-between w-full p-5 items-center'>
          <div className='text-xl text-primary font-custom-bold'>{residence.title}</div>
        </div>
        <div className='flex flex-row justify-between w-full pb-5 items-center'>
          <div className='flex items-center'>
            <div className='text-md self-center'>{residence.reviews.avg}</div>
            <div className='flex justify-center items-center h-full self-center'>
              <img src={Star} alt="bed" className='w-4 h-4 mx-2 -translate-y-[2px]'/>
            </div>
            <div className='w-[1px] h-10 bg-black'></div>
            <div className=" text-primary text-md pl-2text-center line-clamp-2 ml-2">{residence.address.full}</div>
          </div>
          
          <div className=' flex justify-center' onClick={()=>enquireHandler()}>
            <button className='text-primary hover:scale-105 transition duration-75 hover:bg-primary hover:text-white active:text-primary active:bg-white border border-black py-2 px-4 rounded-lg font-bold'>Enquire</button>
          </div>
        </div>

        <div className=' mx-2'>
            <hr className='w-full h-[2px]'></hr>
        </div>

        <div className="w-full text-primary font-custom-bold text-xl p-5">{residence.roomType}</div>
        <div className=" text-primary text-xs px-5 flex gap-2">
          
          <div className='flex gap-1'>
            <img src={guest} alt='guest' className=''></img><div className='flex items-center'>{residence.accommodates+' guests'}</div>
          </div>

          <div className='flex gap-1'>
            <img src={bed} alt='bed' className=' w-6'></img><div className='flex items-center'>{residence.bedrooms+' bedrooms,'}</div>
          </div>

          <div className='flex gap-1'>
            <div className='flex items-center'>{residence.beds+' beds'}</div>
          </div>

          <div className='flex gap-1'>
            <img src={shower} alt='shower' className=''></img><div className='flex items-center'>{residence.bathrooms+' bathrooms'}</div>
          </div>

        </div>
        <div className=' mx-2 my-5'>
            <hr className='w-full h-[2px]'></hr>
        </div>

        <div className={`w-full px-5 text-primary text-xs font-normal leading-normal overflow-hidden overflow-ellipsis ${
          showFullDescription ? 'line-clamp-none' : 'line-clamp-3'
        }`}>{residence.publicDescription.summary}</div>

        <div className=" w-full text-primary underline font-bold text-xs px-5 py-2" onClick={()=>{setShowFullDescription(!showFullDescription)}}>{`${showFullDescription ? 'Collapse' : "Read More"} >`}</div>

        <div className='w-full px-5'>
          <div className='w-full flex justify-between px-5 border rounded-lg py-3'>
          <div className='flex flex-col'>
          <div className='text-md font-bold'>{`£ ${(residence.prices.basePrice)*totalNights}`}</div>
            <div className='text-xs'>{`${
              // startDate in DD MMMM format
              startDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
              })
              } - ${
              // endDate in DD MMMM format
              endDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
              })
              } `}</div>
          </div>
          <div className=' flex justify-center'>
            <button className={`text-white border bg-secondary hover:bg-primary hover:scale-105 transition duration-75 py-2 px-4 rounded-lg font-bold ${bookingDisabled ? 'cursor-not-allowed' : ''} `}
              disabled={bookingDisabled}
              onClick={()=>navigate('/book',{
              state: {
                residence: residence,
                startDate:
                  //Date should be absolute, not relative to timezone
                  new Date(
                    startDate.getTime() -
                      startDate.getTimezoneOffset() * 60000
                  ),
                endDate: 
                  //Date should be absolute, not relative to timezone
                  new Date(
                    endDate.getTime() -
                      endDate.getTimezoneOffset() * 60000
                  )
                ,
                guests: guests,
                totalNights: totalNights
              }
            })}>Book</button>
          </div>
        </div>
        </div>
      </div>
    </div>

        <div className='container mx-auto'>
          <div className='w-full flex justify-center'>

            <div className="my-10 w-full lg:w-4/5 flex flex-col">
              <PhotoGrid carouselOpen={(index)=>{
              console.log("INDEX",index)
              setCurrentCarouselIndex(index)
              setCarouselVisible(true)}
              }
              isGridExpanded={(value)=>setGridExpanded(value)}
              images={residence.pictures}/>

              
            {!gridExpanded ? residence ? <Amenities amenities={residence.amenities} expanded={gridExpanded}></Amenities> : <div className='flex justify-center items-center mt-10'>
                <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
              </div> : null
              }

            </div>

            <div className='my-10 justify-center'>
              <DateRangePicker returnData={(props)=>{
                if(props.totalNights< residence.terms.minNights){
                  toast.error(`Minimum stay is ${residence.terms.minNights} nights`)
                  setBookingDisabled(true)
                }
                else{
                  setBookingDisabled(false)
                  console.log(props)
                  setStartDate(props.startDate)
                  setEndDate(props.endDate)
                  setTotalNights(props.totalNights)
                }
              }}
              blockBooking={()=>setBookingDisabled(true)}
              initialStartDate={startDate}
              initialEndDate={endDate}
              residenceId={id.id}
              ></DateRangePicker>
                {
                  gridExpanded ? residence ? <Amenities amenities={residence.amenities} expanded={gridExpanded}></Amenities> : <div className='flex justify-center items-center mt-10'>
                  <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                  </div>: null
                }
            </div>
          </div>
        
        <div className='h-full mx-2 my-2'>
            <hr className='w-full h-[2px] '></hr>
        </div>

        <div className='lg:flex lg:flex-row md:grid md:grid-cols-6 pt-10'>
        {/* Map and Rules */}
        <div className='px-10 w-full md:col-span-4'>
        { residence ? <MapContainer coordinate={{lat: residence.address.lat,lng: residence.address.lng}} /> :
          <div className='flex justify-center items-center mt-10'>
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
      }
        </div>
          <div className='flex justify-center md:col-span-2'>
          <div className='w-96 md:w-40 rounded-lg bg-gray-200 h-full pr-3 grow-0'>
            
            <div className='pl-5 text-lg font-custom-bold py-3'>Rules</div>

            {/* {residence.rules['smokingAllowed'] === false ? */}
             <div className='flex gap-2 pl-5 pb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.8 6.79999C17.0667 7.19999 18.2667 8.13333 18.2667 8.13333C19.2 8.79999 19.4667 9.19999 18.6667 10.6667C20.2667 10.8 21.8667 9.33333 21.2 7.59999C20.2667 4.66666 17.0667 5.59999 18.6667 2.66666C16.8 2.39999 14.8 4.66666 16.8 6.79999Z" fill="#1C1C1C"/>
                <path d="M4.33062 2.34322C3.78654 1.79225 2.89325 1.80483 2.36491 2.37092C1.8639 2.90772 1.87833 3.74497 2.39754 4.26418L19.8076 21.6743C20.3501 22.2167 21.2342 22.2015 21.7576 21.6407C22.2622 21.1 22.2405 20.2547 21.7087 19.7406L18.6667 16.8V12H13.8667L4.33062 2.34322Z" fill="#1C1C1C"/>
                <path d="M1.33331 14.6667C1.33331 16.1394 2.52722 17.3333 3.99998 17.3333H13.6L8.26665 12H3.99998C2.52722 12 1.33331 13.1939 1.33331 14.6667Z" fill="#1C1C1C"/>
                <path d="M22.6667 12H20V17.3333H22.6667V12Z" fill="#1C1C1C"/>
              </svg>
              <div className=' text-sm'>No smoking</div>
            </div>
            {/* : <></>} */}

            {/* {residence.rules['petsAllowed']=== false ?  */}
            <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.97011 10.6714C7.92969 10.9385 7.1564 11.065 7.05799 11.0931C6.76273 11.1916 5.94727 10.8963 5.18804 10.4183C4.56941 10.0387 3.99296 9.53251 3.72582 9.02636C3.62741 8.84358 3.55711 8.74516 3.50087 8.71705C3.48681 8.73111 3.48681 8.74516 3.47275 8.77328C3.41651 8.89982 3.40245 9.13884 3.44463 9.34973C3.54305 9.9543 4.06326 10.3339 4.54129 10.6714C4.9209 10.9525 5.2724 11.2056 5.42706 11.5431L5.59577 11.9086C6.05974 12.9069 6.72055 14.3269 6.66431 15.283C6.65025 15.5923 6.63619 16.0141 6.66431 16.478C6.69243 16.8295 6.73461 17.2091 6.81897 17.5887C7.11423 18.9385 8.01405 19.1775 8.70298 19.0369C8.94199 18.9807 9.15289 18.8822 9.30755 18.7698C9.43408 18.6854 9.51844 18.587 9.51844 18.5026C9.51844 18.3902 9.30755 18.2917 8.78734 18.2917C8.56238 18.2917 8.39366 18.1652 8.25307 17.9824C8.14059 17.8278 8.04217 17.6169 7.98593 17.4341V17.42L7.97187 17.3919C7.85939 17.0967 7.83127 16.9982 7.85939 16.8858C7.88751 16.8014 7.94375 16.7733 8.01405 16.717C8.07029 16.6889 8.15465 16.6327 8.26713 16.5343C8.5202 16.2812 8.71704 15.9156 8.87169 15.5641C9.02635 15.2127 9.13883 14.8471 9.20913 14.594C9.4622 13.6098 10.5589 13.4271 11.5149 13.4974C11.6133 13.5114 11.7258 13.5114 11.8242 13.5255L8.97011 10.6714ZM17.181 11.6696C17.5044 11.1213 17.6731 10.6151 17.7575 10.1511C16.9139 9.9543 16.2249 9.65905 15.6344 9.32161C15.072 8.99824 14.6221 8.63269 14.2425 8.23901C14.116 8.43585 14.0316 8.54833 14.0316 8.54833C14.0316 8.56239 14.0176 8.57645 14.0035 8.59051C13.5958 8.8717 13.1459 9.12478 12.6678 9.36379C12.3023 9.53251 11.9367 9.70123 11.5571 9.84183L15.4798 13.7645C15.4798 13.7504 15.4938 13.7364 15.4938 13.7223V13.7083C15.5079 13.6942 15.522 13.6801 15.522 13.6661C16.2952 12.935 16.8295 12.2742 17.181 11.6696Z" fill="#1C1C1C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M20.5272 7.87348C20.4429 7.76101 20.2601 7.64853 19.9367 7.57823C19.2197 7.39545 17.884 6.04572 17.8137 5.97542C17.7856 5.9473 17.7715 5.91918 17.7715 5.877C17.8278 4.78034 17.6872 4.8647 17.6731 4.89282L17.0404 5.93324C17.0263 5.97542 16.9842 6.00354 16.942 6.00354C15.9297 6.13007 14.9314 7.29703 14.4112 8.01408C14.7768 8.3937 15.2267 8.75925 15.775 9.08262C16.3374 9.406 16.9982 9.68719 17.7996 9.88403C17.884 9.53254 18.1371 9.30758 18.4183 9.15292C18.7416 8.9842 19.0931 8.91391 19.3603 8.87173C19.7258 8.82955 20.1476 8.60459 20.4007 8.35152C20.485 8.26716 20.5413 8.16874 20.5694 8.08438C20.5835 8.01408 20.5694 7.94378 20.5272 7.87348ZM13.1599 14.8612C13.2021 15.0158 13.2443 15.1846 13.2864 15.3673C13.6098 16.464 14.1722 17.9121 14.3691 18.348C14.6221 18.9385 15.072 19.1494 15.4657 19.1353C15.7047 19.1353 15.9297 19.051 16.0703 18.9385C16.1968 18.8542 16.2531 18.7276 16.2109 18.6292C16.1546 18.4886 15.9437 18.348 15.5079 18.2355C15.4517 18.2215 15.4095 18.1793 15.3954 18.123C15.3532 17.8137 15.3251 17.5185 15.297 17.2513C15.2829 17.1529 15.2829 17.0686 15.2689 16.9842L13.1599 14.8612Z" fill="#1C1C1C"/>
              <path d="M18.3162 19.6335L4.31443 5.63172C3.95205 5.26933 3.95205 4.6818 4.31443 4.31942C4.67681 3.95704 5.26435 3.95704 5.62673 4.31942L19.6285 18.3212C19.9909 18.6836 19.9909 19.2712 19.6285 19.6335C19.2662 19.9959 18.6786 19.9959 18.3162 19.6335Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Pets</div>
            </div>
            {/* :<></>} */}

            {/* {residence.rules['partiesAllowed'] === false ?  */}
            <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.6505 1.38304C13.5393 1.36362 13.4216 1.38587 13.322 1.4573C12.9015 1.75828 12.2371 2.55464 12.7506 3.42658C12.8656 3.62134 12.8921 3.81632 12.8301 4.00666C12.7637 4.21468 12.6048 4.37887 12.4808 4.43198C12.2595 4.53388 12.1577 4.79506 12.2595 5.01638C12.3259 5.18899 12.4854 5.28607 12.6581 5.28607C12.72 5.28607 12.7768 5.27331 12.8387 5.24623C13.215 5.07805 13.534 4.71081 13.6712 4.2815C13.7686 3.98052 13.8176 3.50619 13.5122 2.98392C13.2864 2.59885 13.7771 2.22336 13.8346 2.17913C14.0338 2.03739 14.0782 1.76275 13.9366 1.56358C13.8658 1.46408 13.7617 1.40244 13.6505 1.38304ZM17.3409 3.45776C16.8275 3.53303 15.8751 3.94072 15.9327 4.94986C15.9416 5.1756 15.8755 5.36149 15.7339 5.50312C15.5789 5.65804 15.3618 5.72441 15.229 5.72441C14.99 5.71591 14.7781 5.8967 14.7648 6.14454C14.7516 6.38356 14.9371 6.59646 15.1849 6.60532H15.2515C15.6454 6.60532 16.0657 6.42383 16.3666 6.12728C16.5924 5.90155 16.8489 5.50698 16.8179 4.90059C16.7913 4.45356 17.4023 4.3432 17.4732 4.33435C17.7122 4.29892 17.8803 4.07369 17.8449 3.83468C17.8051 3.59125 17.5799 3.42237 17.3409 3.45776ZM9.9808 4.90319C9.94712 4.90035 9.91223 4.90032 9.87792 4.90457C9.74071 4.92229 9.62111 5.00197 9.55029 5.1259C6.87946 9.81718 4.24137 14.4214 1.4329 19.3387C1.33553 19.5113 1.36216 19.7278 1.50379 19.8695C1.58789 19.9536 1.70338 19.9983 1.81846 19.9983C1.8937 19.9983 1.96895 19.9802 2.03976 19.9405L16.2473 11.8231C16.3669 11.7478 16.4509 11.6283 16.4687 11.4911C16.4864 11.3539 16.4424 11.2168 16.345 11.1194L10.2496 5.02919C10.1766 4.95619 10.0818 4.91268 9.9808 4.90319ZM10.0327 6.06504L15.3042 11.3366L13.4015 12.4249L9.32899 7.29951L10.0327 6.06504ZM19.8263 7.71444C19.7151 7.73273 19.6109 7.79368 19.5401 7.89339C19.5003 7.95093 19.1239 8.44601 18.7344 8.21585C18.2077 7.91045 17.7387 7.95933 17.4377 8.05676C17.0128 8.18956 16.6412 8.50783 16.473 8.88404C16.3712 9.10535 16.473 9.37103 16.6943 9.4684C16.7518 9.49504 16.8139 9.50824 16.8758 9.50824C17.044 9.50824 17.2078 9.411 17.2787 9.24715C17.3318 9.12328 17.4995 8.96431 17.7031 8.89792C17.8934 8.83598 18.0884 8.86238 18.2832 8.97746C19.1595 9.49089 19.9567 8.82638 20.2576 8.40603C20.3993 8.20685 20.3504 7.93303 20.1556 7.79139C20.056 7.72067 19.9375 7.69616 19.8263 7.71444ZM8.86044 8.12765L12.6269 12.8676L11.3518 13.598L8.08588 9.48228L8.86044 8.12765ZM7.61215 10.3096L10.573 14.0406L9.30305 14.7668L6.83758 11.6642L7.61215 10.3096ZM6.35953 12.4915L8.51898 15.2094L7.25339 15.9356L5.58928 13.8418L6.35953 12.4915ZM17.7256 12.8235C15.0257 12.8235 12.8258 15.0234 12.8258 17.7233C12.8258 20.4232 15.0257 22.6231 17.7256 22.6231C20.4255 22.6231 22.6254 20.4232 22.6254 17.7233C22.6254 15.0234 20.4255 12.8235 17.7256 12.8235ZM17.7256 13.7087C19.9386 13.7087 21.7402 15.5103 21.7402 17.7233C21.7402 19.9364 19.9386 21.7379 17.7256 21.7379C15.5125 21.7379 13.711 19.9364 13.711 17.7233C13.711 15.5103 15.5125 13.7087 17.7256 13.7087ZM5.11987 14.6734L6.47882 16.3825L5.20373 17.1078L4.34531 16.0281L5.11987 14.6734ZM16.2543 15.8016C16.1414 15.8016 16.0285 15.8441 15.9422 15.9304C15.7696 16.103 15.7696 16.3819 15.9422 16.5545L17.1058 17.719L15.9422 18.8826C15.7696 19.0552 15.7696 19.3341 15.9422 19.5067C16.0307 19.5952 16.1409 19.6355 16.256 19.6355C16.3711 19.6355 16.4821 19.5908 16.5707 19.5067L17.7342 18.3431L18.8987 19.5067C18.9872 19.5952 19.0974 19.6355 19.2125 19.6355C19.3276 19.6355 19.4386 19.5908 19.5272 19.5067C19.6998 19.3341 19.6998 19.0552 19.5272 18.8826L18.3627 17.719L19.5272 16.5545C19.6909 16.3864 19.6911 16.103 19.5185 15.9304C19.3459 15.7578 19.067 15.7578 18.8944 15.9304L17.7299 17.0948L16.5663 15.9304C16.48 15.8441 16.3671 15.8016 16.2543 15.8016ZM3.87158 16.8562L4.42484 17.5547L3.01316 18.3604L3.87158 16.8562Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Parties</div>
            </div>
            {/* : <></>} */}

            {/* {residence.rules['childrenAllowed']=== false ?  */}
            <div className='flex gap-2 pl-5 pb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.9 13.151C9.56275 13.6379 9.69705 14.5589 9.2 15.2081L7.7 17.1673C7.4167 17.5373 6.97215 17.755 6.5 17.755H4.5C3.67158 17.755 3 17.0972 3 16.2857C3 15.4742 3.67158 14.8163 4.5 14.8163H5.75L6.8 13.4448C7.29705 12.7956 8.23725 12.6641 8.9 13.151Z" fill="#1C1C1C"/>
              <path d="M19.737 15.009H18.135L17.8501 14.8807C17.1203 14.0862 15.9381 12.3589 14.9475 11.7659C14.5286 11.515 14.0576 11.3848 13.5794 11.3878H13.577H10.75L11.0429 17.7551H13.4074H13.408C13.7984 17.7544 14.1847 17.6685 14.5439 17.5022C14.9033 17.336 15.2283 17.0928 15.4995 16.7871L15.7843 16.4663C16.1438 16.8577 16.4758 17.7551 17.0095 17.7551H19.8039C20.1389 17.7551 20.3932 17.6105 20.6301 17.353C20.867 17.0955 21 16.7462 21 16.3821C21 16.018 20.867 15.6687 20.6301 15.4113C20.3932 15.1537 20.072 15.009 19.737 15.009ZM20 7.71431C20 9.47263 18.545 10.898 16.75 10.898C14.955 10.898 13.5 9.47263 13.5 7.71431C13.5 5.95599 14.955 4.53064 16.75 4.53064C18.545 4.53064 20 5.95599 20 7.71431Z" fill="#1C1C1C"/>
              <path d="M7.00003 13.9592C7.20003 12.5878 9.00003 11.2654 11.75 11.7551C12.5 13.7143 12.4014 17.6327 11.5 17.6327C9.00003 17.6327 8.58336 16.7347 8.25003 16.1633C7.75003 16 6.80003 15.3306 7.00003 13.9592Z" stroke="#1C1C1C" strokeWidth="0.5" strokeLinecap="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M16.75 9.9184C17.9927 9.9184 19 8.9316 19 7.71431C19 6.49702 17.9927 5.51023 16.75 5.51023C15.5073 5.51023 14.5 6.49702 14.5 7.71431C14.5 8.9316 15.5073 9.9184 16.75 9.9184ZM16.75 10.898C18.545 10.898 20 9.47263 20 7.71431C20 5.95599 18.545 4.53064 16.75 4.53064C14.955 4.53064 13.5 5.95599 13.5 7.71431C13.5 9.47263 14.955 10.898 16.75 10.898Z" fill="#1C1C1C"/>
            </svg>
              <div className=' text-sm'>No Children</div>
            </div>
            {/* :<></>} */}
          </div>
          </div>

        </div>

        <div className='h-full mx-2 my-5'>
            <hr className='w-full h-[2px] '></hr>
        </div>

        <ReviewShowcaseSection reviews={residence.reviews}></ReviewShowcaseSection>
        <div className='pb-5'></div>
        </div>

        <Footer></Footer>
        </div>: <div className='flex justify-center items-center mt-10'> 
          <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
        </div>}
    </div>

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
    </>
  )
}

export default Property