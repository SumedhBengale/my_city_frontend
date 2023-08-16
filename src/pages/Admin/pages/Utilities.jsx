import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { upcomingTripsToPastTrips } from '../../Trips/api';

function Utilities() {

    const handleConvert = () => {
        upcomingTripsToPastTrips().then((res) => {
            console.log(res)
            if (res.status === 200) {
                toast.success("Successfully converted Old Trips to Past Trips!")
            } else {
                toast.error("Failed to convert upcoming trips to past trips!")
            }
        })
    }

  return (
    <>
    <div className='flex flex-col justify-center gap-5 relative'>
        <div className='text-2xl font-bold text-center '>Utilities</div>
            <div className='flex justify-start mx-5'>
                <button className='flex  justify-center sm:justify-start cursor-pointer'
                onClick={()=>handleConvert()}
                >
                <div className='text-2xl font-bold p-4 w-full sm:w-56 h-min bg-primary rounded-lg'>
                    <div className='flex flex-col justify-center items-center h-full'>
                        <div className='text-xl font-bold capitalize text-center text-white'>Convert Past Trips</div>
                        </div>
                    </div>
                </button>
            </div>
      </div>
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
    </>
  )
}

export default Utilities