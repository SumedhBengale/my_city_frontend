import React from 'react'
import homeBuilding from '../../assets/images/home/home_building.jpg'

function IntroductionSection({dynamicText}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:p-20 lg:pl-10 gap-2'>
      <div className='text-center lg:text-left pr-5'>
        <div className='text-slate-400 text-md pb-3 pt-10'>{
          dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'Introduction_Greeting').attributes.text
        }</div>
        <div className="text-black font-custom font-bold text-3xl capitalize pb-3">{
          dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'Introduction_Headline').attributes.text
        }</div>
        <div className='text-slate-400 text-md pb-5'>{
          dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'Introduction_Subheading').attributes.text
        }</div>
        <div className=" w-full text-black text-md font-normal leading-normal pb-5">{
          dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'Introduction_Description1').attributes.text
        }</div>
        <div className=" w-full text-black text-md font-normal leading-normal pb-5">{
          dynamicText !== null && dynamicText.find((text) => text.attributes.name === 'Introduction_Description2').attributes.text
        }</div>
      </div>
        <img className="Image w-full h-[245px] lg:h-full rounded-lg py-5 lg:pr-10" src={homeBuilding} alt='Placeholder'/>
    </div>
  )
}

export default IntroductionSection