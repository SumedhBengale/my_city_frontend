//Email verificaton page that will take verificationToken from the URL and send it to the backend to verify the user

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword, verifyPasswordToken } from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";


function ResetPassword() {
    //Get the verification token from last part of the url
    const { id } = useParams();
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        
        try {
            const response = await verifyPasswordToken(id);
            if (response.status === 200) {
                setAllowed(true);
                //only 1 toast can be shown at a time
                setLoading(false);
            } else {
                toast.error('An error occurred while verifying your reset token');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while verifying your reset token');
            setLoading(false);
        }
    }

    useEffect(() => {
        checkToken();
    }
    , []);

    return (
        <div className='w-full h-screen'>
        {!loading ? <div className="w-full flex justify-center items-center h-full">
                {allowed ? (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div className="mb-4">
                            <h1 className="text-center text-2xl font-bold">Reset Your Password</h1>
                        </div>
                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={Yup.object({ 
                                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                                confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Confirm Password is required'),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const response = await resetPassword(id, values.password);
                                    if (response.status === 200) {
                                        toast.success('Your password has been reset successfully');
                                        setSubmitting(false);
                                        setTimeout(() => {
                                            //Navigate to login but replace the current page with / route
                                            navigate('/login', { replace: true,state: { from: 'resetPassword' } });
                                        }, 2000);
                                    } else {
                                        toast.error('An error occurred while resetting your password');
                                        setSubmitting(false);
                                    }
                                } catch (error) {
                                    console.log(error);
                                    toast.error('An error occurred while resetting your password');
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <Field
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <Field
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic" />
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <button className="h-12 w-48 bg-primary hover:bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer rounded-lg" type="submit" disabled={isSubmitting}>
                                            Reset Password
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : (
                    <div>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <div className="mb-4">
                                <h1 className="text-center text-2xl font-bold">Failed to Validate Your Reset Token</h1>
                            </div>
                            <div className="mb-4">
                                <p className="text-center">Your Password could not be reset. Please try again, or contact our support.</p>
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

export default ResetPassword;