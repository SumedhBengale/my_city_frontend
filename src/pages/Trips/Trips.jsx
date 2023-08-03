import {React, useEffect, useState} from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import PastTripCard from './PastTripCard'
import UpcomingTripCard from './UpcomingTripCard'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import { getPastTrips, getUpcomingTrips } from './api'

function Trips() {
    const [upcomingTrips, setUpcomingTrips] = useState([])
    const [pastTrips, setPastTrips] = useState([])
    useEffect(() => {
        getUpcomingTrips().then((upcomingData) => {
            setUpcomingTrips(upcomingData.upcomingTrips)
            console.log(upcomingData.upcomingTrips)
            getPastTrips().then((pastData) => {
                setPastTrips(pastData.pastTrips)
            })
        },

        )
    }, [])
        const [selected, setSelected] = useState('upcoming')
    return (
        <>
        <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbar />
        }
        </div>

                 <div className='flex w-full h-full bg-white shadow-lg justify-between md:mt-16 container mx-auto'>
                        <div className='w-10 h-full'>
                                <img src={LeftArrow} alt='left arrow' onClick={()=>window.history.back()} className='w-6 h-6 m-3'/>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                                <div className='text-lg text-center font-bold '>Trips</div>
                        </div>
                </div>
             <div className='flex justify-center mt-3 md:hidden'>

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

             <div className='md:block hidden container mx-auto'>
                <div className='flex gap-10 m-5'>
                    <div className={`w-min px-5 py-1 rounded-2xl ${selected === 'upcoming' ? 'bg-black': 'bg-transparent  border border-black'}`}>
                    <div className={`text-center w-full text-md font-bold 
                        ${selected === 'upcoming' ? 'text-white' : 'text-black'}`}
                        onClick={() => setSelected('upcoming')}
                        >Upcoming</div>
                    </div>

                    <div className={`w-min px-5 py-1 rounded-2xl ${selected === 'past' ? 'bg-black': 'bg-transparent  border border-black'}`}>
                    <div className={`text-center w-full text-md font-bold 
                        ${selected === 'past' ? 'text-white' : 'text-black'}`}
                        onClick={() => setSelected('past')}
                        >Past</div>
                    </div>
                </div>
             </div>
            <div className='container mx-auto'>
                {selected === 'upcoming' ?
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-5'>
                    {
                    upcomingTrips.length > 0
                    ? upcomingTrips.map((trip) => (
                        <UpcomingTripCard trip={trip}></UpcomingTripCard>
                    )) :
                    <div className='flex justify-center items-center h-96 col-span-full'>
                        <div className='text-2xl text-center font-bold'>No Upcoming Trips</div>
                    </div>
                    }


                </div>
                :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-5'>
                    {pastTrips.length > 0
                     ? pastTrips.map((trip) => (
                        <PastTripCard trip={trip}></PastTripCard>
                    )) :
                    <div className='flex justify-center items-center h-96 col-span-full'>
                        <div className='text-2xl text-center font-bold'>No Past Trips</div>
                    </div>
                    }
                </div>
                }
            </div>
        </>
    )
}

export default Trips