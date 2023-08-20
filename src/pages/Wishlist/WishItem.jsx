import React from 'react'
import { useNavigate } from 'react-router-dom'

function WishItem({item}) {
  const navigate = useNavigate()
  return (
    <>
        <div className='w-full h-full flex flex-col pb-6 p-2 rounded-xl cursor-pointer hover:scale-105 transition duration-75' 
          onClick={()=>{
            navigate(`/property/${item.residence._id}`,{
              state: {
                guests: localStorage.getItem('guestCount') ? localStorage.getItem('guestCount') : 1,
              }
            })
          }}
        >
        <img src={item.residence.pictures[0].original? item.residence.pictures[0].original : item.residence.pictures[0].thumbnail} alt='left arrow' className='w-full h-full rounded-lg'/>
        <div className='pt-2 text-sm font-bold'>{item.residence.title}</div>

        </div>
    </>
  )
}

export default WishItem