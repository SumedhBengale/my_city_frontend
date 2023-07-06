import React from 'react'
import Navbar from '../../components/navbar'
import homeBackground from '../../assets/images/home/home_top_image.jpg'
import filter from '../../assets/images/home/filter.svg'
import locationPin from '../../assets/images/home/location_pin.svg'
import calendar from '../../assets/images/home/calendar.svg'
import guests from '../../assets/images/home/guests.svg'
import rooms from '../../assets/images/home/rooms.svg'
import IntroductionSection from './IntroductionSection'
import PropertyCard from './PropertyCard'
import WhatWeOfferSection from './WhatWeOfferSection'
import KnowMoreSection from './KnowMoreSection'
import ReviewShowcaseSection from './ReviewShowcaseSection'
import FrequentQuestionsSection from './FrequentQuestionsSection'
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
        <Navbar />


        <div className='h-full flex justify-center items-center'>
          <div className="Rectangle m-4 w-full h-96 bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md" >
            
            <div className='grid grid-cols-2 gap-9 text-white'>

              <div className='col-span-2 flex justify-between'>{/* Location and Filter */}
                  <div className='flex'>
                    <img src={locationPin} alt='location pin' className=''></img>
                    <div className='pl-2'>
                      <div className='text-sm'>Select Location</div>
                      <div className='font-bold text-2xl'>Where to?</div>
                    </div>
                  </div>
                <div className='text-white text-[18px] font-bold'>
                  <img src={filter} alt='filter' className=''></img>
                </div>
              </div>

              <div className='col-span-2 flex justify-between'>{/* Start and End Date Selector */}
                <div className='flex'>
                  <img src={calendar} alt='calendar' className=''></img>
                  <div className='pl-2'>
                    <div className='text-sm'>Check-in Date</div>
                    <div className='text-2xl font-bold'>Select</div>
                  </div>
                </div>

                <div className='flex'>
                  <img src={calendar} alt='calendar' className=''></img>
                  <div className='pl-2'>
                    <div className='text-sm'>Check-out Date</div>
                    <div className='text-2xl font-bold'>Select</div>
                  </div>
                </div>

              </div>

              <div className='col-span-2 flex justify-between'>{/* Number of Guests and Rooms Selector */}
                <div className='flex'>
                  <img src={guests} alt='calendar' className=''></img>
                  <div className='pl-2'>
                    <div className='text-sm'>No. of guests</div>
                    <div className='text-2xl font-bold'>2{/*Get this input */}</div>
                  </div>
                </div>

                <div className='flex'>
                  <img src={rooms} alt='calendar' className=''></img>
                  <div className='pl-2'>
                    <div className='text-sm'>No. of rooms</div>
                    <div className='text-2xl font-bold'>1{/*Get this input */}</div>
                  </div>
                </div>

              </div>


              <div className="w-full col-span-2 h-12 bg-white rounded-lg border" >
              <div class="w-full relative h-full z-0 flex">
                  <div className='w-full text-center self-center text-black flex justify-center items-center'>Search</div>
              </div>
              </div>

            </div>

            </div> {/* Blur Rectangle */}
        </div>
      </div>
      <IntroductionSection></IntroductionSection> {/* Seperated into different file because it's static content */}

      <div className='p-4'>
      <div className=" text-center text-black text-4xl font-bold capitalize">Our Properties</div>
      <div className=" text-center text-zinc-900 text-opacity-20 text-md pt-4 capitalize">Hand-picked selection of quality places</div>
      
      {/* Fill these with fetched data */}
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>

      <div className='flex justify-center mt-10'>
        <div className="w-[178px] h-14 bg-zinc-900 rounded-xl backdrop-blur-md" >
          <div className='text-white text-2xl h-full flex justify-center items-center'>View All</div>
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