import {React, useState, useEffect} from 'react'
import Image2 from '../../assets/images/property/placeholder2.png'
import { getResidenceInfo, saveReview } from './api'
import { format } from 'date-fns'

function PastTripCard({trip}) {
    const [residence, setResidence] = useState(null)
    const [reviewCardVisible, setReviewCardVisible] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState(null)
    const submitReview = () => {
        //if the rating or review is null, then don't submit
        if(rating === 0 || review === null) {
            return
        }
        saveReview(trip._id, rating, review).then((data) => {
            console.log(data)
            setReviewCardVisible(false)
        })
    }

    const getReview = () => {
        return true
    }

    useEffect(() => {
        setResidence(trip.residence)
    }, [trip])

  return (
    <>
    {
        reviewCardVisible && getReview() && 
        //Pop up review card
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='flex flex-col bg-white mx-3 w-full sm:w-1/2 rounded-lg p-4 gap-2'>
                <div className='text-md font-bold'>Write a review</div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Overall rating</div>
                    <div className='flex gap-2'>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='1' defaultChecked={ trip.rating === 1}onChange={(e)=>setRating(e.target.value)}/>
                            <label>1</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='2' defaultChecked={ trip.rating === 2 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>2</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='3' defaultChecked={ trip.rating === 3 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>3</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='4' defaultChecked={ trip.rating === 4 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>4</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='5' defaultChecked={ trip.rating === 5 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>5</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='6' defaultChecked={ trip.rating === 6 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>6</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='7' defaultChecked={ trip.rating === 7 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>7</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='8' defaultChecked={ trip.rating === 8 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>8</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='9' defaultChecked={ trip.rating === 9 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>9</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='rating' value='10' defaultChecked={ trip.rating === 10 } onChange={(e)=>setRating(e.target.value)}/>
                            <label>10</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Review</div>
                    <textarea className='border border-gray-300 rounded-lg p-2' value={review === null ? trip.review : review} onChange={(e)=>setReview(e.target.value)}></textarea>
                </div>
                <div className='flex justify-end gap-5'>
                    <button className='bg-zinc-300 rounded-lg p-2' onClick={()=>setReviewCardVisible(false)}>Cancel</button>
                    <button className='bg-zinc-300 rounded-lg p-2' onClick={()=>submitReview()}>Submit</button>
                </div>
            </div>
        </div>
    }
    {residence !== null &&
        <div className='flex flex-col bg-zinc-300 rounded-lg p-4 gap-2'>
            <div className='w-full h-full flex'>
                <img src={residence.pictures[0].original ? residence.pictures[0].original : residence.pictures[0].thumbnail} alt='placeholder' onClick={()=>window.history.back()} className=' w-full rounded-xl h-40 md:h-48 lg:h-56'/>
            </div>
            <div className='text-sm'>{residence.type}</div>
            <div className='text-md font-bold'>{residence.title}</div>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Dates</div>
                    <div className='text-sm'>{` ${format(new Date(trip.checkInDate), 'dd MMMM')} - ${format(new Date(trip.checkOutDate), 'dd MMMM')} `}</div>
                </div>
                <div className='flex flex-col justify-end'>
                    <div className='text-md text-end font-bold underline'
                        onClick={()=>setReviewCardVisible(true)}
                    >Write a review</div>
                </div>
            </div>
        </div>
}
    </>
  )
}

export default PastTripCard