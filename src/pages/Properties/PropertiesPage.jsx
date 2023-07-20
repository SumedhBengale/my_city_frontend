import {React, useState, useEffect} from 'react'
import Navbar from '../../components/navbar'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbar'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import PropertiesBackground from '../../assets/images/properties/properties_top_image.png'
import SearchCard from '../../components/searchCard'
import filterBlack from '../../assets/images/properties/filter_black.svg'
import PropertyCard from '../HomePage/PropertyCard'
import Footer from '../HomePage/Footer'
import logoWhite from '../../assets/images/white_logo.png'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import SortDropdown from './sortDropdown'

function PropertiesPage() {
    const [sortValue, setsortValue] = useState('r-hl')
    const [blackNavbar, setBlackNavbar] = useState(false);

    const handleSelectChange = (value) => {
      setsortValue(value);
      console.log(value)
    };

    useEffect(() => {
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
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <>
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


        <div className='h-full flex flex-col justify-center items-center mx-5 z-0'>
          <div className='lg:hidden'>
            <div className='font-custom font-bold text-2xl sm:text-4xl text-white text-center pt-10 pb-4'>My City Residence</div>
            <div className=' text-lg w-full text-center font-semibold text-white capitalize sm-3 sm:mb-10'>Discover your next home away from home</div>
          </div>

          <div className='hidden lg:block justify-center items-center'>
            <img src={logoWhite} alt='My City Logo' className='md:w-48 lg:w-72 self-start mb-20'></img>
          </div>
          <SearchCard></SearchCard>
        </div>
      </div>

    <div className='px-5 container mx-auto'>
    <FadeInSection>
      <PropertiesSection sortValue={sortValue} handleSelectChange={handleSelectChange}></PropertiesSection>
    </FadeInSection>

    </div>
    <FadeInSection>
    <Footer></Footer>
    </FadeInSection>

    </>
  )
}

export default PropertiesPage




function PropertiesSection({sortValue, handleSelectChange}) {
  return (
    <>
       <div className="text-black font-custom font-bold text-2xl pt-10 capitalize">Nearby Properties</div>

<div className='flex justify-between mt-3 mb-5'>
    <div className='h-10 w-10 bg-gray-200 rounded-md flex justify-center items-center p-1'>
        <img src={filterBlack} alt="filter" className='h-3/4 w-3/4'/>
    </div>
    <div className="flex z-10 items-center">
        <div className="text-[12px] self-center">Sort by:</div>
        <SortDropdown/>
    </div>
</div>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 place-items-center'>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
  <PropertyCard></PropertyCard>
</div>
<div className='flex justify-center mt-10'>
    <div className="w-[178px] h-14 bg-black text-white hover:scale-105 transition duration-75 cursor-pointer  rounded-xl backdrop-blur-md" >
    <div className='font-bold text-2xl h-full flex justify-center items-center'>View All</div>
    </div>
</div>
    </>
  )
}