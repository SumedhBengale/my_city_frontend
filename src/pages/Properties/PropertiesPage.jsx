import {React, useState, useEffect, useRef} from 'react'
import Navbar from '../../components/navbar'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbar'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import PropertiesBackground from '../../assets/images/properties/properties_top_image.jpg'
import SearchCard from '../../components/searchCard'
import filterBlack from '../../assets/images/properties/filter_black.svg'
import PropertyCard from '../HomePage/PropertyCard'
import Footer from '../HomePage/Footer'
import logoWhite from '../../assets/images/white_logo.png'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import SortDropdown from './sortDropdown'
import Filter from '../../components/filter'
import { useLocation } from 'react-router-dom'
import { getResidences } from './api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PropertiesPage() {
  const  navigate = useNavigate();
  const search = (params) => {
    console.log(params)
    //if params.startDate is greater than params.endDate, show toast
    if(params.startDate > params.endDate){
      toast.error("Cannot Check-in after Check-out")
      return
    }
    localStorage.setItem('checkInDate', params.startDate)
    localStorage.setItem('checkOutDate', params.endDate)
    localStorage.setItem('guestCount', params.guests)
    navigate('/properties', {state: {filterData:params}})
  }

    const [blackNavbar, setBlackNavbar] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [residences, setResidences] = useState(null);
    const nearbyPropertiesRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
      console.log(location.state)
    getResidences(location.state ?  {filterData: location.state.filterData}: {}).then((res) => {
      console.log(res)
      setResidences(res.residences.results)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    });
      const handleScroll = () => {
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        console.log(scrollPosition, screenHeight * 70 / 100)
        if (scrollPosition >= screenHeight * 70 / 100) {
          setBlackNavbar(true);
        } else {
          setBlackNavbar(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      //Scroll to the ref 'nearbyPropertiesRef' when the page loads
      if (nearbyPropertiesRef.current) {
        console.log('scrolling')
        setTimeout(() => window.scrollTo({
          top: nearbyPropertiesRef.current.offsetTop - 50,
          behavior: 'smooth',
        }), 100);
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
      

    }, [location.state]);
  return (
    <>
      <>
      {filterVisible &&
      <div className='h-screen w-screen absolute'>
      <Filter apply={(data)=>{
        setFilterVisible(false)
        console.log('filter applied')
        console.log(data)
      }} close={()=>setFilterVisible(false)}></Filter>
      </div>}

    <div
        style={{
          backgroundImage: `url(${PropertiesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '80vh',
        }}
      > {/* Background Image */}
        <div className="hidden md:block z-20 fixed w-full">
        {
          blackNavbar ? <DesktopNavbarBlack /> : <DesktopNavbar />
        }
        </div>

        <div className="md:hidden z-20 fixed w-full">
          {
            blackNavbar ? <NavbarBlack /> : <Navbar />
          }
        </div>


        <div className='h-full flex flex-col justify-center items-center z-0 bg-black/40'>
          <div className='lg:hidden'>
            <div className='font-custom-bold text-2xl lg:text-4xl text-white text-center pt-10 pb-4'>My City Residence</div>
            <div className=' text-lg w-full text-center font-semibold text-white capitalize sm-3 lg:mb-10'>Discover your next home away from home</div>
          </div>

          <div className='hidden lg:block justify-center items-center'>
            <img src={logoWhite} alt='My City Logo' className='md:w-48 lg:w-72 self-start mb-10'></img>
          </div>
          <SearchCard search={(params)=>search(params)}></SearchCard>
        </div>
      </div>

    <div className='px-5 md:container md:mx-auto'
    ref={nearbyPropertiesRef}>
    <FadeInSection>
      { residences ? 
      <PropertiesSection setFilterVisible={setFilterVisible} residences={residences}></PropertiesSection>
        :
        <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
        </div>
    }
      </FadeInSection>

    </div>
    {/* <FadeInSection> */}
    <Footer></Footer>
    {/* </FadeInSection> */}

    </>
    </>
  )
}

export default PropertiesPage




function PropertiesSection({setFilterVisible, residences}) {
  const [sortValue, setSortValue] = useState('p-lh')
  const [sortedResidences, setSortedResidences] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(residences){
      console.log('sorting')
      if(sortValue === 'p-lh'){
        //Sort by price low to high
        setSortedResidences(residences.sort((a, b) => a.prices.basePrice - b.prices.basePrice))
      }else if(sortValue === 'p-hl'){
        //Sort by price high to low
        setSortedResidences(residences.sort((a, b) => b.prices.basePrice - a.prices.basePrice))
      }else if(sortValue === 'r-hl'){
        //Sort by rating high to low
        setSortedResidences(residences.sort((a, b) => b.reviews.avg - a.reviews.avg))
      }
      setLoading(false)
    }
  }, [sortValue, residences])
  
  return (
    <>
       <div className="text-black font-custom-bold text-2xl pt-10 capitalize">Nearby Properties</div>

<div className='flex justify-between sm:justify-end mt-3 mb-5 gap-5'>
    
    <div className="flex z-10 items-center">
        <div className="flex self-center">Sort by:</div>
        <SortDropdown setSortValue={(value)=>{
          setLoading(true)
          setSortValue(value);
          console.log(value)
          }}/>
    </div>
    <div className='h-8 w-8 md:h-10 md:w-10 bg-gray-200 rounded-md flex justify-center items-center p-1' onClick={()=>setFilterVisible(true)}>
        <img src={filterBlack} alt="filter" className='h-3/4 w-3/4'/>
    </div>
</div>


{sortedResidences && sortedResidences.length > 0 ?
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 place-items-center'>
  {sortedResidences && loading !== true ? sortedResidences.map((residence, index) => {
    return (
      <PropertyCard key={index} residence={residence}></PropertyCard>
    )
  }): <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
  </div>
    }
</div>
: <div className='text-center text-2xl font-bold'>
  No Residences found
</div>
}
<div className='flex justify-center my-10'>
    <div className="w-[178px] h-14 border bg-secondary border-secondary text-white hover:bg-primary hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md" >
    <div className='font-bold text-2xl h-full flex justify-center items-center'>View All</div>
    </div>
</div>
    </>
  )
}