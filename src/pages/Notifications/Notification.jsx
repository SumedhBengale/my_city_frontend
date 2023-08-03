import React from 'react'

function Notification({notification}) {
  return (
    <>
        <div className='flex flex-col'>
            <div className='flex'>
                <div className='text-sm text-left px-2'>{notification.message}</div>
                {notification.viewed === false &&
                    <div className=' bottom-0 text-center flex items-center'>
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