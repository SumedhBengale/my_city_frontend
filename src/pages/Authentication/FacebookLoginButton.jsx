import React from 'react'
import FacebookLogo from "../../assets/images/login/facebook_logo.svg";

function FacebookLoginButton() {
  return (
    <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0">
              <div class="w-full relative h-full z-0 flex">
                <button className="w-full text-center self-center text-black flex justify-center items-center">
                  Continue with Facebook
                </button>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                  <div class="flex h-full items-center justify-center">
                    <img
                      src={FacebookLogo}
                      alt="Google Logo"
                      className="pl-4 pt-3 self-start z-10"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default FacebookLoginButton