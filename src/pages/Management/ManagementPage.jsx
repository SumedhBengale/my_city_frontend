import React from 'react'
import Navbar from '../../components/navbar_black'
import Image1 from '../../assets/images/management/image1.png'
import Image2 from '../../assets/images/management/image2.png'
import mcr from '../../assets/images/management/mcr.jpg'
import WhatWeOffer from './WhatWeOffer'
import HowCanWeHelp from './HowCanWeHelp'
import HowItWorks from './HowItWorks'
import WhyUs from './WhyUs'

function ManagementPage() {
  return (
    <>
    <div className='absolute top-0 w-full z-20'>
      <Navbar className='z-20'/>
      </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
      <div className="w-full pr-8 pt-16">
        <img src={Image1} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center -translate-y-20 -my-10 w-full h-full">
            <p className="text-white text-2xl font-bold">Who Are We?</p>
            <p className='text-white text-lg w-2/3 text-center capitalize'>Discover your next home away from home</p>
        </div>
      </div>

      <div className="text-2xl pl-8 pt-2 font-bold capitalize">Are you a property owner?</div>

      <div className="w-full pl-8 pt-5">
        <img src={Image2} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-end -translate-y-10 pr-10 -my-10 w-full h-full">
           <button className='w-32 h-12 bg-black text-white rounded-md'>Contact Now</button>
        </div>
      </div>

      <div className="Rectangle w-full bg-gray-200 px-10 pt-10 mt-20" >
            <div className='text-black text-2xl text-center font-bold'>Our Story</div>

            <div className='text-black text-md pt-5 text-justify'>Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. We provide quality serviced apartments for both leisure and business. We assure that the property is kept in hotel-standard condition during our agreement, reducing your worries.</div>
            <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-16 h-16 object-cover rounded-xl mt-10 mb-10' />
            </div>
        </div>

        <WhatWeOffer></WhatWeOffer>
        <HowCanWeHelp></HowCanWeHelp>
        <HowItWorks></HowItWorks>
        <WhyUs></WhyUs>
    </>
  )
}

export default ManagementPage