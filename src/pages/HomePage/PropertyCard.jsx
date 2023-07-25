import React from 'react'
import placeholderRoomImage from '../../assets/images/home/placeholder_room_image.jpg'
import bed from '../../assets/images/home/bed.svg'
import shower from '../../assets/images/home/shower.svg'
import person from '../../assets/images/home/person.svg'
import { useNavigate } from 'react-router-dom'

function PropertyCard({residence}) {
  const navigate = useNavigate();
  return (
    <div className=" w-full md:max-w-[600px] max-w-[400px] h-min bg-gray-200 hover:bg-gray-300 transition duration-75 rounded-2xl backdrop-blur-[185px] pb-5 mb-5" onClick={()=>navigate(`/property/${residence._id}`)}>
        <div className='relative w-full'>
          <div className="absolute bottom-7 left-3 rounded-full pl-4 text-sm font-semibold text-white">
          <div className="flex"><div className="text-white text-xl -translate-y-2 font-normal">€</div><div className="text-white text-xl font-bold">{residence.pricePerNight}</div><div className="text-white text-sm font-normal self-end">/night</div></div>
          </div>
          <div className='w-full p-4'>
            <img className="w-full h-48 lg:h-56 rounded-xl object-cover" src={residence.images[0]} alt="Placeholder"/>
          </div>
        </div>
        <div className="px-6 py-3">
          <div className="font-bold font-custom text-2xl mb-2 overflow-ellipsis line-clamp-1">{residence.title}</div>
          <p className="text-black line-clamp-1">{residence.address}</p>
        </div>

    {/*Also fetch these values from the API */}
    <div className='grid grid-cols-1 xs:grid-cols-2 px-5 gap-2'>
        <div className='flex justify-start gap-1'>
            <div className='flex'>
                <img src={bed} alt='bed' className=''></img>
                <div className='pl-1'>{residence.beds}</div>
            </div>
            <div className='flex'>
                <img src={shower} alt='shower' className=''></img>
                <div className='pl-1'>{residence.bathrooms}</div>
            </div>
            <div className='flex'>
                <img src={person} alt='person' className=''></img>
                <div className='pl-1'>{residence.guests}</div>
            </div>
        </div>
        <div className='text-md xs:text-end'>{residence.type}</div>
    </div>
  </div>
  )
}

export default PropertyCard