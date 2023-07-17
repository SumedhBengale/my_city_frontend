import React from 'react'
import Image2 from '../../assets/images/about/about_img_2.jpg'
import Image3 from '../../assets/images/about/about_img_3.jpg'
import Image4 from '../../assets/images/about/about_img_4.jpg'
import Image5 from '../../assets/images/about/about_img_5.jpg'

function OurValuesSection() {
  return (
    <>
        <div className='text-black text-center font-custom text-lg mt-10'>Our Values</div>

        <div className="w-full pr-8 pt-16 relative lg:pr-20">
      <div className='w-full h-56 md:h-[400px] rounded-r-[50px] md:rounded-r-[150px]'>
          <img src={Image2} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] " />
        </div>
          <div className='absolute top-8 h-full flex items-center w-full justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md container mx-auto">
              <div className=" w-full text-center text-white font-custom text-sm md:text-xl px-2 pb-1">Performance</div>
              <div className=" w-full text-center text-white text-[10px] sm:text-lg px-2 font-normal pb-2 ">When it comes to your stay, we try to go above and above for our clients. Our offerings include all of the necessary conveniences and comforts.</div>
            </div>
          </div>
        </div>

        <div className="w-full pl-8 pt-16 relative lg:pl-20">
      <div className='w-full h-56 md:h-[400px] rounded-l-[50px] md:rounded-l-[150px]'>
          <img src={Image3} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-l-[50px]  md:rounded-l-[150px] " />
        </div>
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md container mx-auto">
              <div className=" w-full text-center text-white font-custom text-sm md:text-xl px-2 pb-1">Service</div>
              <div className=" w-full text-center text-white text-[10px] sm:text-lg px-2 font-normal pb-2 ">Our service is unrivalled. We’ll go above and beyond to make your stay as personalised and memorable as possible.</div>
            </div>
          </div>
        </div>

        <div className="w-full pr-8 pt-16 relative lg:pr-20">
      <div className='w-full h-56 md:h-[400px] rounded-r-[50px] md:rounded-r-[150px]'>
          <img src={Image4} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[50px]  md:rounded-r-[150px] " />
        </div>
          <div className='absolute top-8 h-full flex items-center w-full justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md container mx-auto">
              <div className=" w-full text-center text-white font-custom text-sm md:text-xl px-2 pb-1">Opportunities</div>
              <div className=" w-full text-center text-white text-[10px] sm:text-lg px-2 font-normal pb-2 ">We have the ideal location for you from a plethora of possibilities. We provide a wide range of property types and locations to meet all interests and needs.</div>
            </div>
          </div>
        </div>

        <div className="w-full pl-8 pt-16 relative lg:pl-20">
      <div className='w-full h-56 md:h-[400px] rounded-l-[50px] md:rounded-l-[150px]'>
          <img src={Image5} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-l-[50px]  md:rounded-l-[150px] " />
        </div>
          <div className='absolute top-8 h-full w-full flex items-center justify-center pr-5'>
            <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-10 h-max bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-md container mx-auto">
              <div className=" w-full text-center text-white font-custom text-sm md:text-xl px-2 pb-1">Our Team</div>
              <div className=" w-full text-center text-white text-[10px] sm:text-lg px-2 font-normal pb-2 ">With a specialised team that has unrivalled knowledge in this field and is available to you at any time and day to answer all of your questions.</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default OurValuesSection