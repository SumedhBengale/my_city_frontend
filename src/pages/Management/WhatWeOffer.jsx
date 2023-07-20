import React from 'react'
import guaranteedRent from '../../assets/images/management/guaranteed_rent.svg'
import letUsManage from '../../assets/images/management/let_us_manage.svg'
import good_hands from '../../assets/images/management/good_hands.svg'

function WhatWeOffer() {
  return (
    <>
        <div className='text-center font-bold font-custom text-zinc-800 text-2xl mt-10'>What We Offer</div>
        
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className="flex flex-col md:flex-row justify-center items-center m-5">
                <div className=" w-full h-full bg-gray-200 rounded-2xl">
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                        <img src={guaranteedRent} alt="guaranteedRent" className='w-16 h-16 object-cover rounded-xl mt-10 mb-5' />
                    </div>
                    <div className='font-custom font-bold text-zinc-800 text-2xl text-center px-2'>Guaranteed Rent</div>
                    <div className='text-md px-4 pb-8 pt-3 text-zinc-800 text-center'>We guarantee rent once we take over administration of your property, which means no void months of payment.</div>

                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center m-5">
                <div className=" w-full h-full bg-gray-200 rounded-2xl">
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                        <img src={letUsManage} alt="guaranteedRent" className='w-16 h-16 object-cover rounded-xl mt-10 mb-5' />
                    </div>
                    <div className='font-custom font-bold text-zinc-800 text-2xl text-center px-2'>Let Us Manage For You</div>
                    <div className='text-md px-4 pb-8 pt-3 text-zinc-800 text-center'>We strive to help landlords and clients by providing a greater return on investment while maintaining, renting, or purchasing their property.</div>

                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center m-5 md:col-span-2 lg:col-span-1">
                <div className=" w-full h-full bg-gray-200 rounded-2xl">
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                        <img src={good_hands} alt="guaranteedRent" className='w-16 h-16 object-cover rounded-xl mt-10 mb-5' />
                    </div>
                    <div className='font-custom font-bold text-zinc-800 text-2xl text-center px-2'>Your Property Is In Good Hands</div>
                    <div className='text-md px-4 pb-8 pt-3 text-zinc-800 text-center'>We ensure that the property is kept in hotel-like conditions, so you don't have to worry about it.</div>

                </div>
            </div>
        </div>
    </>
  )
}

export default WhatWeOffer