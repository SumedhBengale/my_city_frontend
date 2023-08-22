import { React , useState, useEffect} from 'react'
import Image2 from '../../assets/images/property/placeholder2.png'
import Chat from '../../assets/images/trips/chat.svg'
import { format } from 'date-fns'

function UpcomingTripCard({trip}) {
    const [residence, setResidence] = useState(null)

    useEffect(() => {
        setResidence(trip.residence)
    }, [trip])
  return (
  <>
    {residence !== null &&
        <div className='flex flex-col bg-zinc-300 rounded-lg p-4 gap-2'>
            <div className='w-full h-full flex'>
                <img src={residence.pictures[0].original? residence.pictures[0].original : residence.pictures[0].thumbnail} alt='left arrow' className=' w-full rounded-xl h-40 md:h-48 lg:h-56'/>
            </div>
            <div className='text-sm'>{residence.type}</div>
            <div className='text-md font-bold'>{residence.title}</div>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Dates</div>
                    <div className='text-sm'>{` ${format(new Date(trip.checkInDate), 'dd MMMM')} - ${format(new Date(trip.checkOutDate), 'dd MMMM')} `}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-md text-end font-bold underline'>Edit</div>
                    <div className='flex'>
                        <img src={Chat} alt='chat' className='w-5 h-5'/>
                        <div className='text-sm pl-2'>Chat with us</div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default UpcomingTripCard