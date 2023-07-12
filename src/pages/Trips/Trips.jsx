import {React, useState} from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import PastTripCard from './PastTripCard'
import UpcomingTripCard from './UpcomingTripCard'

function Trips() {
        const [selected, setSelected] = useState('upcoming')
    return (
        <>
                 <div className='flex w-full h-full bg-white shadow-lg justify-between'>
                        <div className='w-10 h-full'>
                                <img src={LeftArrow} alt='left arrow' onClick={()=>window.history.back()} className='w-6 h-6 m-3'/>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                                <div className='text-lg text-center font-bold '>Trips</div>
                        </div>
                </div>
             <div className='flex justify-center mt-3'>

                        <div className={`text-center w-full text-md font-bold 
                        ${selected === 'upcoming' ? 'text-black' : 'text-gray-400'}`}
                        onClick={() => setSelected('upcoming')}
                        >Upcoming</div>

                        <div className='h-full w-[2px] mx-2'>
                                <hr className='w-[2px] h-[32px] bg-black'></hr>
                        </div>

                        <div className={`text-center w-full text-md font-bold 
                        ${selected === 'past' ? 'text-black' : 'text-gray-400'}`}
                        onClick={() => setSelected('past')}
                        >Past</div>


             </div>

             {selected === 'upcoming' ?
            <div className='flex flex-col gap-5 mx-5 my-5'>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>
                <UpcomingTripCard></UpcomingTripCard>

            </div>
            :
            <div className='flex flex-col gap-5 mx-5 my-5'>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
                <PastTripCard></PastTripCard>
            </div>
            }
        </>
    )
}

export default Trips