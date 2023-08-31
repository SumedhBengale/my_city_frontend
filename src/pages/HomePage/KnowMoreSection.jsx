import React from 'react'
import know_more_image from '../../assets/images/home/know_more_image.jpg'

function KnowMoreSection({dynamicText}) {
  return (
    <>
    <div className="w-full container mx-auto flex flex-col lg:flex-row justify-center items-center mt-10 lg:px-20">
        <img src={know_more_image} alt='know more' className='w-full max-h-[500px] p-5 object-cover rounded-2xl'></img>
        <div className='text-center lg:text-left'>
        <div className='font-custom-bold text-3xl'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'KnowMoreSection_Heading').attributes.text}</div>
        <div className='font-normal text-lg'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'KnowMoreSection_Subheading').attributes.text}</div>
        <div className='text-md text-slate-700 pt-5'>{dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'KnowMoreSection_Content').attributes.text}</div>

        <div className='flex justify-center lg:justify-start mt-5'>
        <div className="w-[178px] h-12  bg-primary hover:bg-secondary border text-white shadow-lg hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md" >
          <div className=' text-xl h-full flex justify-center font-custom items-center'>Know More</div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default KnowMoreSection