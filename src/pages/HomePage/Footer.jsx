import React from 'react'
import black_logo from '../../assets/images/black_logo.png'

function Footer() {
  return (
    <>
    <div className="Rectangle w-full bg-zinc-100 backdrop-blur-[192px] mt-10" >
        <img src={black_logo} alt='logo' className='w-1/2 pt-5 pl-5'></img>

        <div className='pt-10 pl-5'>
            <div className='text-xl font-bold'>Currency Switcher</div>
        </div>

        <div className='pt-10 pl-5'>
            <div className='text-xl font-bold'>Explore</div>
            <div className="text-black text-md pt-3 pl-3">Apartment</div>
            <div className="text-black text-md pt-3 pl-3">Concominimum</div>
        </div>

        <div className='pt-10 pl-5'>
            <div className='text-xl font-bold'>Company</div>
            <div className="text-black text-md pt-3 pl-3">Properties</div>
            <div className="text-black text-md pt-3 pl-3">Things to do</div>
            <div className="text-black text-md pt-3 pl-3">Management</div>
            <div className="text-black text-md pt-3 pl-3">Privacy Policy</div>
            <div className="text-black text-md pt-3 pl-3">Terms and Conditions</div>
        </div>

        <div className='pt-10 pl-5'>
            <div className='text-xl font-bold'>Contact Us</div>
        </div>
    </div>
    </>
  )
}

export default Footer