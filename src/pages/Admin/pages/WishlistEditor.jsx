import React, { useEffect, useState } from 'react'
import { adminGetWishlist, deleteItem } from '../api'
import { useLocation } from 'react-router-dom'

function WishlistEditor() {
    const location = useLocation()
    const [wishlist, setWishlist] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(() => {
        const userId = location.state.id
        adminGetWishlist(userId)
            .then((data) => {
                console.log('Wishlist:', data)
                setWishlist(data[0]['wishlistItems'])
            })
            .catch((error) => {
                console.error('Error fetching wishlist:', error)
            })
    }, [location])

  return (
    <div>
        {wishlist !== null && wishlist.length > 0 ? (
            <div>
                <div className='text-2xl font-bold text-center'>Wishlist</div>
                { wishlist.map((residence) => (
                    <div>
                        <div className='flex flex-col sm:flex-row justify-center gap-5 my-5'>
                            <div className='bg-primary hover:bg-secondary transition-all duration-100 text-white rounded-lg flex px-5 py-3 gap-5 w-full sm:w-1/2 max-w-4xl'>
                                <div className='flex justify-center'>
                                    <img src={residence.residenceId.images[0]} alt='residence' className='w-40 h-40 rounded-lg'/>
                                </div>
                                <div className='flex flex-col gap-5 w-full'>
                                    <div className='flex justify-end'>
                                        <button className='w-5 h-5 rounded-md border border-black flex justify-center items-center hover:bg-primary transition-all duration-100 text-white'
                                            onClick={()=>{
                                                deleteItem(residence._id)
                                                    .then((data) => {
                                                        console.log('Item deleted:', data)
                                                        window.location.reload()
                                                    })
                                                    .catch((error) => {
                                                        console.error('Error deleting item:', error)
                                                    })
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition duration-75" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.147a.5.5 0 10-.708.708L9.293 10l-4.147 4.146a.5.5 0 00.708.708L10 10.707l4.146 4.147a.5.5 0 00.708-.708L10.707 10z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <div className='text-xl font-bold'>{`Title - ${residence.residenceId.title}`}</div>
                                        <div className='text-lg font-bold'>{`Price Per Night - ${residence.residenceId.pricePerNight}`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        ) : (
            <div className='text-2xl font-bold text-center'>No wishlist Items</div>
        )}
    </div>

  )
}

export default WishlistEditor