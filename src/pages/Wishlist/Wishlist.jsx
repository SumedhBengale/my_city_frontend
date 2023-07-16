import React from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import WishItem from './WishItem'


function Wishlist() {
  return (
    <>
        <div className='flex w-full h-full bg-white shadow-lg justify-between'>
            <div className='w-10 h-full' onClick={()=>window.history.back()}>
                <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='text-lg text-center font-bold '>Wishlist</div>
            </div>
        </div>
        <div className='w-full px-5'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 mt-6 container mx-auto'>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
                <WishItem></WishItem>
            </div>
        </div>
        <div className='w-full flex justify-center'>
            <button className='w-1/2 h-12 mt-6 mb-12 text-white bg-black rounded-lg'>Edit Wishlist</button>
        </div>
    </>
  )
}

export default Wishlist