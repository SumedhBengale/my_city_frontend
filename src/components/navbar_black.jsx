import React, { useState, } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import hamburgerMenuBlack from '../assets/images/navbar/hamburger_menu_black.svg';
import logoBlack from '../assets/images/black_logo.png';
import personBlack from '../assets/images/navbar/person_black.svg';
import notification from '../assets/images/navbar/notification.svg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    if(accountMenuOpen === true){setAccountMenuOpen(false)}
    console.log("Yes")
    setMenuOpen(!menuOpen);
  };

  const handleAccountMenuClick = () => {
    if(menuOpen === true){setMenuOpen(false)}
    console.log('clicked');
    setAccountMenuOpen(!accountMenuOpen);
  }

  return (
    <>
      <div
        className={`flex justify-between p-3 bg-white`}
      >
        <img
          src={hamburgerMenuBlack}
          alt='hamburger menu'
          onClick={handleMenuClick}
        />

        <div className='flex items-center justify-center w-full'>
          <img
            src={logoBlack}
            alt='logo'
            className='w-1/3'
          />
        </div>

        <img
          src={notification}
          alt='hamburger menu'
          className='px-2 opacity-0'
        />

        <img
          src={personBlack}
          alt='hamburger menu'
          onClick={handleAccountMenuClick}
        />
      </div>

      {accountMenuOpen && (
        <div className='absolute top-0 flex flex-col w-full bg-white drop-shadow-2xl'>
          <div
            className='flex w-full justify-between p-3 relative'
          >
        
        <img
          src={hamburgerMenuBlack}
          alt='hamburger menu'
          className='opacity-0'
        />

        <div className='flex items-center justify-center w-full'>
          <img
            src={logoBlack}
            alt='logo'
            className='w-1/3'
          />
        </div>

        <img
          src={notification}
          alt='notification menu'
          onClick={()=>{
            //Navigate to notifications page
            navigate('/notifications')
          }}
          className='px-2'
        />

        <img
          src={personBlack}
          alt='hamburger menu'
          onClick={handleAccountMenuClick}
        />
      </div>
      
      <div className='h-full mx-2 mb-3'>
          <hr className='w-full h-[2px] bg-black'></hr>
      </div>

      <div className=' gap-3 pr-3'>
        <NavLink
          to='/notifications'
          exact
          className={`flex justify-end w-full pb-1  ${
            location.pathname === '/notifications' ? 'underline font-bold' : ''
          }`}
        >
          Notifications
        </NavLink>
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

      <div className=' pr-3'>
      <NavLink
          to='/account'
          exact
          className={`flex justify-end w-full pb-1  ${
            location.pathname === '/account' ? 'underline font-bold' : ''
          }`}
        >
          Account
        </NavLink>
        <NavLink
          to='/wishlist'
          exact
          className={`flex justify-end w-full pb-1 ${
            location.pathname === '/wishlist' ? 'underline font-bold' : ''
          }`}
        >
          Wishlist
        </NavLink>
        <NavLink
          to='/trips'
          exact
          className={`flex justify-end w-full ${
            location.pathname === '/trips' ? 'underline font-bold' : ''
          }`}
        >
          Trips
        </NavLink>
      </div>

      <div className='h-full mx-2 my-3'>
          <hr className='w-full h-[2px] bg-black'></hr>
      </div>

      <div className=' pr-3 pb-3'>
      <NavLink
          to='/help'
          exact
          className={`flex justify-end w-full pb-1 ${
            location.pathname === '/help' ? 'underline font-bold' : ''
          }`}
        >
          Help
        </NavLink>
        <div
          className={`flex justify-end w-full pb-1`} onClick={() =>{
            localStorage.removeItem('token');
            navigate('/login')
          }}
        >
          Log Out
        </div>
      </div>
        </div>
      )}

      {menuOpen && (
        <div className=''>
          {menuOpen && (
            <div className=' w-full bg-white flex flex-col'>
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
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
