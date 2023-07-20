import {React, useState} from 'react';
import loginBackground from '../../assets/images/login/login_background.jpg';
import Logo from '../../assets/images/white_logo.png';
import GoogleLogo from '../../assets/images/login/google_logo.svg';
import FacebookLogo from '../../assets/images/login/facebook_logo.svg';
import EmailLogo from '../../assets/images/login/email_logo.svg';
import { useNavigate } from 'react-router-dom';
import {login} from './api'

const LoginPage = () => {
    const navigate = useNavigate();
    //email and password controllers
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className='w-full flex justify-center items-center h-full'>
            <div className='mx-4 md:w-1/2 xl:w-1/3'>
                <img src={Logo} alt='My City Logo' className='w-48 self-start mb-5'></img>
                <div className="w-full h-80 p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md"> {/* Blur Rectangle */}
                    <div className="WelcomeBack text-white text-[18px] font-bold">Welcome Back</div>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}>
                        {/* Email Input */}
                    </input>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}>
                        {/* Password Input */}
                    </input>
                    {/*Forgot Password Link */}
                    <div className="flex justify-end items-center mt-4">
                        <div className="text-white underline">Forgot Password?</div>
                    </div>
                    <button className="w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black" onClick={async ()=>{
                        console.log("clicked")
                        await login(email, password).then((response)=>{
                            if(response.status === 200){
                                //Save token to local storage
                                localStorage.setItem('token', response.token)
                                console.log("Set Item")
                                navigate('/')
                                console.log("Navigated")
                            }
                            else if(response.status === 404){
                                console.log("User not Found")
                            }else if(response.status === 401){
                                console.log("Incorrect Password")
                            }
                            else{
                                console.log(response.status)
                                console.log("Error")
                            }}).catch((error)=>{
                                console.log(error)
                            })}}
                            >Login</button>
                </div>


                <div class="flex items-center w-full py-4"> {/* Divider */}
                    <hr className=" w-full border-sm my-4" />
                    <span class="flex-shrink font-custom font-bold text-lg text-white px-4 italic font-light">or</span>
                    <hr className="w-full border-sm my-4" />
                </div>

                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Facebook</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={FacebookLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>
                
                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Google</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={GoogleLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>

                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center' onClick={()=>navigate('/signup')}>SignUp with Email</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={EmailLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;