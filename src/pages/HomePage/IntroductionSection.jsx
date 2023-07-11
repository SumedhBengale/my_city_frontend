import React from 'react'
import homeBuilding from '../../assets/images/home/home_building.jpg'

function IntroductionSection() {
  return (
    <div className='flex flex-col justify-center items-center mt-20 gap-2'>
        <div className='text-slate-400 text-sm'>Welcome to</div>
        <div className="MyCityResidence text-center text-black font-custom text-4xl font-bold capitalize">My City Residence</div>
        <div className='text-slate-400 text-sm'>Luxurious residences in the heart of London</div>
        <div className=" w-full text-center text-black text-lg font-normal leading-normal p-5">My city residence mission is to provide you with a home away from home. Our hand-picked London apartments have been created to give a luxury and convenient experience during your stay, while also giving great central London locations to allow you to fully enjoy the city.</div>
        <div className=" w-full text-center text-black text-lg font-normal leading-normal p-5">Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. If you desire comfort, privacy, flexibility, and value for money, renting a vacation property directly from the owner is the ideal hotel option. You’ll save money per person, have the freedom to travel at your own leisure, and get to know your selected destination like a resident.</div>
        <img className="Image w-full h-[245px] rounded-lg p-5" src={homeBuilding} alt='Placeholder'/>
    </div>
  )
}

export default IntroductionSection