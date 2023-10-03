import React, { useEffect, useState } from "react";
import LeftArrow from "../../assets/images/home/left.svg";
import DesktopNavbar from "../../components/desktopNavbarBlack";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { confirmBooking, getQuote } from "./api";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import DateRangePicker from "../../components/DateRangePicker";

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmTitle, setConfirmTitle] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [residence, setResidence] = useState(null);
  const [dateRangePickerVisible, setDateRangePickerVisible] = useState(false);
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const [totalNights, setTotalNights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [guestNumberPickerVisible, setGuestNumberPickerVisible] =
    useState(false);
  const [coupon, setCoupon] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const fetchQuote = (state) => {
    const setBookingData = () => {
      console.log(state);
      setResidence(state.residence);
    };
    getQuote(
      state.residence,
      state.startDate,
      state.endDate,
      state.guestCount,
      state.coupon
    ).then((data) => {
      if (data.status === 200) {
        console.log(data.quote);
        if (data.quote.status === 422) {
          console.log("DSFS");
          //Go back to the previous page and replace the state
          navigate(-1, { replace: true });
        }
        setQuote(data.quote);
        setTotalNights(
          Math.round(
            (new Date(data.quote.checkOutDateLocalized) -
              new Date(data.quote.checkInDateLocalized)) /
              (1000 * 60 * 60 * 24)
          )
        );
        setLoading(false);
        setBookingDisabled(false);
      } else {
        toast.error("Something went wrong");
      }
    });
    location.state ? setBookingData() : navigate("*");
  };

  useEffect(() => {
    fetchQuote(location.state);
  }, []);

  const handleBooking = () => {
    localStorage.setItem("paymentActive", true);
    // API call to book the residence
    navigate(
      "/payment",
      {
        state: {
          quote: quote._id,
        },
      },
      {
        replace: true,
      }
    );
  };

  return (
    <>
      {dateRangePickerVisible && (
        <div
          className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm"
          //when clicked outside the date picker, close the date picker
          onClick={(e) => {
            if (
              e.target.className ===
              "fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm"
            ) {
              setDateRangePickerVisible(false);
            }
          }}
        >
          <DateRangePicker
            returnData={(props) => {
              if (props.totalNights < residence.terms.minNights) {
                setBookingDisabled(true);
                toast.error(
                  `Minimum stay is ${residence.terms.minNights} nights`
                );
                setTotalNights(props.totalNights);
              } else {
                setLoading(true);
                setBookingDisabled(true);
                fetchQuote({
                  residence: residence,
                  startDate: props.startDate,
                  endDate: props.endDate,
                  guestCount: quote.guestCount,
                  coupon: coupon ? coupon : null,
                });
              }
            }}
            blockBooking={(value) => setBookingDisabled(value)}
            initialStartDate={new Date(quote.checkInDateLocalized)}
            initialEndDate={new Date(quote.checkOutDateLocalized)}
            residenceId={residence._id}
            title={residence.title}
          ></DateRangePicker>
        </div>
      )}
      <div className="min-h-screen flex flex-col w-full justify-between">
        <div className="hidden md:block z-20 fixed top-0 w-full">
          {<DesktopNavbar />}
        </div>
        {residence && quote !== null && totalNights ? (
          <div>
            <div className="flex w-full h-full bg-white shadow-lg justify-between  md:mt-16 ">
              <div
                className="w-10 h-full"
                onClick={() => {
                  window.history.back();
                }}
              >
                <img src={LeftArrow} alt="left arrow" className="w-6 h-6 m-3" />
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="text-lg text-center font-bold ">
                  Confirm Booking
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center container mx-auto">
              {loading !== true && (
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
                      <div className="text-sm">{residence.roomType}</div>
                      <div className="text-lg font-bold">{residence.title}</div>
                      <div className="text-[10px] text-ellipsis text-overflow:hidden line-clamp-3">
                        {residence.description}
                      </div>
                    </div>
                  </div>
                  <div className="h-1 my-5 ">
                    <hr className="w-full h-[2px] bg-black"></hr>
                  </div>

                  <div className="px-4 ">
                    <div className="text-lg font-bold pb-4">Your Trip</div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-md font-bold">Date</div>
                        <div className="text-sm">
                          {format(
                            new Date(quote.checkInDateLocalized),
                            "dd MMMM"
                          ) +
                            " - " +
                            format(
                              new Date(quote.checkOutDateLocalized),
                              "dd MMMM"
                            )}
                        </div>
                      </div>
                      <div
                        className="text-md font-bold underline"
                        onClick={() => {
                          setDateRangePickerVisible(true);
                        }}
                      >
                        Edit
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-5">
                      <div className="flex flex-col">
                        <div className="text-md font-bold">Guests</div>
                        <div className="text-sm">{quote.guestsCount}</div>
                      </div>
                      <div className="relative">
                        <div
                          className="text-md font-bold underline"
                          onClick={() =>
                            setGuestNumberPickerVisible(
                              !guestNumberPickerVisible
                            )
                          }
                        >
                          Edit
                        </div>
                        {guestNumberPickerVisible && (
                          <div className="absolute top-0 h-min w-40 translate-y-10 bg-white rounded-lg shadow-lg z-20">
                            <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                              {residence.accommodates !== null ? (
                                [...Array(residence.accommodates)].map(
                                  (e, i) => {
                                    return (
                                      <li
                                        className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100"
                                        onClick={() => {
                                          setLoading(true);
                                          setBookingDisabled(true);
                                          fetchQuote({
                                            residence: residence,
                                            startDate:
                                              quote.checkInDateLocalized,
                                            endDate:
                                              quote.checkOutDateLocalized,
                                            guestCount: i + 1,
                                            coupon: coupon ? coupon : null,
                                          });
                                          setGuestNumberPickerVisible(false);
                                        }}
                                      >
                                        <div className="text-md font-custom-bold text-primary capitalize">
                                          {i + 1} Guests
                                        </div>
                                      </li>
                                    );
                                  }
                                )
                              ) : (
                                <div className="flex justify-center items-center h-10">
                                  <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                                </div>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-1 my-5 ">
                    <hr className="w-full h-[2px] bg-black"></hr>
                  </div>

                  <div className="px-4 flex flex-col gap-2 ">
                    <div className="text-lg font-bold pb-4">Price Details</div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{`£ ${quote.rates.ratePlans[0].days[0].price} x ${totalNights} Nights`}</div>
                      </div>
                      <div className="text-sm">{`£ ${quote.rates.ratePlans[0].ratePlan.money.fareAccommodationAdjusted}`}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{`Special Offer`}</div>
                      </div>
                      <div className="text-sm">{`-£ ${
                        quote.promotions.adjustment
                          ? quote.promotions.adjustment
                          : 0
                      }`}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{`Cleaning Fees`}</div>
                      </div>
                      <div className="text-sm">{`£ ${quote.rates.ratePlans[0].ratePlan.money.fareCleaning}`}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{`Hospitality Fees`}</div>
                      </div>
                      <div className="text-sm">{`£ ${
                        quote.rates.ratePlans[0].ratePlan.money.fareHospitality
                          ? quote.rates.ratePlans[0].ratePlan.money
                              .fareAccommodationAdjusted
                          : 0
                      }`}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{`Taxes`}</div>
                      </div>
                      <div className="text-sm">{`$ ${quote.rates.ratePlans[0].ratePlan.money.totalTaxes}`}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-sm font-bold">{`Total(GBP)`}</div>
                      </div>
                      <div className="text-sm font-bold">{`£ ${quote.rates.ratePlans[0].ratePlan.money.hostPayout}`}</div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center h-12 mt-5">
                    <input
                      className="rounded-l-lg px-4 h-full w-full md:w-48 border border-black bg-neutral-100"
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter Promo Code"
                    ></input>
                    <button
                      className="bg-primary hover:bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona py-2 px-4 h-full w-32 rounded-r-lg uppercase"
                      onClick={() => {
                        setLoading(true);
                        setBookingDisabled(true);
                        fetchQuote({
                          residence: residence,
                          startDate: quote.checkInDateLocalized,
                          endDate: quote.checkOutDateLocalized,
                          guestCount: quote.guestCount,
                          coupon: coupon,
                        });
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex justify-center items-center ">
                    <div className="flex gap-2 w-full py-2 pt-5">
                      <div className="flex items-center gap-1 mt-1">
                        <input
                          id="terms"
                          name="terms"
                          value={acceptedTerms}
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={() => {
                            setAcceptedTerms(!acceptedTerms);
                          }}
                        />
                      </div>
                      <div className="text-secondary text-sm">
                        I agree to the{" "}
                        <span
                          className="font-bold underline cursor-pointer"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          Privacy Policy
                        </span>
                        ,{" "}
                        <span
                          className="font-bold underline cursor-pointer"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          House Rules
                        </span>
                        ,{" "}
                        <span
                          className="font-bold underline cursor-pointer"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          Ground Rules for Guests
                        </span>
                        ,{" "}
                        <span
                          className="font-bold underline cursor-pointer"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          My City Residences Rebooking and Refund Policy
                        </span>{" "}
                        and that My City Residence can{" "}
                        <span
                          className="font-bold underline cursor-pointer"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          charge my payment method
                        </span>{" "}
                        if I'm responsible for damage. I agree to pay the total
                        amount shown.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-grow justify-center items-end">
                    {
                      //If token is not present, show login button
                      localStorage.getItem("token") === null ? (
                        <div className="flex gap-0 md:gap-2 flex-col md:flex-row">
                          <button
                            className={`w-48 h-10 md:mt-6 mb-5 md:mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary hover:scale-105 transition duration-75 rounded-lg max-w-[400px]`}
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </button>
                          <button
                            className={`w-48 h-10 md:mt-6 mb-5 md:mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary hover:scale-105 transition duration-75 rounded-lg max-w-[400px]`}
                            onClick={() => navigate("/signup")}
                          >
                            Sign Up
                          </button>
                          <button
                            className={`w-full h-10 md:mt-6 mb-5 md:mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary hover:scale-105 transition duration-75 rounded-lg max-w-[400px] ${
                              bookingDisabled || !acceptedTerms
                                ? "opacity-50"
                                : ""
                            }`}
                            onClick={() => handleBooking()}
                            disabled={bookingDisabled || !acceptedTerms}
                          >
                            Checkout as Guest
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`w-1/2 h-10 md:mt-6 mb-5 md:mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary hover:scale-105 transition duration-75 rounded-lg max-w-[400px] ${
                            bookingDisabled || !acceptedTerms
                              ? "opacity-50"
                              : ""
                          }`}
                          onClick={() => handleBooking()}
                          disabled={bookingDisabled || !acceptedTerms}
                        >
                          Confirm
                        </button>
                      )
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
          </div>
        )}
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
      </div>
    </>
  );
}

export default Book;
