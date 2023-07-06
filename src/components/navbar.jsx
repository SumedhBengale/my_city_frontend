import React from 'react'
import hamburgerMenu from '../assets/images/navbar/hamburger_menu.svg'
import logo from '../assets/images/white_logo.png'
import person from '../assets/images/navbar/person.svg'

function Navbar() {
  return (
    <>
        <div className='flex justify-between p-3'>
            <img src={hamburgerMenu} alt='hamburger menu' />

            <div className='flex items-center justify-center w-full'>
                <img src={logo} alt='logo' className='w-1/3'/>
            </div>

            <img src={person} alt='person' />
        </div>
    </>
  )
}

export default Navbar