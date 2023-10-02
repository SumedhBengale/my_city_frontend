import React, { useState } from "react";
import { sendGoogleCode } from "./api";
import GoogleLogo from "../../assets/images/login/google_logo.svg";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleLoginButton({ returnData, returnToast }) {
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (response) =>
      sendGoogleCode(response).then((res) => {
        console.log(res);
        returnData(res);
        setLoading(false);
      }),
    onError: (error) => {
      console.log(error);
      setLoading(false);
      returnToast("Something went wrong");
    },
  });
  return (
    <div
      className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0"
      onClick={() => {
        setLoading(true);
        login();
      }}
    >
      <div class="w-full relative h-full z-0 flex">
        <button className="w-full text-center self-center text-black flex justify-center items-center">
          {loading ? (
            //Circular Progress
            <div class="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          ) : (
            "Continue with Google"
          )}
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
  );
}

export default GoogleLoginButton;
