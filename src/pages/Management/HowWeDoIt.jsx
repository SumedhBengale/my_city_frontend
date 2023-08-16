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
            <div className=" w-full h-full m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center'>
                    <img src={mcr} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">Higher occupancy</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">The process of us renting out your property on a short-term basis and becoming your tenant is nearly identical; the only difference is that the return may vary from month to month based on the occupancy of these properties as well as the market.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center'>
            <div className=" w-full h-full m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center'>
                    <img src={mcr} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">End-to-end management</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">We strive to help landlords and clients by providing a greater return on investment while maintaining, renting, or purchasing their property.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center md:col-span-2 lg:col-span-1'>
            <div className=" w-full h-full m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center'>
                    <img src={mcr} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl pt-5 capitalize leading-relaxed">High standards</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4">We ensure that the property is kept in hotel-like conditions, so you don't have to worry about it.</div>
            </div>
          </div>

          <div className='w-full h-full flex justify-center md:col-span-2 lg:col-span-1'>
            <div className=" w-full h-full m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center'>
                    <img src={mcr} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full md:text-start text-center text-primary font-custom-bold text-xl  pt-5 capitalize leading-relaxed">Rent Guarantee</div>
                <div className=" w-full md:text-start text-center text-primary text-xs font-normal leading-7 my-4 ">We guarantee rent once we take over administration of your property, which means no void months of payment.</div>
            </div>
          </div>

        </div>
        </div>

    </>
  )
}

export default HowWeDoIt