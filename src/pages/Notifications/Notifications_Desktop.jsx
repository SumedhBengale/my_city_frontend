import React, { useEffect, useState } from 'react'
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
        <div className='mx-2 mt-6 pr-5'>
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