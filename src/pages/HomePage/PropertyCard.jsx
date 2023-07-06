import React from 'react'
import placeholderRoomImage from '../../assets/images/home/placeholder_room_image.jpg'
import bed from '../../assets/images/home/bed.svg'
import shower from '../../assets/images/home/shower.svg'
import person from '../../assets/images/home/person.svg'


function PropertyCard() {
  return (
    <div className="Rectangle w-full h-96 bg-gray-200 rounded-2xl backdrop-blur-[185px] mt-5" >
        <div class="absolute bottom-36 left-0 rounded-full px-3 py-1 text-sm font-semibold text-white m-2">$19.99</div>
        <img class="w-full h-2/3 p-4" src={placeholderRoomImage} alt="Placeholder"/>
    <div class="px-6 py-3">
      <div class="font-bold text-2xl mb-2 overflow-ellipsis line-clamp-1">Amazing Highly Spacious</div>
      <p class="text-black">Lyall St, London SW1X 8DW, UK</p>
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