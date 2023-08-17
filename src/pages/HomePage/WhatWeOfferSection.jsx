import React from 'react'
import bookingImage from '../../assets/images/home/booking.svg'
import residenceImage from '../../assets/images/home/residence.svg'
import capacityImage from '../../assets/images/home/capacity.svg'

function WhatWeOfferSection() {
  return (
    <>
      <div className="w-full bg-neutral-100 flex flex-col justify-center items-center mt-5 backdrop-blur-[185px] pb-10 px-5">
        <div className='w-full container mx-auto'>
        <div className='font-custom-bold text-3xl text-center mt-10 text-primary'>What We Offer</div>
        <div className="ThePerfectPlaceToStay text-center text-zinc-900 text-opacity-40 text-md font-normal capitalize leading-snug">The perfect place to stay</div>
        <div className='flex flex-col lg:flex-row text-center items-center justify-around gap-10'>
          <div className='flex flex-col  justify-center items-center mt-10 max-w-[300px]'>
            <img src={bookingImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-primary'>Booking With Us</div>
            <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10 max-w-[300px]'>
            <img src={residenceImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-primary'>Your New Residence</div>
            <div className='text-md text-gray-400 text-center pt-3'>Our accommodations in picturesque London are provided with all of the conveniences of home. In our holiday apartments, you'll discover fully furnished kitchens, bed linen, towels, wifi, and much more.</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10 max-w-[300px]'>
            <img src={capacityImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-primary'>Capacity and Accessibility</div>
            <div className='text-md text-gray-400 text-center pt-3'>The nicest part about booking a vacation rental with us is the space and freedom. Take use of our full home with family and friends..</div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default WhatWeOfferSection