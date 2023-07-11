import React from 'react'
import tick from '../../assets/images/management/tick.svg'

function WhyUs() {
  return (
    <>
        <div className='text-center font-custom text-2xl font-bold mt-10'>Why Us?</div>

        <div className="flex flex-col md:flex-row justify-center items-center m-5">
            <div className=" w-full h-max bg-gray-200 rounded-2xl ">
                <div className='flex flex-col gap-4 pb-5 mt-8'>
                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>A guaranteed rental income on time, every month.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>You still get paid even if the property is empty.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>Long term tenancy contract.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>You can visit property anytime with 24 hours notice to check how we are looking after your property.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>No set up fees, monthly commissions or hidden charges.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>A guaranteed contract start date – no worrying about how long it will take to find tenants.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>Regular property inspections, free repairs and maintenance up to $50 including VAT.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>We deal with all the tenant’s queries, questions and complaints.</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default WhyUs