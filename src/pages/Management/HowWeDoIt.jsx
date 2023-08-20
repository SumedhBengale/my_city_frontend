import React from 'react'
import background from '../../assets/images/management/image3.png'
import handshake from '../../assets/images/management/handshake.svg'
import home from '../../assets/images/management/home.svg'
import money from '../../assets/images/management/money.svg'
import mcr from '../../assets/images/management/mcr.jpg'



function HowWeDoIt() {
  return (
    <>
        <div className='container mx-auto '>
        <div className='font-custom-bold text-4xl fond-bold text-primary text-center sm:text-start sm:pl-5 pt-10 mb-10'>How We Do It?</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-20'>

          <div className='w-full h-full flex justify-center'>
          <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">Higher occupancy</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">City Relay maximises occupancy, taking advantage of short let peaks and the security of long lets.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center'>
          <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">End-to-end management</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">As your partner, we take care of every last detail — from payments to cleaning to maintenance, saving you time and money.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center md:col-span-2 lg:col-span-1'>
            <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl pt-5 capitalize leading-relaxed">High standards</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4">Our property management platform, optimises yield and helps you understand how your portfolio is performing.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center md:col-span-2 lg:col-span-1'>
          <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">Rent Guarantee</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">You'll be able to receive stable, guaranteed monthly income, without the worry of void periods or late tenancy payments.</div>
            </div>
          </div>

        </div>
        </div>

    </>
  )
}

export default HowWeDoIt