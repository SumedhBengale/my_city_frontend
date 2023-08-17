import React from 'react'
import mcr from '../../assets/images/black_logo.png'
import TeamImage1 from '../../assets/images/about/team1.jpeg'
import TeamImage2 from '../../assets/images/about/team2.jpeg'
import TeamImage3 from '../../assets/images/about/team3.jpeg'
import TeamImage4 from '../../assets/images/about/team4.jpeg'

function OurTeamSection() {
  return (
    <>
        <div className="Rectangle w-full bg-white md:px-10 pt-10 mt-10" >
          <div className='container mx-auto flex flex-col items-center'>
              <div className='text-black font-custom-bold text-center text-2xl'>Our Team</div>
              {/* <div className='border border-black w-40 mt-3 h-[1px]'></div> */}

              <div className='text-black text-md pt-5 text-justify'>With a specialised team that has unrivalled knowledge in this field and is available to you at any time and day to answer all of your questions.</div>
              <div className='grid grid-cols-1 md:grid-cols-2 w-full justify-items-center mt-10 gap-20'>
                <div className='w-full flex flex-col items-center md:items-end'>                
                  <img src={TeamImage1} alt="mcr" className='w-full sm:w-1/2 md:w-[400px] h-[500px] object-cover mt-10 mb-10' />
                  <img src={TeamImage2} alt="mcr" className='w-full sm:w-1/2 md:w-[400px] h-[300px] object-cover mt-10 mb-10' />
                </div>
                <div className='w-full flex flex-col items-center md:items-start'>
                  <img src={TeamImage3} alt="mcr" className='w-full sm:w-1/2 md:w-[400px] h-[300px] object-cover mt-10 mb-10' />
                  <img src={TeamImage4} alt="mcr" className='w-full sm:w-1/2 md:w-[400px] h-[500px] object-cover mt-10 mb-10' />
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default OurTeamSection