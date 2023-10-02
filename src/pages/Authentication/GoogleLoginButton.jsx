import React from 'react'
import { sendGoogleCode } from './api';
import GoogleLogo from "../../assets/images/login/google_logo.svg";
import { useGoogleLogin } from '@react-oauth/google';


function GoogleLoginButton({returnData}) {
    
    const login = useGoogleLogin({
        onSuccess: response => sendGoogleCode(response).then((res) => {
            console.log(res)
            returnData(res)
        }),
      });
  return (
    <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0"
    onClick={()=>login()}
  >
    <div class="w-full relative h-full z-0 flex">
      <button className="w-full text-center self-center text-black flex justify-center items-center">
        Continue with Google
      </button>

      <div class="absolute inset-y-0 left-0 z-10 self-start">
        <div class="flex h-full items-center justify-center">
          <img
            src={GoogleLogo}
            alt="Google Logo"
            className="pl-4 pt-3 self-start z-10"
          ></img>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GoogleLoginButton