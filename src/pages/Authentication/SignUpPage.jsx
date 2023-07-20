import {React, useState} from 'react'
import loginBackground from '../../assets/images/login/login_background.png';
import Logo from '../../assets/images/white_logo.png';
import { NavLink } from 'react-router-dom';
import { signup } from './api';

function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const validate = () => {
        //The email must not be empty and have a max of 50 characters and must be in a valid format
        if(email === '' || email.length > 50 || !email.includes('@') || !email.includes('.')){
            alert("Invalid Email")
            return false
        }
        //The username must not be between 3 and 20 character
        if(username === '' || username.length < 3 || username.length > 20){
            alert("Invalid Username")
            return false
        }
        //password must have a min length of 6
        if(password === '' || password.length < 6){
            alert("Invalid Password")
            return false
        }
        
        return true
    }
    const handleSignUp = async () => {
        const valid = validate();
        valid === true ? await signup(username, email, password).then((response)=>{
            if(response.status === 200){
                //Save token to local storage
                localStorage.setItem('token', response.token)
                console.log("Set Item")
                //navigate('/')
                console.log("Navigated")
            }else if(response.status === 409){
                console.log("User already exists")
            }else if(response.status === 201){
                console.log("User created successfully")
            }
            else{
                console.log(response)
                console.log("Error")
            }}).catch((error)=>{
                console.log(error)
        }) : console.log("Invalid")
    }

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
                <div className='mx-4 sm:w-2/3 md:w-1/2 xl:w-1/3'>
                <img src={Logo} alt='My City Logo' className='w-48 self-start mb-5'></img>
                <div className=" w-full h-min p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md"> {/* Blur Rectangle */}
                    <div className="WelcomeBack text-white text-[18px] font-bold">Hello There!</div>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}>
                        {/* Email Input */}
                    </input>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}>
                        {/* Username Input */}
                    </input>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}>
                        {/* Password Input */}
                    </input>
                    <input className="w-full h-12 mt-4 px-2 bg-white rounded-lg" type='password' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}>
                        {/* Confirm Password Input */}
                    </input>
                    {/*Forgot Password Link */}
                    <div className="flex justify-end items-center mt-4 text-white">
                       <div>Already have an account?</div><NavLink to='/login' className='underline pl-2'>Login</NavLink>
                    </div>
                    <div className="w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black" type='text' onClick={()=>password === confirmPassword ? handleSignUp():alert("Passwords Different")}>Sign Up</div>
                </div>
    
    
                
            </div>
            </div>
        </div>
      );
}

export default SignUp