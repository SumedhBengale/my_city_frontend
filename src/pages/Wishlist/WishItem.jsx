import React from 'react'

function WishItem({item}) {
  return (
    <>
        <div className='w-full h-full flex flex-col pb-6 p-2 rounded-xl'>
        <img src={item.residenceId.images[0]} alt='left arrow' className='w-full h-full rounded-lg'/>
        <div className='pt-2 text-sm font-bold'>{item.residenceId.title}</div>

        </div>
    </>
  )
}

export default WishItem