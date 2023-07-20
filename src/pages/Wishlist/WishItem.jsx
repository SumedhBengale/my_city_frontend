import React from 'react'
import Image1 from '../../assets/images/property/placeholder1.png'

function WishItem() {
  return (
    <>
        <div className='w-full h-full flex flex-col pb-6 p-2 rounded-xl'>
        <img src={Image1} alt='left arrow' className='w-full h-full rounded-lg'/>
        <div className='pt-2 text-sm font-bold'>Superior One Bedroom Apartment in Bevgaravia</div>

        </div>
    </>
  )
}

export default WishItem