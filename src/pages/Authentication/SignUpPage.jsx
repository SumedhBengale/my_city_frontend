import React from 'react'
import loginBackground from '../../assets/images/login/login_background.jpg';
import Logo from '../../assets/images/white_logo.png';
import { NavLink } from 'react-router-dom';

function SignUp() {
    return (
    
        <div
          style={{
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
          }}
        > {/* Background Image */}
    
            <div className='flex flex-col justify-center items-center mx-4 h-full'>
                <img src={Logo} alt='My City Logo' className='w-48 self-start mb-5'></img>
                <div className=" w-full h-min p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md"> {/* Blur Rectangle */}
                    <div className="WelcomeBack text-white text-[18px] font-bold">Hello There!</div>
                    <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='email' placeholder='Email'>
                        {/* Email Input */}
                    </input>
                    <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='text' placeholder='Username'>
                        {/* Username Input */}
                    </input>
                    <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Password'>
                        {/* Password Input */}
                    </input>
                    <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Confirm Password'>
                        {/* Confirm Password Input */}
                    </input>
                    {/*Forgot Password Link */}
                    <div className="flex justify-end items-center mt-4 text-white">
                       <div>Already have an account?</div><NavLink to='/login' className='underline pl-2'>Login</NavLink>
                    </div>
                    <div className=" max-w-lg w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black" type='text'>Sign Up</div>
                </div>
    
    
                
            </div>
        </div>
      );
}

export default SignUp