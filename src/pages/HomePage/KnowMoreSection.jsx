import React from 'react'
import know_more_image from '../../assets/images/home/know_more_image.jpg'

function KnowMoreSection() {
  return (
    <>
    <div className="w-full flex flex-col justify-center items-center mt-10">
        <img src={know_more_image} alt='know more' className='w-full p-5 object-cover rounded-2xl'></img>
        <div className='text-4xl font-bold text-center'>My City Residence</div>
        <div className='text-lg text-center'>Our Serviced Apartments</div>
        <div className='text-md text-slate-700 text-center p-5'>My city Residence is the ultimate city break apartment, with everything you need right on your doorstep. Situated in the heart of London in outstanding zone 1 covering marylebone, knightsbridge, kensington and many more beautiful locations.</div>

        <div className='flex justify-center mt-5'>
        <div className="w-[178px] h-14 bg-zinc-900 rounded-xl backdrop-blur-md" >
          <div className='text-white text-2xl h-full flex justify-center items-center'>Know More</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default KnowMoreSection