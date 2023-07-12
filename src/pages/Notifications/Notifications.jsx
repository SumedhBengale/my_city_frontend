import React from 'react'
import LeftArrow from '../../assets/images/property/left.svg'
import Notification from './Notification'

function Notifications() {
  return (
    <>
        <div className='flex w-full h-full bg-white shadow-lg justify-between'>
            <div className='w-10 h-full' onClick={()=>window.history.back()}>
                <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='text-lg text-center font-bold '>Notifications</div>
            </div>
        </div>
        <div className='flex flex-col mx-2 mt-6'>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>

        </div>
    </>
  )
}

export default Notifications