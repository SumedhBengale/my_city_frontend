import React from 'react'
import know_more_image from '../../assets/images/home/know_more_image.jpg'

function KnowMoreSection() {
  return (
    <>
    <div className="w-full container mx-auto flex flex-col lg:flex-row justify-center items-center mt-10 lg:px-20">
        <img src={know_more_image} alt='know more' className='w-full max-h-[500px] p-5 object-cover rounded-2xl'></img>
        <div className='text-center lg:text-left'>
        <div className='font-custom-bold text-3xl'>My City Residence</div>
        <div className='font-normal text-lg'>Our Serviced Apartments</div>
        <div className='text-md text-slate-700 pt-5'>My city Residence is the ultimate city break apartment, with everything you need right on your doorstep. Situated in the heart of London in outstanding zone 1 covering marylebone, knightsbridge, kensington and many more beautiful locations.</div>

        <div className='flex justify-center lg:justify-start mt-5'>
        <div className="w-[178px] h-12  bg-secondary hover:bg-primary border border-secondary text-white shadow-lg hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md" >
          <div className=' text-xl h-full flex justify-center font-custom items-center'>Know More</div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default KnowMoreSection