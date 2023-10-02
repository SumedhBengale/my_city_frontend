import React, { useEffect } from "react";
import FacebookLogo from "../../assets/images/login/facebook_logo.svg";
import { useFacebook, useLogin } from "react-facebook";
import { sendFacebookData } from "./api";

function FacebookLoginButton({ returnData, FacebookAppId, returnToast }) {
  const { login, status, isLoading, error } = useLogin();

  return (
    <div
      className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0"
      onClick={async () => {
        try {
          const response = await login({
            scope: "email",
          });
          sendFacebookData(response).then((res) => {
            returnData(res);
          });
        } catch (error) {
          console.log(error.message);
          returnToast("Something went wrong");
        }
      }}
    >
      <div class="w-full relative h-full z-0 flex">
        <button className="w-full text-center self-center text-black flex justify-center items-center">
          {isLoading ? (
            //Circular Progress
            <div class="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          ) : (
            "Continue with Facebook"
          )}
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
  );
}

export default FacebookLoginButton;
