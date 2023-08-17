import React from 'react'
import mcr from '../../assets/images/black_logo.png'

function OurStorySection() {
  return (
    <>
        <div className="Rectangle w-full bg-gray-100 md:px-10 py-10 mt-10" >
          <div className='container mx-auto flex flex-col items-center'>
              <div className='text-black font-custom-bold text-center text-2xl'>Our Story</div>
              <div className='border border-black w-40 mt-3 mb-5 h-[1px]'></div>

              <div className='text-black text-md pt-5 text-justify'>At My City Residence, we take great pleasure in welcoming guests from all over the world to some of our enticing apartments. If you like discovering new places and dining at top restaurants, I strongly recommend staying here. Our team’s combined experience in the travel industry spans more than three decades, making your time in London simple and pleasurable. Our vast local knowledge and dedication to customer satisfaction make for an even more sophisticated visit. We are excited to host you.We established this organisation to manage and maintain a portfolio of first-rate assets. When searching for a short or extended stay, we want to make sure you have the finest “home away from home” experience possible. All of our houses are in outstanding locations, well-furnished, and well-maintained. We would be honoured to host you and your loved ones in one of our exquisite apartment options.</div>
              {/* <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-full h-14 object-contain mt-10 mb-10' />
            </div> */}
            </div>
        </div>
    </>
  )
}

export default OurStorySection