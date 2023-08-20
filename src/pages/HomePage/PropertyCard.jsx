import React from 'react'
import bed from '../../assets/images/home/bed.svg'
import shower from '../../assets/images/home/shower.svg'
import person from '../../assets/images/home/person.svg'
import { useNavigate } from 'react-router-dom'

function PropertyCard({residence}) {
  const navigate = useNavigate();
  return (
    <div className=" w-full  md:max-w-[600px] max-w-[400px] bg-gray-200 hover:bg-gray-300 transition duration-75 rounded-2xl backdrop-blur-[185px] pb-5 mb-5" onClick={()=>navigate(`/property/${residence._id}`,{
      state: {
        guests: localStorage.getItem('guestCount') ? localStorage.getItem('guestCount') : 1,
      }
    })}>
        <div className='relative w-full'>
          <div className="absolute bottom-7 left-3 rounded-full pl-4 text-sm font-semibold text-white">
            <div className="flex">
                <div className="text-white text-xl -translate-y-2 font-normal">£</div>
                <div className="text-white text-xl font-bold">{residence.prices.basePrice}</div>
                <div className="text-white text-sm font-normal self-end">/night</div>
            </div>
          </div>
          <div className='w-full p-4'>
          <img className="w-full rounded-xl h-40 md:h-48 lg:h-56" src={residence.pictures[0].regular ? residence.pictures[0].regular : residence.pictures[0].thumbnail} alt="Thumbnail" />
          </div>
        </div>
        <div className="px-6 py-3">
          <div className="font-bold font-custom text-2xl mb-2 overflow-ellipsis line-clamp-1">{residence.title.toString()}</div>
          <p className="text-black line-clamp-1">{`${residence.address.full}`}</p>

        </div>

    {/*Also fetch these values from the API */}
    <div className='grid grid-cols-1 xs:grid-cols-2 px-5 gap-1 xs:gap-5 line-clamp-1'>
    <div className='flex justify-start gap-2 w-full'>
      <div className='flex'>
          <img src={bed} alt='bed' className='' />
          <div className='pl-1'>{residence.beds}</div>
      </div>
      <div className='flex'>
          <img src={shower} alt='shower' className='' />
          <div className='pl-1'>{residence.bathrooms}</div>
      </div>
      <div className='flex'>
          <img src={person} alt='person' className='' />
          <div className='pl-1'>{residence.accommodates}</div>
      </div>
    </div>
    <div className='text-md overflow-hidden text-start xs:text-end overflow-ellipsis'>{residence.propertyType}</div>
    </div>
  </div>
  )
}

export default PropertyCard