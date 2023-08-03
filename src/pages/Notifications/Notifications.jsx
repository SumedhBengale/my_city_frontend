import { React, useEffect, useState} from 'react'
import LeftArrow from '../../assets/images/property/left.svg'
import Notification from './Notification'
import { getNotifications } from './api'

function Notifications() {
    const [notifications, setNotifications] = useState(null)
  useEffect(() => {
    getNotifications().then((data) => {
      console.log(data)
      setNotifications(data.notifications)
    })
  }, [])
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
        <div className='flex flex-col mx-2 mt-6 gap-1'>
            {
                notifications !== null && notifications.map((notification) => (
                    <Notification notification={notification}></Notification>
                ))
            }
        </div>
    </>
  )
}

export default Notifications