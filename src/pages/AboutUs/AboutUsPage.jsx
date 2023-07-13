import React from 'react'
import Navbar from '../../components/navbar_black'
import OurStorySection from './OurStorySection'
import Image1 from '../../assets/images/about/about_img_1.jpg'
import OurValuesSection from './OurValuesSection'
import OurPartnersSection from './OurPartnersSection'

function AboutUsPage() {
  return (
    <>
        <div className='z-20 absolute w-full'>
        <Navbar />
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
      <div className="w-full pr-8 pt-16">
        <img src={Image1} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center -translate-y-20 -my-10 w-full h-full">
            <p className="text-white font-custom text-2xl font-bold">Who Are We?</p>
            <p className='text-white font-custom text-lg w-2/3 text-center capitalize'>Discover your next home away from home</p>
        </div>
      </div>

        <OurStorySection></OurStorySection>
        <OurValuesSection></OurValuesSection>
        <OurPartnersSection></OurPartnersSection>

    </>
  )
}

export default AboutUsPage