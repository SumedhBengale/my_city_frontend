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
          <div className='font-custom text-4xl text-white font-bold text-center'>My City Residence</div>
          <div className='font-custom text-lg w-3/4 text-center text-white capitalize mb-10'>Discover your next home away from home</div>

          <SearchCard></SearchCard>
        </div>
      </div>
      <div>
        <IntroductionSection></IntroductionSection>
      </div> {/* Seperated into different file because it's static content */}

      <div className='p-4'>
      <div className=" text-center text-black font-custom text-4xl font-bold capitalize">Our Properties</div>
      <div className=" text-center text-zinc-900 text-opacity-20 text-md pt-4 capitalize">Hand-picked selection of quality places</div>
      
      {/* Fill these with fetched data */}
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>

      <div className='flex justify-center mt-10'>
        <div className="w-[178px] h-14 bg-zinc-900 rounded-xl backdrop-blur-md" >
          <div className='text-white font-custom text-2xl h-full flex justify-center items-center'>View All</div>
        </div>
      </div>

      </div>

      {/* Seperated into different file because it's static content */}
      <WhatWeOfferSection></WhatWeOfferSection>

      {/* Seperated into different file because it's static content */}
      <KnowMoreSection></KnowMoreSection>

      {/* Seperated into different file because it's static content(for now) */}
      <ReviewShowcaseSection></ReviewShowcaseSection>

      {/* Seperated into different file because it's static content */}
      <FrequentQuestionsSection></FrequentQuestionsSection>
    
      <Footer></Footer>
    </>
  )
}

export default Home