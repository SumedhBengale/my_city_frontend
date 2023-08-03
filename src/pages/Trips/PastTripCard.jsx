import {React, useState, useEffect} from 'react'
import Image2 from '../../assets/images/property/placeholder2.png'
import { getResidenceInfo } from './api'
import { format } from 'date-fns'

function PastTripCard({trip}) {
    const [residence, setResidence] = useState(null)

    useEffect(() => {
        getResidenceInfo(trip.residenceId).then((data) => {
            console.log(data.residence)
            setResidence(data.residence)
        })
    }, [trip])

  return (
    <>
    {residence !== null &&
        <div className='flex flex-col bg-zinc-300 rounded-lg p-4 gap-2'>
            <div className='w-full h-full flex'>
                <img src={residence.images[0]} alt='placeholder' onClick={()=>window.history.back()} className=' w-full rounded-xl h-40 md:h-48 lg:h-56'/>
            </div>
            <div className='text-sm'>{residence.type}</div>
            <div className='text-md font-bold'>{residence.title}</div>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Dates</div>
                    <div className='text-sm'>{` ${format(new Date(trip.checkInDate), 'dd MMMM')} - ${format(new Date(trip.checkOutDate), 'dd MMMM')} `}</div>
                </div>
                <div className='flex flex-col justify-end'>
                    <div className='text-md text-end font-bold underline'>Write a review</div>
                </div>
            </div>
        </div>
}
    </>
  )
}

export default PastTripCard