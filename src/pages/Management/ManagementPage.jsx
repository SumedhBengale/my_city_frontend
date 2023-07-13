import React from 'react'
import Navbar from '../../components/navbar_black'
import Image1 from '../../assets/images/management/image1.png'
import Image2 from '../../assets/images/management/image2.png'
import Image4 from '../../assets/images/management/image4.png'
import mcr from '../../assets/images/management/mcr.jpg'
import WhatWeOffer from './WhatWeOffer'
import HowCanWeHelp from './HowCanWeHelp'
import HowItWorks from './HowItWorks'
import WhyUs from './WhyUs'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import Footer from '../../pages/HomePage/Footer'

function ManagementPage() {
  return (
    <>
    <div className='z-20 absolute w-full'>
        <Navbar />
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
      <div className="w-full pr-8 pt-16">
        <img src={Image1} alt="About Us" className="w-full h-full object-cover mix-blend-darken" />
        <div className="flex flex-col items-center -translate-y-20 -my-10 w-full h-full">
            <p className="text-white font-custom text-2xl font-bold">Who Are We?</p>
            <p className='text-white font-custom text-lg w-2/3 text-center capitalize'>Discover your next home away from home</p>
        </div>
      </div>

      <div className="font-custom text-2xl pl-8 pt-2 font-bold capitalize">Are you a property owner?</div>

      <div className="w-full pl-8 pt-5">
        <img src={Image2} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-end -translate-y-10 pr-10 -my-10 w-full h-full">
           <button className='w-32 h-12 bg-black text-white rounded-md'>Contact Now</button>
        </div>
      </div>

      <div className="Rectangle w-full bg-gray-200 px-10 pt-10 mt-20" >
            <div className='text-black font-custom text-2xl text-center font-bold'>Our Story</div>

            <div className='text-black text-md pt-5 text-justify'>Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. We provide quality serviced apartments for both leisure and business. We assure that the property is kept in hotel-standard condition during our agreement, reducing your worries.</div>
            <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-16 h-16 object-cover rounded-xl mt-10 mb-10' />
            </div>
        </div>

        <WhatWeOffer></WhatWeOffer>
        <HowCanWeHelp></HowCanWeHelp>
        <HowItWorks></HowItWorks>
        <WhyUs></WhyUs>

        <div className="w-full pr-8 pt-16 relative">
          <img src={Image4} alt="About Us" className="w-full h-full object-cover" />
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-3/4 h-36 m-2 px-1 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md">
              <div className=" w-full text-center text-white font-custom text-md px-2 pb-2">Do You Struggle With...</div>
              <div className=" w-full text-center text-white text-xs font-normal pb-2 ">Selling/ Renting Your Property?</div>
              <div className=" w-full text-center text-white text-xs font-normal pb-2">Troublesome Tenants?</div>
              <div className=" w-full text-center text-white text-xs font-normal pb-2">Bills Not Getting Paid?</div>
            </div>
          </div>
        </div>

      <div className="w-full h-full pl-8 pt-16">
        <div alt="About Us" className="w-full h-max object-cover rounded-l-[50px] bg-gray-200">
        <div className='text-md text-center text-black px-10 pt-5'>When you decided to rent your property, we bet you never bargained for all the hassle that came with it.</div>
        <div className='text-md text-center text-black px-10 pt-3'>Our mission is to provide landlords with a ‘set and forget’ service. Set the property up and leave it to us to take care of EVERYTHING - all you have to do is check your bank each month.</div>
        <div className='w-full flex justify-center'>
          <button className='bg-black text-white font-bold py-2 px-4 rounded-lg h-12 w-40 my-5 mx-10'>Schedule a Call</button>
        </div>
        </div>
        
      </div>

      <div className='text-2xl text-black text-center mt-5 mx-2'>Let Us Handle It All</div>

      <div className="w-full pr-8 pt-16 relative">
          <img src={Image4} alt="About Us" className="w-full h-full object-cover" />
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md">
              <div className=" w-full text-center text-white font-custom text-sm px-2 pb-1">Management that is simple</div>
              <div className=" w-full text-center text-white text-[10px] px-2 font-normal pb-2 ">Our experienced staff will examine the condition, location, accessibility, and zoning rules of the property. We’ll discuss contracts and locate one that meets your demands once we’ve determined the financial sustainability of your property.</div>
            </div>
          </div>
        </div>

        <div className="w-full pr-8 pt-16 relative">
          <img src={Image4} alt="About Us" className="w-full h-full object-cover" />
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md">
              <div className=" w-full text-center text-white font-custom text-sm px-2 pb-1">Verified Tenants</div>
              <div className=" w-full text-center text-white text-[10px] px-2 font-normal pb-2 ">We have been landlords and agents for a long period of time and understand how important it is to pick the finest quality renters for the property. Our renters are all professionals who have been carefully verified before moving in.</div>
            </div>
          </div>
        </div>

        <div className="w-full pr-8 pt-16 relative">
          <img src={Image4} alt="About Us" className="w-full h-full object-cover" />
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md">
              <div className=" w-full text-center text-white font-custom text-sm px-2 pb-1">We Handle all the Tenants</div>
              <div className=" w-full text-center text-white text-[10px] px-2 font-normal pb-2 ">No more worrying about another late-night call from your renter. Our customer support representatives are in charge of all setup, daily operations, and guest communications.</div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center'>
          <button className='bg-black text-white font-bold py-2 px-4 rounded-lg h-12 w-40 my-5 mx-10'>Schedule a Call</button>
        </div>

        <FrequentQuestionsSection></FrequentQuestionsSection>
        <Footer></Footer>

    </>
  )
}

export default ManagementPage