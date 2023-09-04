import { React, useEffect, useState } from "react";
import Star from "../../assets/images/property/star.svg";
import PhotoGrid from "./PhotoGrid";
import Amenities from "./Amenities";
import ReviewShowcaseSection from "../HomePage/ReviewShowcaseSection";
import Footer from "../HomePage/Footer";
import DateRangePicker from "../../components/DateRangePicker";
import MapContainer from "./MapContainer";
import DesktopNavbar from "../../components/desktopNavbarBlack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import {
  getResidence,
  getChat,
  initiateChat,
  setWishlist,
  getShowcaseReviews,
} from "./api";
import bed from "../../assets/images/home/bed.svg";
import shower from "../../assets/images/home/shower.svg";
import guest from "../../assets/images/home/person.svg";
import bedroom from "../../assets/images/home/bedroom.svg";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar_black";
import { fetchBookedDatesFromBackend } from "../../components/api";
import { format } from "date-fns";

function Property() {
  const location = useLocation();
  const id = useParams();
  const [guests, setGuests] = useState(
    //1 if 'any' is set in local storage, else get the guest count from local storage or 1 if the guest count is not set
    localStorage.getItem("guestCount") === "any"
      ? 1
      : localStorage.getItem("guestCount")
      ? localStorage.getItem("guestCount")
      : 1
  );
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [carouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [guestPickerVisible, setGuestPickerVisible] = useState(false);
  const [residence, setResidence] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [dateRangePickerVisible, setDateRangePickerVisible] = useState(false);
  const [bookedDatesData, setBookedDatesData] = useState(null);
  const [startDate, setStartDate] = useState(
    localStorage.getItem("checkInDate")
      ? new Date(localStorage.getItem("checkInDate"))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("checkOutDate")
      ? new Date(localStorage.getItem("checkOutDate"))
      : new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [totalNights, setTotalNights] = useState(
    localStorage.getItem("checkInDate") && localStorage.getItem("checkOutDate")
      ? Math.floor(
          (new Date(localStorage.getItem("checkOutDate")) -
            new Date(localStorage.getItem("checkInDate"))) /
            (1000 * 60 * 60 * 24)
        )
      : 1
  );
  const [bookingDisabled, setBookingDisabled] = useState(true);
  const navigate = useNavigate();

  const bookedDatesBetween = (startDate, endDate, data) => {
    // If there are booked dates between start date and end date, return true
    if (data === null) {
      return false;
    }
    for (let i = 0; i < data.length; i++) {
      if (
        startDate.getTime() <= new Date(data[i]).getTime() &&
        new Date(data[i]).getTime() <= endDate.getTime()
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    getShowcaseReviews(id.id).then((res) => {
      setReviews(res.reviews);
    });
    //Get the property data from the API
    getResidence(id.id).then((res) => {
      setResidence(res.residence);
      console.log(res.residence);
    });
    fetchBookedDatesFromBackend(
      id.id,
      format(startDate, "yyyy-MM-dd"),
      format(
        //1 year from start date
        new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1),
        "yyyy-MM-dd"
      )
    ).then((res) => {
      console.log(res);
      setBookedDatesData(res);
      //If booked dates are between the start date and end date, disable booking
      if (bookedDatesBetween(startDate, endDate, res) || totalNights < residence?.terms.minNights) {
        setBookingDisabled(true);
        //Show toast only if no other toast is visible
        if (toast.isActive("bookingDisabled") === false) {
          toast.error("Dates are already booked", {
            toastId: "bookingDisabled",
          });
        }
      } else {
        setBookingDisabled(false);
      }
    });

    if (totalNights < residence?.terms.minNights) {
      setBookingDisabled(true);
      toast.error(`Minimum stay is ${residence?.terms.minNights} nights`);
    } else {
      setBookingDisabled(false);
    }
    //Load the date picker if the check in and check out dates are not set
  }, [id, totalNights, startDate, endDate]);

  return (
    <>
      {carouselVisible && (
        <div className="fixed top-0 h-full w-full bg-black/20 z-30 flex justify-center items-center">
          <div
            className="h-full w-full flex justify-center items-center backdrop-filter backdrop-blur-sm"
            onClick={() => setCarouselVisible(false)}
          >
            <div
              className="w-4/5 md:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel images={residence.pictures} currIndex={carouselIndex} />
            </div>
          </div>
        </div>
      )}

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
                setStartDate(props.startDate);
                setEndDate(props.endDate);
                setTotalNights(props.totalNights);
              } else {
                setBookingDisabled(false);
                console.log(props);
                setStartDate(props.startDate);
                setEndDate(props.endDate);
                setTotalNights(props.totalNights);
              }
            }}
            blockBooking={(value) => setBookingDisabled(value)}
            initialStartDate={startDate}
            initialEndDate={endDate}
            residenceId={id.id}
          ></DateRangePicker>
        </div>
      )}

      <div className="w-full">
        <div className="hidden md:block z-30 fixed w-full">
          <DesktopNavbar />
        </div>
        <div className="md:hidden z-30 fixed w-full">
          <Navbar />
        </div>
      </div>
      <div className="w-full md:container md:mx-auto px-5">
        <div className=" pt-24 mb-3">
          <div
            className="w-10 h-10 bg-blue-200 flex justify-center items-center rounded-full"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_223_1275)">
                <path
                  d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_223_1275">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {residence !== null ? (
          <div className="">
            <div className="flex justify-between items-center">
              <div className="text-md md:text-xl font-custom font-bold uppercase text-primary text-start md:text-center">
                {residence.title}
              </div>
              <div
                className="w-10 h-10  flex justify-center items-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById("wishlistButton")
                    .classList.add("scale-105");
                  setTimeout(() => {
                    document
                      .getElementById("wishlistButton")
                      .classList.remove("scale-105");
                  }, 100);
                  setWishlist(residence).then((res) => {
                    if (res.status === 201) {
                      setWishlisted(true);
                      console.log(res);
                    } else if (res.status === 200) {
                      setWishlisted(false);
                      console.log(res);
                    }
                  });
                }}
              >
                <div
                  id="wishlistButton"
                  className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
                >
                  {wishlisted === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M13 22.5L11.88 21.39C6.42 16.05 3 12.66 3 8.5C3 5.42 5.42 3 8.5 3C10.34 3 12.09 3.97 13 5.5C13.91 3.97 15.66 3 17.5 3C20.58 3 23 5.42 23 8.5C23 12.66 19.58 16.05 14.12 21.39L13 22.5Z"
                        fill="#FF5A5F"
                        stroke="#444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    //Same svg with outline
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M13 22.5L11.88 21.39C6.42 16.05 3 12.66 3 8.5C3 5.42 5.42 3 8.5 3C10.34 3 12.09 3.97 13 5.5C13.91 3.97 15.66 3 17.5 3C20.58 3 23 5.42 23 8.5C23 12.66 19.58 16.05 14.12 21.39L13 22.5Z"
                        stroke="#444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <PhotoGrid
              carouselOpen={(index) => {
                console.log("INDEX", index);
                setCurrentCarouselIndex(index);
                setCarouselVisible(true);
              }}
              images={residence.pictures}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-end">
              <div className="flex flex-col h-full w-full items-start justify-start">
                <div className="flex justify-start w-full h-min py-5 items-center gap-5">
                  <div className="text-md md:text-xl text-primary font-custom-bold">
                    {residence.title}
                  </div>
                  <div className="w-[2px] h-10 bg-black"></div>
                  <span>
                    <div className="flex items-center">
                      <div className="text-md self-center">
                        {residence.reviews.avg}
                      </div>
                      <div className="flex justify-center items-center h-full self-center">
                        <img
                          src={Star}
                          alt="bed"
                          className="w-4 h-4 mx-2 -translate-y-[2px]"
                        />
                      </div>
                    </div>
                  </span>
                </div>

                <div className=" text-primary text-[10px] md:text-xs grid grid-cols-2 xs:flex gap-1 pb-5">
                  <div className="flex gap-1">
                    <img src={guest} alt="bed" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.accommodates + " guests,"}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <img src={bedroom} alt="bed" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.bedrooms + " bedrooms,"}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <img src={bed} alt="bed" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.beds + " beds,"}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <img src={shower} alt="shower" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.bathrooms + " bathrooms"}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full h-min text-primary text-xs font-normal leading-normal overflow-hidden overflow-ellipsis ${
                    showFullDescription ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {residence.publicDescription
                    ? residence.publicDescription.summary
                    : "No description available"}
                </div>
                <div
                  className=" w-full text-primary underline font-bold text-xs py-2"
                  onClick={() => {
                    setShowFullDescription(!showFullDescription);
                  }}
                >{`${showFullDescription ? "Collapse" : "Read More"} >`}</div>
              </div>
              <div className="flex h-full w-full md:w-2/3 flex-col py-5">
                <div className="text-md text-custom text-primary">
                  ADD DATES FOR PRICES
                </div>
                <div className="text-xs text-custom text-secondary">
                  {`${
                    //how many nights
                    totalNights
                  } nights in ${residence.title}`}
                </div>
                <div className="w-full h-min rounded-lg border border-primary border-opacity-50 max-w-lg">
                  <div className="flex justify-between">
                    <div
                      className="p-2 flex flex-col justify-center items-center w-full"
                      onClick={() => setDateRangePickerVisible(true)}
                    >
                      <div className="text-sm text-custom text-primary">
                        CHECK-IN
                      </div>
                      <div className="text-xs text-custom font-bold text-primary">
                        {startDate
                          ? startDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })
                          : "Add Date"}
                      </div>
                    </div>
                    <div className="w-[2px] h-18 bg-primary"></div>
                    <div
                      className="p-2 flex flex-col justify-center items-center w-full"
                      onClick={() => setDateRangePickerVisible(true)}
                    >
                      <div className="text-sm text-custom text-primary">
                        CHECK-OUT
                      </div>
                      <div className="text-xs text-custom font-bold text-primary">
                        {endDate
                          ? endDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })
                          : "Add Date"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-primary"></div>
                  <div className="relative">
                    <div
                      className="flex py-2 px-4 justify-between items-center cursor-pointer"
                      onClick={() => setGuestPickerVisible(!guestPickerVisible)}
                    >
                      <div className="flex flex-col">
                        <div className="w-full h-full text-md font-custom-bold text-primary">
                          Guests
                        </div>
                        <div className="w-full h-full text-md font-custom-bold text-primary">
                          {guests === "any"
                            ? "Any"
                            : guests === 1
                            ? guests + " guest"
                            : guests + " guests"}
                        </div>
                      </div>
                      <div className="w-5 h-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    {guestPickerVisible && (
                      <div className="absolute top-0 h-min w-full translate-y-20 bg-white rounded-lg shadow-lg z-20">
                        <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                          {Array.from(
                            { length: residence.accommodates },
                            (_, i) => i + 1
                          ).map((item) => (
                            <li
                              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setGuests(item);
                                setGuestPickerVisible(false);
                                localStorage.setItem("guestCount", item);
                              }}
                            >
                              <div className="text-md font-custom-bold text-primary">
                                {item === 1
                                  ? item + " guest"
                                  : item + " guests"}
                              </div>
                              <div className="w-5 h-5">
                                {guests === item && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                                      fill="black"
                                    />
                                  </svg>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <span className="text-custom-lora font-bold text-lg text-secondary">{`$ ${
                    residence.prices.basePrice * totalNights
                  }`}</span>
                  <span className=" pl-1 text-sm text-end text-secondary flex items-end justify-end">{`(Inclusive of all Taxes)`}</span>
                </div>
                <div className=" flex justify-center pt-2">
                  <button
                    className={`text-white border bg-primary hover:bg-secondary w-full active:bg-primary p-3 rounded-lg font-bold cursor-pointer`}
                    onClick={() =>
                      bookingDisabled === false
                        ? navigate("/book", {
                            state: {
                              residence: residence,
                              startDate: startDate,
                              guests: guests,
                              endDate: endDate,
                              totalNights: totalNights,
                            },
                          })
                        : (localStorage.setItem("startDate", startDate),
                          localStorage.setItem("endDate", endDate),
                          localStorage.getItem("luxe") === "true"
                            ? navigate("/luxe/properties", {
                                state: {
                                  filterData: {
                                    location: "any",
                                    startDate: startDate,
                                    endDate: endDate,
                                    bedrooms: "any",
                                    guests: guests,
                                    bathrooms: "any",
                                    priceRange: [0, 2500],
                                    amenities: [],
                                  },
                                },
                              })
                            : navigate("/properties", {
                                state: {
                                  filterData: {
                                    location: "any",
                                    startDate: startDate,
                                    endDate: endDate,
                                    bedrooms: "any",
                                    guests: guests,
                                    bathrooms: "any",
                                    priceRange: [0, 2500],
                                    amenities: [],
                                  },
                                },
                              }))
                    }
                  >
                    {bookingDisabled
                      ? "Check Available Properties"
                      : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-primary my-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full flex flex-col">
                <div className="text-md md:text-xl font-custom-bold text-primary">
                  LOCATION
                </div>
                <div className="text-xs md:text-lg font-custom-bold text-secondary pb-5">
                  {residence.address.full}
                </div>
                <div className="w-full h-96">
                  {residence ? (
                    <MapContainer
                      coordinate={{
                        lat: residence.address.lat,
                        lng: residence.address.lng,
                      }}
                    />
                  ) : (
                    <div className="flex justify-center items-center mt-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-end ">
                {residence ? (
                  <Amenities amenities={residence.amenities}></Amenities>
                ) : (
                  <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button className="w-full md:w-1/3 lg:w-1/4 h-12 bg-primary hover:bg-secondary text-white font-bold text-lg rounded-lg">
                Chat With Us
              </button>
            </div>
            <div className="py-10">
              <ReviewShowcaseSection reviews={reviews} />
            </div>
          </div>
        ) : (
          //loading
          <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
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

export default Property;
