import React from 'react'

function Notification() {
  return (
    <>
        <div className='flex flex-col'>
            <div className='flex'>
                <div className='text-sm text-left px-2'>Hi, your booking for 4th June, 2023 has been confirmed by the property owner.</div>
                {<div className=' bottom-0 text-center flex items-center'>
                    <div className='bg-red-500 rounded-xl py-1 px-3 text-[10px]'>New</div>
                </div>}
            </div>
            <div className='h-full mx-2 my-2'>
                <hr className='w-full h-[2px] bg-black'></hr>
            </div>
        </div>
    </>
  )
}

export default Notification