import React, { useEffect, useState } from 'react'
import LeftArrow from '../../assets/images/home/left.svg'
import Image1 from '../../assets/images/property/placeholder1.png'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { confirmBooking, getQuote } from './api'
import { ToastContainer, toast } from 'react-toastify'

function Book() {
    const location = useLocation();
    const navigate = useNavigate();
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [residence, setResidence] = useState(null);
    const [totalNights, setTotalNights] = useState(null);
    const [quote, setQuote] = useState(null);



    useEffect(() => {
        const setBookingData = () => {
            console.log(location.state)
            setResidence(location.state.residence)
        }

        getQuote(location.state.residence, location.state.startDate, location.state.endDate).then((data) => {
            if(data.status === 200) {
                console.log(data.quote)
                setQuote(data.quote)
                setTotalNights(
                    Math.round(
                        (new Date(data.quote.checkOutDateLocalized) - new Date(data.quote.checkInDateLocalized)) / (1000 * 60 * 60 * 24)
                    )
                )
            }else{
                toast.error('Something went wrong')
            }

        })
        location.state ? setBookingData() : navigate('*');
    }, [location.state, navigate]);

    const handleBooking = () => {

        // API call to book the residence
        confirmBooking(residence, quote, quote.checkInDateLocalized, quote.checkOutDateLocalized,{
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com'
        }).then((data) => {
            if(data.status === 201) {
                setConfirmVisible(true);
                setConfirmTitle('Booking Confirmed');
                setConfirmMessage("Thank you for booking with us")
            setTimeout(() => {
                setConfirmVisible(false);
            }, 2000);
            }
            else{
                setConfirmVisible(true);
                setConfirmTitle('Booking Failed');
                setConfirmMessage("Please try again later")
            setTimeout(() => {
                setConfirmVisible(false);
            }, 2000);
            }
        })
    }

    return (
    
    <div className='min-h-screen flex flex-col w-full justify-between'>
        <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbar />
        }
        </div>
        {
            confirmVisible && <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-filter backdrop-blur-md'>
                <div className='w-full mx-5 md:mx-0 md:w-1/2 h-min bg-white rounded-lg flex flex-col justify-center items-center py-5'>
                    <div className='text-2xl font-bold'>{confirmTitle}</div>
                    <div className='text-lg font-bold'>{confirmMessage}</div>
                </div>
            </div>
        }
        {residence && quote !== null && totalNights ? <div>
         <div className='flex w-full h-full bg-white shadow-lg justify-between  md:mt-16 '>
            <div className='w-10 h-full' onClick={()=>{
                window.history.back();
            }}>
                <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='text-lg text-center font-bold '>Confirm Booking</div>
            </div>
        </div>
        <div className='w-full flex justify-center container mx-auto'>
        <div className='w-full md:w-2/3 lg:1/2 '>
        <div className='flex sm:flex justify-start gap-5 p-5  w-full'>
            <div className='h-40 '>
                <img src={residence.pictures[0].original ? residence.pictures[0].original : residence.pictures[0].thumbnail} alt='left arrow' className='sm:w-80 h-full rounded-lg'/>
            </div>
            <div className=' p-2 w-1/2'>
                <div className='text-sm'>{residence.roomType}</div>
                <div className='text-lg font-bold'>{residence.title}</div>
                <div className='text-[10px] text-ellipsis text-overflow:hidden line-clamp-3'>{residence.description}</div>
            </div>

            
        </div>
        <div className='h-1 my-5 '>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>

        <div className='px-4 '>
            <div className='text-lg font-bold pb-4'>Your Trip</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Date</div>
                    <div className='text-sm'>{format(new Date(quote.checkInDateLocalized), 'dd MMMM') + ' - ' + format(new Date(quote.checkOutDateLocalized), 'dd MMMM')}</div>
                </div>
                <div className='text-md font-bold underline'>Edit</div>
            </div>

            <div className='flex justify-between items-center pt-5'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>Guests</div>
                    <div className='text-sm'>{quote.guestsCount}</div>
                </div>
                <div className='text-md font-bold underline'>Edit</div>
            </div>
        </div>

        <div className='h-1 my-5 '>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div>

        <div className='px-4 flex flex-col gap-2 '>
            <div className='text-lg font-bold pb-4'>Price Details</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`£ ${quote.rates.ratePlans[0].days[0].price} x ${totalNights} Nights`}</div>
                </div>
                <div className='text-sm'>{`£ ${quote.rates.ratePlans[0].ratePlan.money.fareAccommodationAdjusted}`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Special Offer`}</div>
                </div>
                <div className='text-sm'>{`-£ 0`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Cleaning Fees`}</div>
                </div>
                <div className='text-sm'>{`£ ${quote.rates.ratePlans[0].ratePlan.money.fareCleaning}`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Hospitality Fees`}</div>
                </div>
                <div className='text-sm'>{`£ ${quote.rates.ratePlans[0].ratePlan.money.fareHospitality? quote.rates.ratePlans[0].ratePlan.money.fareAccommodationAdjusted : 0}`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{`Taxes`}</div>
                </div>
                <div className='text-sm'>{`$ ${quote.rates.ratePlans[0].ratePlan.money.totalTaxes}`}</div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='text-sm font-bold'>{`Total(GBP)`}</div>
                </div>
                <div className='text-sm font-bold'>{`£ ${quote.rates.ratePlans[0].ratePlan.money.hostPayout}`}</div>
            </div>
        </div>

        <div className='flex flex-grow justify-center items-end'>
            <button className='w-1/2 h-10 mt-6 mb-12 text-white bg-black hover:scale-105 transition duration-75 rounded-lg max-w-[400px]' onClick={()=>handleBooking()}>Confirm</button>
        </div>
        </div>
        </div>
        </div> :
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black'></div>
            </div>
        }
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
  )
}

export default Book