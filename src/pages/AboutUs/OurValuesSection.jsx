import React from 'react'
import Image2 from '../../assets/images/about/about_img_2.jpg'
import Image3 from '../../assets/images/about/about_img_3.jpg'
import Image4 from '../../assets/images/about/about_img_4.jpg'
import Image5 from '../../assets/images/about/about_img_5.jpg'

function OurValuesSection() {
  return (
    <>
        <div className='text-black text-center font-custom text-lg mt-10'>Our Values</div>

        <div className='flex flex-col gap-5'></div>
        <div className="relative w-full pr-8 pt-10">
        <img src={Image2} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center justify-center absolute top-5 left-0 w-full h-full z-10 scale-105">
            <div className="w-3/4  bg-opacity-5 rounded-2xl backdrop-blur-md p-4 mr-10 py-3 border">
                <div className='font-custom text-lg text-white font-bold text-center pb-2'>Performance</div>
                <div className='text-xs text-white text-center'>When it comes to your stay, we try to go above and above for our clients. Our offerings include all of the necessary conveniences and comforts.</div>
            </div>
        </div>
      </div>

      <div className="relative w-full pl-8 pt-10">
        <img src={Image3} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center justify-center absolute top-5 left-0 w-full h-full z-10 scale-105">
            <div className="w-3/4  bg-opacity-5 rounded-2xl backdrop-blur-md p-4 ml-10 py-3 border">
                <div className='font-custom text-lg text-white font-bold text-center pb-2'>Service</div>
                <div className='text-xs text-white text-center'>Our service is unrivalled. We’ll go above and beyond to make your stay as personalised and memorable as possible.</div>
            </div>
        </div>
      </div>

      <div className="relative w-full pr-8 pt-10">
        <img src={Image4} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center justify-center absolute top-5 left-0 w-full h-full z-10 scale-105">
            <div className="w-3/4  bg-opacity-5 rounded-2xl backdrop-blur-md p-4 mr-10 py-3 border">
                <div className='font-custom text-lg text-white font-bold text-center pb-2'>Opportunities</div>
                <div className='text-xs text-white text-center'>We have the ideal location for you from a plethora of possibilities. We provide a wide range of property types and locations to meet all interests and needs.</div>
            </div>
        </div>
      </div>

      <div className="relative w-full pl-8 pt-10">
        <img src={Image5} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center justify-center absolute top-5 left-0 w-full h-full z-10 scale-105">
            <div className="w-3/4  bg-opacity-5 rounded-2xl backdrop-blur-md p-4 ml-10 py-3 border">
                <div className='font-custom text-lg text-white font-bold text-center pb-2'>Our Team</div>
                <div className='text-xs text-white text-center'>With a specialised team that has unrivalled knowledge in this field and is available to you at any time and day to answer all of your questions.</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default OurValuesSection