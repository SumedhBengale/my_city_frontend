import React from 'react'
import placeholderRoomImage from '../../assets/images/home/placeholder_room_image.jpg'
import bed from '../../assets/images/home/bed.svg'
import shower from '../../assets/images/home/shower.svg'
import person from '../../assets/images/home/person.svg'
import { useNavigate } from 'react-router-dom'

function PropertyCard() {
  const navigate = useNavigate();
  return (
    <div className="w-full md:max-w-[600px] max-w-[400px] bg-gray-200 hover:bg-gray-300 transition duration-75 rounded-2xl backdrop-blur-[185px] pb-5 mb-5" onClick={()=>navigate('/property')}>
        <div className="fixed bottom-40 left-3 rounded-full px-3 py-1 text-sm font-semibold text-white m-2">$19.99</div>
        <img className="w-full p-4" src={placeholderRoomImage} alt="Placeholder"/>
        <div className="px-6 py-3">
          <div className="font-bold font-custom text-2xl mb-2 overflow-ellipsis line-clamp-1">Amazing Highly Spacious</div>
          <p className="text-black">Lyall St, London SW1X 8DW, UK</p>
        </div>

    {/*Also fetch these values from the API */}
    <div className='flex justify-between px-5'>
        <div className='flex justify-between'>
            <div className='flex'>
                <img src={bed} alt='bed' className=''></img>
                <div className='pl-2'>1</div>
            </div>
            <div className='flex'>
                <img src={shower} alt='shower' className=''></img>
                <div className='pl-2'>1</div>
            </div>
            <div className='flex'>
                <img src={person} alt='person' className=''></img>
                <div className='pl-2'>1</div>
            </div>
        </div>
        <div className='text-md'>Condominimum</div>
    </div>
  </div>
  )
}

export default PropertyCard