import React from 'react';
import loginBackground from '../../assets/images/login/login_background.png';
import Logo from '../../assets/images/white_logo.png';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from './api';

function SignUp() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters').required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });
      

    const handleSubmit = async (values) => {
      try {
        const response = await signup(values.username, values.email, values.password);
        if (response.status === 409) {
            console.log(response);
          toast.error('User already exists');
        } else if (response.status === 200) {
          console.log(response)
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('userType', response.userType);
          toast.success('User created successfully');
          //Wait for 1 second before redirecting
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
          console.log(response);
          toast.error(response);
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred while processing your request');
      }
    };
  
    return (
      <div
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className="w-full flex justify-center items-center h-full">
          <div className="mx-4 sm:w-2/3 md:w-1/2 xl:w-1/3">
            <div className='flex justify-center items-center'>
                <img src={Logo} alt="My City Logo" className="w-48 self-start mb-5"></img>
            </div>
            <div className="w-full h-min p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md">
              <div className="WelcomeBack text-white text-[18px] font-bold">Hello There!</div>
              <Formik
                initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    name="email"
                    type="email"
                    className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
  
                  <Field
                    name="username"
                    type="text"
                    className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
  
                  <Field
                    name="password"
                    type="password"
                    className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
  
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
  
                  <div className="flex justify-end items-center mt-4 text-white">
                    <div>Already have an account?</div>
                    <NavLink to="/login" className="underline pl-2">
                      Login
                    </NavLink>
                  </div>
                  <button type="submit" className="w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black">
                    Sign Up
                  </button>
                </Form>
              </Formik>
            </div>
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
      </div>
    );
  }
  
  export default SignUp;