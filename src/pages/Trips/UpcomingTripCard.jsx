import React from 'react'
import Image2 from '../../assets/images/property/placeholder2.png'
import Chat from '../../assets/images/trips/chat.svg'

function UpcomingTripCard() {
  return (
    <div className='flex flex-col bg-zinc-300 rounded-lg p-4 gap-2'>
        <div className='w-full h-full flex'>
            <img src={Image2} alt='left arrow' className=' w-full rounded-lg'/>
        </div>
        <div className='text-sm'>Entire Flat</div>
        <div className='text-md font-bold'>Apetite De Bone Lux Apartment</div>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <div className='text-md font-bold'>Dates</div>
                <div className='text-sm'>{`4-9 Jun`}</div>
            </div>
            <div className='flex flex-col'>
                <div className='text-md text-end font-bold underline'>Edit</div>
                <div className='flex'>
                    <img src={Chat} alt='chat' className='w-5 h-5'/>
                    <div className='text-sm pl-2'>Chat with us</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpcomingTripCard