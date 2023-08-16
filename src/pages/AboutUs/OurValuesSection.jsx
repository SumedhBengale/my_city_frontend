import React from 'react'
import Image2 from '../../assets/images/about/about_img_2.jpg'
import Image3 from '../../assets/images/about/about_img_3.jpg'
import Image4 from '../../assets/images/about/about_img_4.jpg'
import Image5 from '../../assets/images/about/about_img_5.jpg'
import mcr from '../../assets/images/black_logo.png'

function OurValuesSection() {
  return (
    <>
    <div className="Rectangle w-full bg-gray-100 md:px-10 py-10 mt-10" >
          <div className='container mx-auto flex flex-col items-center'>
              <div className='text-black font-custom-bold text-center text-2xl'>Our Values</div>
              {/* <div className='border border-black w-40 mt-3 h-[1px]'></div> */}

              <div className='flex flex-col sm:flex-row w-full justify-between gap-5'>
                <ValueItem title='Performance' content='When it comes to your stay, we try to go above and above for our clients. Our offerings include all of the necessary conveniences and comforts.'></ValueItem>
                <ValueItem title='Service' content='Our service is unrivalled. We’ll go above and beyond to make your stay as personalised and memorable as possible.'></ValueItem>
                <ValueItem title='Opportunities' content='We have the ideal location for you from a plethora of possibilities. We provide a wide range of property types and locations to meet all interests and needs.'></ValueItem>

              </div>
            </div>
        </div>
    </>
  )
}

export default OurValuesSection


function ValueItem({title, content}) {
  return (
    <>
      <div className='flex flex-col justify-center  gap-5 w-full sm:w-72 max-w-md'>
        <div className='justify-center flex'>
          <img src={mcr} alt="mcr" className='w-full h-14 object-contain mt-10 mb-10' />
        </div>

        <div className='text-2xl font-custom-bold text-center'>{title}</div>
        <div className='text-md font-custom text-center'>{content}</div>

      </div>
    </>
  )
}

