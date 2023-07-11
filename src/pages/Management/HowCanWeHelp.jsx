import React from 'react'
import tick from '../../assets/images/management/tick.svg'

function HowCanWeHelp() {
  return (
    <>
        <div className='text-center font-custom text-2xl font-bold mt-10'>How Can We Help?</div>


        <div className="flex flex-col md:flex-row justify-center items-center m-5">
            <div className=" w-full h-max bg-gray-200 rounded-2xl ">
                <div className='text-md px-5 pb-8 pt-3 text-left'>We are constantly looking for new properties because of our high occupancy rate and rising demand. If you are a landlord wanting to rent or sell your property, you have come to the right place.</div>
                <div className='flex flex-col gap-4 pb-5'>
                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>We would like to rent or buy your property</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>We strive to help landlords and clients by providing a greater return on investment while maintaining, renting, or purchasing their property.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>We make certain that all of our properties are kept in pristine condition from beginning to end of our arrangement.</div>
                    </div>

                    <div className='flex justify-start items-center'>
                        <img src={tick} alt="tick" className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                        <div className='text-md px-4  text-left'>We constantly aim to go above and above to provide our landlords with outstanding customer service, regardless of the time of day.</div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button className='bg-black text-white font-bold py-2 px-4 rounded-lg h-12 w-full max-w-md mx-10'>Schedule a Call</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HowCanWeHelp