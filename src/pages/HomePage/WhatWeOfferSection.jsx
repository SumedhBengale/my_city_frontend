import React from 'react'
import bookingImage from '../../assets/images/home/booking.svg'
import residenceImage from '../../assets/images/home/residence.svg'
import capacityImage from '../../assets/images/home/capacity.svg'

function WhatWeOfferSection() {
  return (
    <>
      <div className="w-full bg-neutral-100 flex flex-col justify-center items-center mt-5 backdrop-blur-[185px] pb-10 px-5">
        <div className='w-full container mx-auto'>
        <div className='font-custom-bold text-3xl text-center mt-10 text-secondary'>What We Offer</div>
        <div className="ThePerfectPlaceToStay text-center text-zinc-900 text-opacity-40 text-md font-normal capitalize leading-snug">The perfect place to stay</div>
        <div className='flex flex-col lg:flex-row text-center'>
          <div className='flex flex-col  justify-center items-center mt-10'>
            <img src={bookingImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-secondary'>Booking With Us</div>
            <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10'>
            <img src={residenceImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-secondary'>Your New Residence</div>
            <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10'>
            <img src={capacityImage} alt='booking' className='w-16'></img>
            <div className='font-custom font-normal text-2xl mt-5 text-secondary'>Capacity and Accessibility</div>
            <div className='text-md text-gray-400 text-center pt-3'>Our rental costs cover everything. There are no additional fees for utilising our wifi, television, towels, or changeovers.</div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default WhatWeOfferSection