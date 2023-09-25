import React, { useEffect, useState } from "react";
import { sendSuccessfulPayment } from "./api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Success() {
  //Get the parameters from the URL
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntent = urlParams.get("payment_intent");
  const paymentStatus = urlParams.get("redirect_status");
  const quoteId = urlParams.get("quoteId");
  const [confirmed, setConfirmed] = useState(false);
  const [residence, setResidence] = useState(null);
  const [reservation, setReservation] = useState(null);
  console.log(paymentIntent);
  console.log(paymentStatus);
  console.log(quoteId);
  //Send the paymentIntent and paymentStatus to your backend to verify
  //the payment intent and update the payment status in your database
  useEffect(() => {
    if (paymentIntent && paymentStatus) {
      
  sendSuccessfulPayment(paymentIntent, paymentStatus, quoteId).then((res) => {
    if (res.response.status === "confirmed") {
      console.log("RESPONSE",res)
      setConfirmed(true);
      setResidence(res.residence);
      setReservation(res.response);

      //Navigate to the trips page after 10 seconds
      localStorage.setItem("paymentActive", false);
    }
  });
}
  }, [paymentIntent, paymentStatus, quoteId]);

  return (
    <>
          <div className="flex w-full h-12 bg-white shadow-lg justify-start items-center gap-5">
            <div
              className="w-10 flex items-center h-full pl-5"
              onClick={() => {
                if(confirmed ===false){
                  return;
                }
                //Navigate to home page and do not allow the user to go back to the payment page
                localStorage.getItem('luxe') === true ? navigate('/luxe',{replace:true}) : navigate('/',{replace:true})
              }}
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
            <div className="flex justify-start">
              <div className="text-primary font-custom-kiona text-3xl capitalize">
                Your Trip
              </div>
            </div>
          </div>
        {confirmed === true ? 
          
          <div className="w-full h-full">
          {residence && reservation &&
              <div className="w-full flex justify-center container mx-auto">
                  <div className="w-full md:w-2/3 lg:1/2 ">
                    <div className="flex sm:flex justify-start gap-5 p-5  w-full">
                      <div className="h-40 ">
                        <img
                          src={
                            residence.pictures[0].original
                              ? residence.pictures[0].original
                              : residence.pictures[0].thumbnail
                          }
                          alt="left arrow"
                          className="sm:w-80 h-full rounded-lg"
                        />
                      </div>
                      <div className=" p-2 w-1/2">
                        <div className="text-sm font-custom-lora">{residence.roomType}</div>
                        <div className="text-lg font-bold font-custom-kiona">{residence.title}</div>
                        <div className="text-[10px] text-ellipsis text-overflow:hidden line-clamp-3">
                          {residence.description}
                        </div>
                      </div>
                    </div>
                    <div className="h-1 my-5 ">
                      <hr className="w-full h-[2px] bg-black"></hr>
                    </div>
  
                    <div className="px-4 ">
                      <div className="text-lg font-bold font-custom-kiona pb-4">Your Trip</div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-md font-bold font-custom-kiona">Check-In Date</div>
                          <div className="text-sm font-custom-lora">
                            {reservation.checkInDateLocalized}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-md font-bold font-custom-kiona">Check-Out Date</div>
                          <div className="text-sm font-custom-lora">
                            {reservation.checkOutDateLocalized}
                          </div>
                        </div>
                      </div>
  
                      <div className="flex justify-between items-center pt-5">
                        <div className="flex flex-col">
                          <div className="text-md font-bold font-custom-kiona">Guests</div>
                          <div className="text-sm font-custom-lora">{reservation.guestsCount}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-5">
                        <div className="flex flex-col">
                          <div className="text-md font-bold font-custom-kiona">Confirmation Code</div>
                          <div className="text-sm font-custom-lora">{reservation.confirmationCode}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
              </div>
            }
      </div>


         : 
          <div className="flex flex-col justify-center h-screen items-center text-center">
            {paymentStatus === 'succeeded' ? (
              <div className="text-xl text-primary font-custom-kiona capitalize">
                Payment Confirmed
              </div>
            ):(
              <div className="text-xl text-primary font-custom-kiona capitalize">
                Payment Failed
              </div>
            )}
            <div className="text-xl text-primary font-custom-kiona capitalize">
              Reservation Not Confirmed
            </div>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        }
    </>
  );
}

export default Success;
