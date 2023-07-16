import React from 'react'
import Navbar from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import OurStorySection from './OurStorySection'
import Image1 from '../../assets/images/about/about_img_1.jpg'
import OurValuesSection from './OurValuesSection'
import OurPartnersSection from './OurPartnersSection'

function AboutUsPage() {
  return (
    <>
        <div class="hidden md:block z-20 absolute top-0 w-full pt-3">
          <DesktopNavbar />
        </div>

        <div class="md:hidden z-20 absolute w-full">
          <Navbar />
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
      <div className='md:hidden'>
        <div className="w-full pr-8 pt-16">
          <img src={Image1} alt="About Us" className="w-full h-full object-cover mix-blend-darken" />
          <div className="flex flex-col items-center -translate-y-20 -my-10 w-full h-full">
              <p className="text-white font-custom text-2xl font-bold">Who Are We?</p>
              <p className='text-white font-custom text-lg w-2/3 text-center capitalize'>Discover your next home away from home</p>
          </div>
        </div>
      </div>

      <div className='hidden md:block relative mt-16 md:mr-10 xl:mr-20'>
        <div className='w-full md:h-[600px] rounded-r-[150px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[150px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full backdrop-filter backdrop-blur-sm pb-20 bg-gradient-to-b from-transparent via-gray to-black/40 rounded-r-[150px]'>
          <div className='text-white font-bold text-3xl  drop-shadow-lg font-custom'>Who Are We?</div>
          <div className='text-white text-lg drop-shadow-lg'>Discover your next home away from home</div>

        </div>
      </div>

        <OurStorySection></OurStorySection>
        <OurValuesSection></OurValuesSection>
        <OurPartnersSection></OurPartnersSection>

    </>
  )
}

export default AboutUsPage