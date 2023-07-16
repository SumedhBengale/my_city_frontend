import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import personBlack from '../assets/images/navbar/person_black.svg';
import notification from '../assets/images/navbar/notification.svg';
import Notification from '../pages/Notifications/Notifications_Desktop'

function DesktopNavbar() {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
    const location = useLocation();
  
    const handleNotificationMenuClick = () => {
      console.log('clicked');
      accountMenuOpen ? setAccountMenuOpen(false) : console.log('account menu not open');
      setNotificationMenuOpen(!notificationMenuOpen);
    }

    const handleAccountMenuClick = () => {
      console.log('clicked');
      notificationMenuOpen ? setNotificationMenuOpen(false) : console.log('notification menu not open');
      setAccountMenuOpen(!accountMenuOpen);
    }
  

    return (
      <>
        
        <div className=' w-full bg-transparent flex justify-end text-black gap-3 px-5'>
                <NavLink
                  to='/'
                  exact
                  className={`flex justify-between p-2 ${
                    location.pathname === '/' ? 'underline font-bold' : ''
                  }`}
                >
                  Home Page
                </NavLink>
                <NavLink
                  to='/properties'
                  className={`flex justify-between p-2 ${
                    location.pathname === '/properties' ? 'underline font-bold' : ''
                  }`}
                >
                  Properties
                </NavLink>
                <NavLink
                  to='/management'
                  className={`flex justify-between p-2 ${
                    location.pathname === '/management' ? 'underline font-bold' : ''
                  }`}
                >
                  Management
                </NavLink>
                <NavLink
                  to='/about'
                  className={`flex justify-between p-2 ${
                    location.pathname === '/about' ? 'underline font-bold' : ''
                  }`}
                >
                  About Us
                </NavLink>
                <NavLink
                  to='/contact'
                  className={`flex justify-between p-2 ${
                    location.pathname === '/contact' ? 'underline font-bold' : ''
                  }`}
                >
                  Contact Us
                </NavLink>
                <img
                    src={notification}
                    alt='notification menu'
                    onClick={handleNotificationMenuClick}
                    className='px-2 color-white'
                />
        
                <img
                    src={personBlack}
                    alt='hamburger menu'
                    onClick={handleAccountMenuClick}
                />
              </div>

              {notificationMenuOpen && (
            <div className='w-full translate-y-3 bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl'>
          <div className='relative top-0 right-0 w-96 h-96 overflow-y-scroll flex flex-col bg-white rounded-xl'>
                <Notification></Notification>
          </div>
            </div>
        )}



  
        {accountMenuOpen && (
            <div className='w-full bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl'>
          <div className='relative top-0 right-0 w-48 flex flex-col bg-white rounded-xl'>
  
        <div className='flex flex-col gap-3 pr-3 pt-3'>
          <NavLink
            to='/messages'
            exact
            className={`flex justify-end w-full  ${
              location.pathname === '/messages' ? 'underline font-bold' : ''
            }`}
          >
            Messages
          </NavLink>
        </div>
  
        <div className='h-full mx-2 my-3'>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>
  
        <div className='flex flex-col gap-3 pr-3'>
        <NavLink
            to='/account'
            exact
            className={`flex justify-end w-full  ${
              location.pathname === '/account' ? 'underline font-bold' : ''
            }`}
          >
            Account
          </NavLink>
          <NavLink
            to='/wishlist'
            exact
            className={`flex justify-end w-full  ${
              location.pathname === '/wishlist' ? 'underline font-bold' : ''
            }`}
          >
            Wishlist
          </NavLink>
          <NavLink
            to='/trips'
            exact
            className={`flex justify-end w-full  ${
              location.pathname === '/trips' ? 'underline font-bold' : ''
            }`}
          >
            Trips
          </NavLink>
        </div>
  
        <div className='h-full mx-2 my-3'>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>
  
        <div className='flex flex-col gap-3 pr-3 pb-3'>
        <NavLink
            to='/help'
            exact
            className={`flex justify-end w-full  ${
              location.pathname === '/help' ? 'underline font-bold' : ''
            }`}
          >
            Help
          </NavLink>
          <div
            className={`flex justify-end w-full`}
          >
            Log Out
          </div>
        </div>
          </div>
          </div>
        )}
      </>
    );
}

export default DesktopNavbar