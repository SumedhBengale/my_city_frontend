import React, { useEffect } from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import WishItem from './WishItem'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import { getWishlist, deleteFromWishlist } from './api'


function Wishlist() {
    const [items, setItems] = React.useState(null)
    const [showCloseButton, setShowCloseButton] = React.useState(false)

    useEffect(() => {
        getWishlist().then((data) => {
            const residences = data.wishlistItems
            console.log(residences)
            setItems(residences)
        })
    }, [])

    const handleDelete = (item) => {
        deleteFromWishlist(item._id).then((data) => {
            console.log(data)
            getWishlist().then((data) => {
                const residences = data.wishlistItems
                console.log(residences)
                setItems(residences)
            })
        })
    }


  return (
    <>
    <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbar />
        }
        </div>
        {items !== null  ? <div>
            <div className='flex w-full h-full bg-white shadow-lg justify-between md:mt-16 container mx-auto backdrop-filter backdrop-blur-md rounded-xl'>
                <div className='w-10 h-full' onClick={()=>window.history.back()}>
                    <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='text-lg text-center font-bold '>Wishlist</div>
                </div>
            </div>
            <div className='w-full px-5'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-10 mt-6 container mx-auto'>
                    {items.map((item) => (
                        <div className='relative'>
                            {showCloseButton && <div className='absolute top-0 right-0 mt-5 mr-5' onClick={()=>handleDelete(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white rounded-full bg-transparent p-1 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.707 9.293a1 1 0 010 1.414L8.414 13l2.293 2.293a1 1 0 11-1.414 1.414L7 14.414l-2.293 2.293a1 1 0 11-1.414-1.414L5.586 13l-2.293-2.293a1 1 0 011.414-1.414L7 11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>}
                        <WishItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full flex justify-center' onClick={()=>setShowCloseButton(!showCloseButton)}>
                <button className='w-1/2 h-12 mt-6 mb-12 text-white bg-black rounded-lg'>Edit Wishlist</button>
            </div>
        </div> : 
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='text-2xl font-bold'>No Items in Wishlist</div>
            <div className='text-lg'>Add items to your wishlist to view them here</div>
        </div>}
    </>
  )
}

export default Wishlist