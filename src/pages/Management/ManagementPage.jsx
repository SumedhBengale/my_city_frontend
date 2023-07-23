import React from 'react'
import Navbar from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import Image1 from '../../assets/images/management/image1.png'
import Image2 from '../../assets/images/management/image2.png'
import Image4 from '../../assets/images/management/image4.png'
import Image5 from '../../assets/images/management/image5.png'
import Image6 from '../../assets/images/management/image6.png'
import Image7 from '../../assets/images/management/image7.png'
import mcr from '../../assets/images/management/mcr.jpg'
import WhatWeOffer from './WhatWeOffer'
import HowCanWeHelp from './HowCanWeHelp'
import HowItWorks from './HowItWorks'
import WhyUs from './WhyUs'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import Footer from '../../pages/HomePage/Footer'
import FadeInSection from '../../components/fadeIn/fadeInSection'

function ManagementPage() {
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
          <div className='text-white font-bold text-3xl  drop-shadow-lg font-custom'>Blog</div>
          <div className='text-white text-md drop-shadow-lg'>The Starting Point of Your Adventure Well Connected to the Whole City</div>

        </div>
      </div>

        

      <div className='hidden md:block relative md:mr-10 xl:mr-20'>
        <div className='w-full md:h-[400px] lg:h-[500px] rounded-r-[150px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[150px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full backdrop-filter backdrop-blur-sm pb-20 bg-gradient-to-b from-transparent via-gray to-black/40 rounded-r-[150px] px-10'>
          <div className='text-white font-bold text-6xl  drop-shadow-lg font-custom'>Blog</div>
          <div className='text-white text-2xl drop-shadow-lg'>The Starting Point of Your Adventure Well Connected to the Whole City</div>

        </div>
      </div>


      <div className='hidden md:block mt-10'>
        <div className='grid grid-cols-2 gap-5'>
          <div className='flex justify-center items-center ml-20'>
            <div className='flex flex-col justify-center items-start'>
              <div className="font-custom font-bold text-2xl pb-5 capitalize ">Are you a property owner?</div>
              <button className='w-32 h-12 rounded-md bg-black text-white hover:scale-105 transition duration-75 cursor-pointer'>Contact Now</button>
            </div>
          </div>

          <div className='w-full md:h-[300px] lg:h-[600px] rounded-r-[150px]'>
          <img src={Image2} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-l-[150px] " />
        </div>
          </div>
        </div>
          </FadeInSection>
          <div className='md:hidden'>
          <FadeInSection>
          <div className="font-custom font-bold text-2xl md:pl-8 sm:pt-8 pt-5 capitalize pl-5">Are you a property owner?</div>

          <div className="w-full pl-8 pt-5 h-[300px] rounded-l-[70px]">
            <img src={Image2} alt="About Us" className="w-full h-full object-cover rounded-l-[70px]" />
            <div className="flex flex-col items-end -translate-y-10 pr-10 -my-10 w-full h-full">
              <button className='w-32 h-12 rounded-md bg-black font-bold text-white hover:scale-105 transition duration-75'>Contact Now</button>
            </div>
          </div>
          </FadeInSection>
          </div>
          <FadeInSection>

      <div className="Rectangle w-full bg-gray-200 px-10 pt-10 mt-20">
          <div className='container mx-auto'>
            <div className='text-zinc-700 font-custom font-bold text-2xl text-center'>About Us</div>

            <div className='text-black text-md pt-5 text-justify'>Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. We provide quality serviced apartments for both leisure and business. We assure that the property is kept in hotel-standard condition during our agreement, reducing your worries.</div>
            <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-16 h-16 object-cover rounded-xl mt-10 mb-10' />
            </div>
          </div>
        </div>
        </FadeInSection>
        <FadeInSection>
        <WhatWeOffer></WhatWeOffer>
        </FadeInSection>
        <FadeInSection>
        <HowCanWeHelp></HowCanWeHelp>
        </FadeInSection>
        <FadeInSection>
        <HowItWorks></HowItWorks>
        </FadeInSection>
        <FadeInSection>
        <WhyUs></WhyUs>
        </FadeInSection>

        <FadeInSection>

        <div className='flex flex-col md:flex-row'>
         <div className='w-full h-56 md:h-[400px] rounded-r-[50px] md:rounded-r-[150px] relative'>
          <img src={Image4} alt="About Us" className="w-full pr-5 h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] " />
            <div className='absolute top-0 h-full w-full flex items-center justify-center pr-5'>
              <div className=" w-3/4 h-36 m-2 px-1 bg-white bg-opacity-5 rounded-2xl flex flex-col md:gap-2 pt-3 border border-white backdrop-blur-md">
                <div className=" w-full text-center text-white font-custom font-bold text-md px-2 pb-2">Do You Struggle With...</div>
                <div className=" w-full text-center text-white text-xs font-normal pb-1 ">Selling/ Renting Your Property?</div>
                <div className=" w-full text-center text-white text-xs font-normal pb-1">Troublesome Tenants?</div>
                <div className=" w-full text-center text-white text-xs font-normal pb-1">Bills Not Getting Paid?</div>
              </div>
            </div>
          </div>

        <div className="w-full h-container pl-8 pt-10 md:pt-0">
          <div alt="About Us" className="w-full h-full flex flex-col justify-center object-cover rounded-l-[50px] bg-gray-200">
            <div className='text-md lg:text-xl text-center md:text-left text-black px-10 pt-5'>When you decided to rent your property, we bet you never bargained for all the hassle that came with it.</div>
            <div className='text-md lg:text-xl text-center md:text-left text-black px-10 pt-3'>Our mission is to provide landlords with a ‘set and forget’ service. Set the property up and leave it to us to take care of EVERYTHING - all you have to do is check your bank each month.</div>
            <div className='w-full flex justify-center md:justify-start'>
              <button className='bg-black text-white hover:scale-105 transition duration-75 cursor-pointer font-bold py-2 px-4 rounded-lg h-12 w-40 my-5 mx-10'>Schedule a Call</button>
            </div>
          </div>
        </div>
      </div>
      </FadeInSection>

      <FadeInSection>

      <div className='text-2xl font-custom font-bold text-black text-center mt-10 mx-2'>Let Us Handle It All</div>

      <div className="w-full pr-8 pt-16 relative lg:pr-20">
      <div className='w-full h-64 md:h-[400px] rounded-r-[50px] md:rounded-r-[150px] relative'>
          <img src={Image5} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] " />
          <div className='absolute top-0  w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] bg-black/30'></div>
        </div>
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max flex flex-col gap-3">
              <div className=" w-full text-center text-white font-custom font-bold text-lg md:text-xl px-2 pb-1">Management that is simple</div>
              <div className=" w-full text-center text-white text-[12px] font-bold sm:text-lg px-2 pb-2 ">Our experienced staff will examine the condition, location, accessibility, and zoning rules of the property. We’ll discuss contracts and locate one that meets your demands once we’ve determined the financial sustainability of your property.</div>
            </div>
          </div>
        </div>

        <div className="w-full pl-8 pt-16 relative lg:pl-20">
        <div className='w-full h-64 md:h-[400px] rounded-l-[50px] md:rounded-l-[150px] relative'>
          <img src={Image6} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-l-[50px]  md:rounded-l-[150px] " />
          <div className='absolute top-0 w-full h-full md:object-fill lg:object-cover rounded-l-[50px]  md:rounded-l-[150px] bg-black/30'></div>
        </div>
        <div className='absolute top-8 h-full flex items-center justify-center pl-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max flex flex-col gap-3">
              <div className=" w-full text-center text-white font-custom font-bold text-lg md:text-xl px-2 pb-1">Verified Tenants</div>
              <div className=" w-full text-center text-white text-[12px] font-bold sm:text-lg px-2 pb-2 ">We have been landlords and agents for a long period of time and understand how important it is to pick the finest quality renters for the property. Our renters are all professionals who have been carefully verified before moving in.</div>
            </div>
          </div>
        </div>

        <div className="w-full pr-8 pt-16 relative lg:pr-20">
        <div className='w-full h-64 md:h-[400px] rounded-r-[50px] md:rounded-r-[150px] relative'>
          <img src={Image7} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] " />
          <div className='absolute top-0  w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] bg-black/30'></div>
        </div>
        <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max flex flex-col gap-3">
              <div className=" w-full text-center text-white font-custom font-bold text-lg md:text-xl px-2 pb-1">We Handle all the Tenants</div>
              <div className=" w-full text-center text-white text-[12px] font-bold sm:text-lg px-2 pb-2 ">No more worrying about another late-night call from your renter. Our customer support representatives are in charge of all setup, daily operations, and guest communications.</div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center'>
          <button className='bg-black text-white hover:scale-105 transition duration-75 cursor-pointer font-bold py-2 px-4 rounded-lg h-12 w-40 my-5 mx-10'>Schedule a Call</button>
        </div>
        </FadeInSection>
        <FadeInSection>
        <FrequentQuestionsSection></FrequentQuestionsSection>
        </FadeInSection>
        <FadeInSection>
        <Footer></Footer>
        </FadeInSection>

    </>
  )
}

export default ManagementPage