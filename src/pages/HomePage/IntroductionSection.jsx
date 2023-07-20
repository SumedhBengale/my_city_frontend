import React from 'react'
import homeBuilding from '../../assets/images/home/home_building.jpg'

function IntroductionSection() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:p-20 lg:pl-10 gap-2'>
      <div className='text-center lg:text-left'>
        <div className='text-slate-400 text-md pb-3 pt-10'>Welcome to</div>
        <div className="text-black font-custom font-bold text-3xl font-bold capitalize pb-3">My City Residence</div>
        <div className='text-slate-400 text-md'>Luxurious residences in the heart of London</div>
        <div className=" w-full text-black text-md font-normal leading-normal py-5">My city residence mission is to provide you with a home away from home. Our hand-picked London apartments have been created to give a luxury and convenient experience during your stay, while also giving great central London locations to allow you to fully enjoy the city.</div>
        <div className=" w-full text-black text-md font-normal leading-normal py-5">Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. If you desire comfort, privacy, flexibility, and value for money, renting a vacation property directly from the owner is the ideal hotel option. You’ll save money per person, have the freedom to travel at your own leisure, and get to know your selected destination like a resident.</div>
      </div>
        <img className="Image w-full h-[245px] lg:h-full rounded-lg py-5 lg:pr-10" src={homeBuilding} alt='Placeholder'/>
    </div>
  )
}

export default IntroductionSection