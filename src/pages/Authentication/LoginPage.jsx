import React from 'react';
import loginBackground from '../../assets/images/login/login_background.jpg';
import Logo from '../../assets/images/white_logo.png';
import GoogleLogo from '../../assets/images/login/google_logo.svg';
import FacebookLogo from '../../assets/images/login/facebook_logo.svg';
import EmailLogo from '../../assets/images/login/email_logo.svg';


const LoginPage = () => {
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
            <div className=" w-full h-80 p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md"> {/* Blur Rectangle */}
                <div className="WelcomeBack text-white text-[18px] font-bold">Welcome Back</div>
                <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='text' placeholder='Email'>
                    {/* Email Input */}
                </input>
                <input className=" max-w-lg w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Password'>
                    {/* Password Input */}
                </input>
                {/*Forgot Password Link */}
                <div className="flex justify-end items-center mt-4">
                    <div className="text-white underline">Forgot Password?</div>
                </div>
                <div className=" max-w-lg w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black" type='text' placeholder='Email'>Login</div>
            </div>


            <div class="flex items-center w-full py-4"> {/* Divider */}
                <hr className=" w-full border-sm my-4" />
                <span class="flex-shrink text-lg text-white px-4 italic font-light">or</span>
                <hr className="w-full border-sm my-4" />
            </div>

            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
            <div class="w-full relative h-full z-0 flex">
                <div className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Facebook</div>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                    <div class="flex h-full items-center justify-center">
                        <img src={FacebookLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                    </div>
                </div>
            </div>
            </div>
            
            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
            <div class="w-full relative h-full z-0 flex">
                <div className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Google</div>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                    <div class="flex h-full items-center justify-center">
                        <img src={GoogleLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                    </div>
                </div>
            </div>
            </div>

            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
            <div class="w-full relative h-full z-0 flex">
                <div className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Email</div>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                    <div class="flex h-full items-center justify-center">
                        <img src={EmailLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;