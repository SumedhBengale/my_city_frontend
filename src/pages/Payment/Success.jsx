import React, { useEffect, useState } from "react";
import { sendSuccessfulPayment } from "./api";
import { useNavigate } from "react-router-dom";

function Success() {
  //Get the parameters from the URL
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntent = urlParams.get("payment_intent");
  const paymentStatus = urlParams.get("redirect_status");
  const quoteId = urlParams.get("quoteId");
  const [confirmed, setConfirmed] = React.useState(false);
  console.log(paymentIntent);
  console.log(paymentStatus);
  console.log(quoteId);
  //Send the paymentIntent and paymentStatus to your backend to verify
  //the payment intent and update the payment status in your database

  sendSuccessfulPayment(paymentIntent, paymentStatus, quoteId).then((res) => {
    if (res.response.status === "confirmed") {
      setConfirmed(true);
      //Navigate to the trips page after 10 seconds
      localStorage.setItem("paymentActive", false);
      setTimeout(() => {
        //Navigate and do not allow the user to go back to the payment page
        navigate("/trips", { replace: true });
      }, 10000);
      //Disable going back to the payment page
    }
  });
  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center text-center">
        {paymentStatus === "succeeded" ? (
          <div>
            <div className="text-3xl text-primary font-custom-kiona capitalize">
              Payment Successful
            </div>
          </div>
        ) : (
          <div>
            <div className="text-3xl text-primary font-custom-kiona capitalize">
              Payment Failed
            </div>
          </div>
        )}
        {confirmed ? (
          <div>
            <div className="text-xl text-primary font-custom-kiona capitalize">
              Reservation Confirmed
            </div>
            <div className="text-xl text-primary font-custom-kiona capitalize">
              Redirecting in 10 seconds...
            </div>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xl text-primary font-custom-kiona capitalize">
              Reservation Not Confirmed
            </div>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Success;
