//A basic login Page with a form and a submit button

import React from 'react'
import { login } from './api'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = async (e) => {
        await login(email, password).then((response) => {
            console.log(response)
            if(response.status === 200){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userType', response.data.userType);
                navigate('/admin')
            }
        })
    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='flex justify-center items-center'>
            <form className='flex flex-col justify-center items-center'
                onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <div className='text-2xl font-bold mb-5'>Admin Login</div>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='flex flex-col justify-center items-center'>
                        {/* <label className='text-xl font-semibold'>Email</label> */}
                        <input className='border-2 border-gray-400 rounded-md p-2 w-80' type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        {/* <label className='text-xl font-semibold'>Password</label> */}
                        <input className='border-2 border-gray-400 rounded-md p-2 w-80' type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <button className='bg-white border border-black  hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded-lg mt-5'
                    type='submit'
                    >Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login