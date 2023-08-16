import React from 'react'
import howDoesItWork_1 from '../../assets/images/management/howDoesItWork_1.jpeg'

function HowDoesItWork() {
  return (
    <div className='flex flex-col container mx-auto'>
        <div className='flex justify-center items-center p-5 lg:pb-10 lg:pl-10 gap-2 container mx-auto w-full sm:w-1/2'>
            <div className='text-center lg:text-left pr-5 max-w-4xl'>
              <div className='text-primary text-center text-md pb-3 pt-10'>Hassle Free</div>
              <div className="text-primary text-center font-custom-bold text-3xl capitalize pb-3">How does it work?</div>
              <div className=" w-full text-primary text-center text-md font-normal leading-normal pb-5">City Relay increases demand by creating unparalleled rental experiences — managing the entire relationship from start to finish.</div>
            </div>
         </div>
         <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center gap-10'>
            <div className='flex flex-col'>
                <div className='pl-20 order-2 md:order-1'>
                    <img src={howDoesItWork_1} alt='image1' className='w-full' />
                </div>
                <div className='flex gap-5 order-1 md:order-2'>
                    <div className=" w-16 h-full text-secondary text-9xl font-custom-bold pl-4">1</div>
                    <div className='pl-2 mr-10'>
                        <div className="text-primary text-start font-custom-bold text-xl capitalize pb-3">Corporate leasing Agreement</div>
                        <div className=" w-full text-primary text-start text-md font-normal leading-normal pb-5">With A Corporate Leasing Arrangement, We Become Your Tenant.</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:mt-96'>
                <div className='pl-20 order-2 md:order-1'>
                    <img src={howDoesItWork_1} alt='image1' className='w-full' />
                </div>
                <div className='flex gap-5 order-1 md:order-2'>
                    <div className=" w-16 h-full text-secondary text-9xl font-custom-bold pl-4">2</div>
                    <div className='pl-2 mr-10'>
                        <div className="text-primary text-start font-custom-bold text-xl capitalize pb-3">We operate the property as a short-term rental</div>
                        <div className=" w-full text-primary text-start text-md font-normal leading-normal pb-5">The process of us renting out your property on a short-term basis and becoming your tenant is nearly identical; the only difference is that the return may vary from month to month based on the occupancy of these properties as well as the market.</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='pl-20 order-2 md:order-1'>
                    <img src={howDoesItWork_1} alt='image1' className='w-full' />
                </div>
                <div className='flex gap-5 order-1 md:order-2'>
                    <div className=" w-16 h-full text-secondary text-9xl font-custom-bold pl-4">3</div>
                    <div className='pl-2 mr-10'>
                        <div className="text-primary text-start font-custom-bold text-xl capitalize pb-3">We purchase the property</div>
                        <div className=" w-full text-primary text-start text-md font-normal leading-normal pb-5">-Based on your requirements this would be better discussed over the phone where we can make arrangements accordingly. You may also call us at +447442211353 or email us at info@mycityresidences.com</div>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default HowDoesItWork