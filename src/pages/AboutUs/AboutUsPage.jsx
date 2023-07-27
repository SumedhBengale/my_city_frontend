import React, { useEffect } from 'react'
import Navbar from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import OurStorySection from './OurStorySection'
import Image1 from '../../assets/images/about/about_img_1.jpg'
import OurValuesSection from './OurValuesSection'
import OurPartnersSection from './OurPartnersSection'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import Footer from '../HomePage/Footer'

function AboutUsPage() {
  return (
    <>
        <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbar />
        }
        </div>

        <div className="md:hidden z-20 fixed w-full">
          {
            <Navbar />
          }
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
          <div className='h-16 bg-transparent'></div>
          <FadeInSection>
          <div className='md:hidden relative mr-5'>
        <div className='w-full h-[300px] rounded-r-[70px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[70px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full pb-20 bg-gradient-to-b from-transparent via-gray to-black/60 rounded-r-[70px] px-10'>
          <div className='text-white font-bold text-3xl  drop-shadow-lg font-custom'>Who Are We?</div>
          <div className='text-white text-md drop-shadow-lg'>Discover your next home away from home</div>

        </div>
      </div>

      <div className='hidden md:block relative md:mr-10 xl:mr-20'>
        <div className='w-full md:h-[400px] lg:h-[500px] rounded-r-[150px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[150px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full backdrop-filter backdrop-blur-sm pb-20 bg-gradient-to-b from-transparent via-gray to-black/40 rounded-r-[150px]'>
        <div className='lg:mb-32'>
          <div className='text-white font-bold text-6xl  drop-shadow-lg font-custom'>Who Are We?</div>
          <div className='text-white text-2xl drop-shadow-lg'>Discover your next home away from home</div>
        </div>
        </div>
      </div>
      </FadeInSection>

        <FadeInSection>
        <OurStorySection></OurStorySection>
        </FadeInSection>
        <FadeInSection>
        <OurValuesSection></OurValuesSection>
        </FadeInSection>
        <FadeInSection>
        <OurPartnersSection></OurPartnersSection>
        </FadeInSection>
        <Footer></Footer>



    </>
  )
}

export default AboutUsPage