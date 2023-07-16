import React from 'react'
import Navbar from '../../components/navbar'
import DesktopNavbar from '../../components/desktopNavbar'
import homeBackground from '../../assets/images/home/home_top_image.jpg'
import IntroductionSection from './IntroductionSection'
import PropertyCard from './PropertyCard'
import WhatWeOfferSection from './WhatWeOfferSection'
import KnowMoreSection from './KnowMoreSection'
import ReviewShowcaseSection from './ReviewShowcaseSection'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import SearchCard from '../../components/searchCard'
import Footer from './Footer'
import logoWhite from '../../assets/images/white_logo.png'

function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      > {/* Background Image */}
        <div class="hidden md:block z-20 absolute w-full pt-3">
          <DesktopNavbar />
        </div>

        <div class="md:hidden z-20 absolute w-full">
          <Navbar />
        </div>

        <div className='h-full flex flex-col justify-center items-center mx-5 z-0'>
          <div className='lg:hidden'>
            <div className='font-custom text-4xl text-white font-bold text-center'>My City Residence</div>
            <div className='font-custom text-lg w-3/4 text-center text-white capitalize mb-10'>Discover your next home away from home</div>
          </div>

          <div className='hidden lg:block justify-center items-center'>
            <img src={logoWhite} alt='My City Logo' className='md:w-48 lg:w-72 self-start mb-20'></img>
          </div>
          <SearchCard></SearchCard>
        </div>
      </div>
      <div className='container mx-auto'>
        <IntroductionSection></IntroductionSection>
      </div> {/* Seperated into different file because it's static content */}

      <div className='p-4 container mx-auto'>
      <div className=" text-center text-black font-custom text-4xl font-bold capitalize">Our Properties</div>
      <div className=" text-center text-zinc-900 text-opacity-20 text-md pt-4 capitalize">Hand-picked selection of quality places</div>
      
      {/* Fill these with fetched data */}
      <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 gap-5 lg:px-20 mt-10'>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
      </div>

      <div className='flex justify-center mt-10'>
        <div className="w-[178px] h-14 bg-black text-white hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md" >
          <div className=' font-bold text-2xl h-full flex justify-center items-center'>View All</div>
        </div>
      </div>

      </div>

      {/* Seperated into different file because it's static content */}
      <WhatWeOfferSection></WhatWeOfferSection>

      {/* Seperated into different file because it's static content */}
      <KnowMoreSection></KnowMoreSection>

      {/* Seperated into different file because it's static content(for now) */}
      <div className='container mx-auto'>
        <ReviewShowcaseSection></ReviewShowcaseSection>
      </div>

      {/* Seperated into different file because it's static content */}
      <div className='container mx-auto'>
        <FrequentQuestionsSection></FrequentQuestionsSection>
      </div>
    
      <Footer></Footer>
    </>
  )
}

export default Home