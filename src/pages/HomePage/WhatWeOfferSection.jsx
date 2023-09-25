import React from 'react'
import bookingImage from '../../assets/images/home/booking.svg'
import residenceImage from '../../assets/images/home/residence.svg'
import capacityImage from '../../assets/images/home/capacity.svg'

function WhatWeOfferSection({dynamicText}) {
  return (
    <>
      <div className="w-full bg-neutral-100 rounded-tl-[50px] md:rounded-tl-[100px] flex flex-col justify-center items-center mt-5 backdrop-blur-[185px] pb-10 px-5">
        <div className='w-full container mx-auto'>
        <div className='font-custom-kiona text-3xl text-center mt-10 text-primary'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_Heading').attributes.text}</div>
        <div className="text-center text-secondary text-md capitalize">{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_Subheading').attributes.text}</div>
        <div className='flex flex-col lg:flex-row text-center items-center lg:items-start justify-around gap-10'>
          <div className='flex flex-col justify-center items-center mt-10 max-w-[400px]'>
            <img src={bookingImage} alt='booking' className='w-16'></img>
            <div className='font-custom-bold font-normal text-2xl mt-5 text-primary'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_1_Heading').attributes.text}</div>
            <div className='text-md text-primary text-center font-custom-avenir pt-3'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_1_Subheading').attributes.text}</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10 max-w-[400px]'>
            <img src={residenceImage} alt='booking' className='w-16'></img>
            <div className='font-custom-bold font-normal text-2xl mt-5 text-primary'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_2_Heading').attributes.text}</div>
            <div className='text-md text-primary text-center font-custom-avenir pt-3'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_2_Subheading').attributes.text}</div>
          </div>

          <div className='flex flex-col justify-center items-center mt-10 max-w-[400px]'>
            <img src={capacityImage} alt='booking' className='w-16'></img>
            <div className='font-custom-bold font-normal text-2xl mt-5 text-primary'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_3_Heading').attributes.text}</div>
            <div className='text-md text-primary text-center font-custom-avenir pt-3'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'WhatWeOffer_3_Subheading').attributes.text}</div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default WhatWeOfferSection