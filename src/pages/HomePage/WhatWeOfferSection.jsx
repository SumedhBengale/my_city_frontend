import React from 'react'
import bookingImage from '../../assets/images/home/booking.svg'
import residenceImage from '../../assets/images/home/residence.svg'
import capacityImage from '../../assets/images/home/capacity.svg'

function WhatWeOfferSection() {
  return (
    <>
      <div className="w-full bg-neutral-100 flex flex-col justify-center items-center mt-5 backdrop-blur-[185px]">
        <div className='font-custom text-2xl font-bold mt-10'>What We Offer</div>
        <div className="ThePerfectPlaceToStay w-[230px] text-center text-zinc-900 text-opacity-40 text-[18px] font-normal capitalize leading-snug">The perfect place to stay</div>
        
        <div className='flex flex-col justify-center items-center mt-10'>
          <img src={bookingImage} alt='booking' className='w-16'></img>
          <div className='font-custom text-2xl mt-5'>Booking With Us</div>
          <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
        </div>

        <div className='flex flex-col justify-center items-center mt-10'>
          <img src={residenceImage} alt='booking' className='w-16'></img>
          <div className='font-custom text-2xl mt-5'>Your New Residence</div>
          <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
        </div>

        <div className='flex flex-col justify-center items-center mt-10'>
          <img src={capacityImage} alt='booking' className='w-16'></img>
          <div className='font-custom text-2xl mt-5'>Capacity and Accessibility</div>
          <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
        </div>

      </div>
    </>
  )
}

export default WhatWeOfferSection