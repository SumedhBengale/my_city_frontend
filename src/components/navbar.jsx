import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import hamburgerMenu from '../assets/images/navbar/hamburger_menu.svg';
import hamburgerMenuBlack from '../assets/images/navbar/hamburger_menu_black.svg';
import logo from '../assets/images/white_logo.png';
import logoBlack from '../assets/images/black_logo.png';
import person from '../assets/images/navbar/person.svg';
import personBlack from '../assets/images/navbar/person_black.svg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={`flex justify-between p-3 relative ${
          menuOpen ? 'bg-white' : 'bg-transparent'
        }`}
        style={menuOpen ? {} : { backgroundColor: 'transparent' }}
      >
        <img
          src={menuOpen ? hamburgerMenuBlack : hamburgerMenu}
          alt='hamburger menu'
          onClick={handleMenuClick}
        />

        <div className='flex items-center justify-center w-full'>
          <img
            src={menuOpen ? logoBlack : logo}
            alt='logo'
            className='w-1/3'
            style={menuOpen ? {} : { filter: 'brightness(100%)' }}
          />
        </div>

        <img
          src={menuOpen ? personBlack : person}
          alt='person'
          style={menuOpen ? {} : { filter: 'brightness(100%)' }}
        />
      </div>

      {menuOpen && (
        <div className=''>
          {menuOpen && (
            <div className='fixed w-full bg-white flex flex-col'>
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
