import React from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import Image1 from '../../assets/images/property/placeholder1.png'
import DesktopNavbar from '../../components/desktopNavbarBlack'

function Book() {
    return (
    
    <div className='min-h-screen flex flex-col w-full justify-between'>
        <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbar />
        }
        </div>
        <div>
         <div className='flex w-full h-full bg-white shadow-lg justify-between  md:mt-16 '>
            <div className='w-10 h-full' onClick={()=>{
                window.history.back();
            }}>
                <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='text-lg text-center font-bold '>Confirm Booking</div>
            </div>
        </div>
        <div className='w-full flex justify-center container mx-auto'>
        <div className='w-full md:w-2/3 lg:1/2 '>
        <div className='flex sm:flex justify-start gap-5 p-5  w-full'>
            <div className='h-40 '>
                <img src={Image1} alt='left arrow' className='sm:w-80 h-full rounded-lg'/>
            </div>
            <div className=' p-2 w-1/2'>
                <div className='text-sm'>{'Entire Flat'}</div>
                <div className='text-lg font-bold'>{'Apetite De Bone Lux Apartment'}</div>
                <div className='text-[10px] text-ellipsis text-overflow:hidden line-clamp-3'>{'The flat featureshe flat features a bright and airy living space, designed with contemporary furnishingshe flat features a bright and airy living space, designed with contemporary furnishingshe flat features a bright and airy living space, designed with contemporary furnishingshe flat features a bright and airy living space, designed with contemporary furnishingshe flat features a bright and airy living space, designed with contemporary furnishings a bright and airy living space, designed with contemporary furnishings.'}</div>
            </div>

            
        </div>
        <div className='h-1 my-5 '>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>

        <div className='px-4 '>
            <div className='text-lg font-bold pb-4'>Your Trip</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Date</div>
                    <div className='text-sm'>{`4-9 June`}</div>
                </div>
                <div className='text-md font-bold underline'>Edit</div>
            </div>

            <div className='flex justify-between items-center pt-5'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Guests</div>
                    <div className='text-sm'>{`1 Guests`}</div>
                </div>
                <div className='text-md font-bold underline'>Edit</div>
            </div>
        </div>

        <div className='h-1 my-5 '>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>

        <div className='px-4 flex flex-col gap-2 '>
            <div className='text-lg font-bold pb-4'>Price Details</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`$ 475 x 7 Nights`}</div>
                </div>
                <div className='text-sm'>{`$ 3,225`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Special Offer`}</div>
                </div>
                <div className='text-sm'>{`-$ 475`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Cleaning Fees`}</div>
                </div>
                <div className='text-sm'>{`$ 200`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Hospitality Fees`}</div>
                </div>
                <div className='text-sm'>{`$ 200`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Taxes`}</div>
                </div>
                <div className='text-sm'>{`$ 375`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm font-bold'>{`Total(USD)`}</div>
                </div>
                <div className='text-sm font-bold'>{`$ 4,100`}</div>
            </div>
        </div>

        <div className='flex flex-grow justify-center items-end'>
            <button className='w-1/2 h-10 mt-6 mb-12 text-white bg-black hover:scale-105 transition duration-75 rounded-lg max-w-[400px]'>Confirm</button>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Book