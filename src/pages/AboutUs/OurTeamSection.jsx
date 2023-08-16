import React from 'react'
import mcr from '../../assets/images/black_logo.png'

function OurTeamSection() {
  return (
    <>
        <div className="Rectangle w-full bg-white md:px-10 pt-10 mt-10" >
          <div className='container mx-auto flex flex-col items-center'>
              <div className='text-black font-custom-bold text-center text-2xl'>Our Team</div>
              {/* <div className='border border-black w-40 mt-3 h-[1px]'></div> */}

              <div className='text-black text-md pt-5 text-justify'>With a specialised team that has unrivalled knowledge in this field and is available to you at any time and day to answer all of your questions.</div>
              {/* <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-full h-14 object-contain mt-10 mb-10' />
            </div> */}
            </div>
        </div>
    </>
  )
}

export default OurTeamSection