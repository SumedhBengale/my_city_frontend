import React, { useEffect, useState, useRef } from "react";
import FrequentQuestionsSection from "../HomePage/FrequentQuestionsSection";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import Footer from "../HomePage/Footer";
import { useNavigate } from "react-router-dom";
import { getAccount, deleteAccount } from "./api";
import { sendResetPasswordLink } from "../Authentication/api";
import { ToastContainer, toast } from "react-toastify";


function AccountPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [deleteAccountDialogVisible, setDeleteAccountDialogVisible] = useState(false);
  const deleteDialogRef = useRef(null);
  useEffect(() => {
    getAccount()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAccount(res.data);
        }
      })
      .catch((err) => {});
  }, []);

  const handleResetPassword = async () => {
    try{
      const response = await sendResetPasswordLink(account.email);
      if(response.status === 200){
        toast.success("Password Reset Email Sent");
      }else if(response.status === 404){
        toast.error("User not Found");
      }else{
        toast.error("Something went wrong");
      }
    }
    catch(error){
      console.log(error);
      toast.error("An error occurred while processing your request");
    }
  }

  const deletePermanently = async () => {
    try{
      const response = await deleteAccount();
      if(response.status === 200){
        toast.success("Account Deleted");
        localStorage.removeItem("token");
        //wait for 2 seconds before redirecting to login page
        setTimeout(() => {
        navigate("/login");
        }, 2000);
      }else if(response.status === 404){
        toast.error("User not Found");
      }else{
        toast.error("Something went wrong");
      }
    }
    catch(error){
      console.log(error);
      toast.error("An error occurred while processing your request");
    }
  }

  return (
    <>
      {deleteAccountDialogVisible && (
        <div
        className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-40 backdrop-filter backdrop-blur-sm"
        //when clicked outside the dialog, close
        onClick={(e) => {
          if (
            deleteDialogRef.current && !deleteDialogRef.current.contains(e.target)
          ) {
            setDeleteAccountDialogVisible(false);
          }
        }}
      >
        <div className="absolute h-screen w-screen bg-black/40 z-30"></div>
      <div className="uppercase z-40 h-full w-full sm:w-1/2 md:w-1/3">
        <div className="flex flex-col mx-5 mb-10 justify-center items-center h-full">
          <div className=" px-4 py-5 bg-white overflow-scroll no-scrollbar h-min rounded-lg w-full"         
          ref={deleteDialogRef}>
          <div className="text-2xl font-custom-kiona text-primary px-2 pb-4">Delete Your Account</div>
          <div className="text-base font-custom-kiona text-primary px-2 pb-4">Are you sure you want to delete your account? This action cannot be undone.</div>
          <div className="flex w-full justify-center">
            <button className="bg-red-400 text-white font-custom-kiona text-base 2xl:text-xl px-5 py-2 rounded-lg uppercase hover:scale-105 transition duration-75"
            onClick={()=>deletePermanently()}
            >Delete Permanently</button>
          </div>
          </div>
        </div>
      </div>
      </div>
    )}
    <div className='flex flex-col justify-between h-screen'>
      <div className="hidden md:block z-20 fixed top-0 w-full">
        {<DesktopNavbarBlack />}
      </div>
      <div className="flex flex-col h-full justify-between md:mt-16">
        <div className="h-full">
        <div className="flex w-full h-12 bg-white shadow-lg justify-between gap-5">
            <div
              className="w-10 flex items-center h-full pl-5"
              onClick={() => window.history.back()}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M16.15 3.125C15.725 3.125 15.325 3.325 15.1 3.55L7.70005 11.05C7.40005 11.35 7.30005 11.775 7.30005 12.175C7.30005 12.6 7.40005 13.025 7.70005 13.325L15.1 21.35C15.425 21.675 15.725 21.875 16.15 21.875C16.575 21.875 16.975 21.775 17.3 21.45C17.6 21.15 17.825 20.725 17.825 20.3C17.825 19.9 17.7 19.475 17.3 19.175L10.95 12.175L17.3 5.625C17.5 5.425 17.7 5.1 17.7 4.675C17.7 4.275 17.6 3.85 17.3 3.55C16.875 3.225 16.575 3.125 16.15 3.125Z"
                    fill="#1F2937"
                  />
                </g>
              </svg>
            </div>
            <div className="w-full flex items-center justify-start">
              <div className="text-lg text-center text-primary font-bold ">
                Your Account
              </div>
            </div>
          </div>
          {account !== null ?<div className="container mx-auto my-10">
            <div className="flex flex-col gap-5">

              <div className="flex flex-col">
                <label className="text-primary text-lg 2xl:text-2xl">Email</label>
                <div className="text-primary text-base 2xl:text-xl">{account?.email}</div>
              </div>

              <div className="flex flex-col">
                <label className="text-primary text-lg 2xl:text-2xl">Username</label>
                <div className="text-primary text-base 2xl:text-xl">{account?.userName}</div>
              </div>

              <div className="flex flex-col">
                <label className="text-primary text-lg 2xl:text-2xl">Account Created On</label>
                <div className="text-primary text-base 2xl:text-xl">{
                  new Date(account?.createdAt).toLocaleDateString()
                }</div>
              </div>

              <div className="flex flex-row gap-5 w-full justify-between sm:justify-start">
                <button className="bg-primary text-white font-custom-kiona text-base 2xl:text-xl px-5 py-2 rounded-lg uppercase hover:scale-105 transition duration-75"
                onClick={()=>handleResetPassword()}
                disabled={account === null}
                >Change Password</button>
                <button className="bg-red-400 text-white font-custom-kiona text-base 2xl:text-xl px-5 py-2 rounded-lg uppercase hover:scale-105 transition duration-75"
                onClick={()=>setDeleteAccountDialogVisible(true)}
                >Delete Account</button>
              </div>
            </div>
          </div>
          :
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
        </div>
      </div>
      <div className="h-min">
        <Footer></Footer>
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
    </>
  );
}

export default AccountPage;
