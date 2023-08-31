//Email verificaton page that will take verificationToken from the URL and send it to the backend to verify the user

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmail } from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmailVerification() {
    //Get the verification token from last part of the url
    const { id } = useParams(); 
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkVerification = async () => {
        
        try {
            const response = await verifyEmail(id);
            if (response.status === 200) {
                setVerified(true);
                //only 1 toast can be shown at a time

                setLoading(false);
            } else {
                toast.error('An error occurred while verifying your email');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while verifying your email');
            setLoading(false);
        }
    }

    useEffect(() => {
        checkVerification();
    }
    , []);

    return (
        <div className='w-full h-screen'>
        {!loading ? <div className="w-full flex justify-center items-center h-full">
                {verified ? (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div className="mb-4">
                            <h1 className="text-center text-2xl font-bold">Email Verified</h1>
                        </div>
                        <div className="mb-4">
                            <p className="text-center">Your email has been verified. You can now login.</p>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/login'}>Login</button>
                    </div>
                ) : (
                    <div>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <div className="mb-4">
                                <h1 className="text-center text-2xl font-bold">Email Verification Failed</h1>
                            </div>
                            <div className="mb-4">
                                <p className="text-center">Your email could not be verified. Please try again, or contact our support.</p>
                            </div>
                        </div>

                    </div>
                )}
                    <ToastContainer
                        limit={1}
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
        :
        <div className="w-full flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>    
    }
        </div>
    );
}

export default EmailVerification;