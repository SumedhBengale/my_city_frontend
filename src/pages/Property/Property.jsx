import { React, useEffect, useRef, useState } from "react";
import Star from "../../assets/images/property/star.svg";
import PhotoGrid from "./PhotoGrid";
import Amenities from "./Amenities";
import ReviewShowcaseSection from "../HomePage/ReviewShowcaseSection";
import Footer from "../HomePage/Footer";
import DateRangePicker from "../../components/DateRangePicker";
import MapContainer from "./MapContainer";
import DesktopNavbar from "../../components/desktopNavbarBlack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import amenityIcon from "../../assets/images/property/amenity_icon.png";
import Carousel from "./Carousel";
import config from "../../config/config";
import {
  getResidence,
  getChat,
  initiateChat,
  setWishlist,
  getShowcaseReviews,
  getAmenityIcons,
} from "./api";
import bed from "../../assets/images/home/bed.svg";
import shower from "../../assets/images/home/shower.svg";
import guest from "../../assets/images/home/person.svg";
import bedroom from "../../assets/images/home/bedroom.svg";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar_black";
import { fetchBookedDatesFromBackend } from "../../components/api";
import { format } from "date-fns";
import luxeLogo from "../../assets/images/luxe.svg";

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
  const [showAmenities, setShowAmenities] = useState(false);
  const [dateRangePickerVisible, setDateRangePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(
    localStorage.getItem("checkInDate")
      ? new Date(localStorage.getItem("checkInDate"))
      : null
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("checkOutDate")
      ? new Date(localStorage.getItem("checkOutDate"))
      : null
  );
  const [totalNights, setTotalNights] = useState(
    localStorage.getItem("checkInDate") && localStorage.getItem("checkOutDate")
      ? Math.ceil(
          (new Date(localStorage.getItem("checkOutDate")) -
            new Date(localStorage.getItem("checkInDate"))) /
            (1000 * 60 * 60 * 24)
        )
      : 0
  );
  const [bookingDisabled, setBookingDisabled] = useState(true);
  const [hoveringWishlistButton, setHoveringWishlistButton] = useState(false);
  const navigate = useNavigate();
  const amenitiesDialogRef = useRef(null);
  const [amenityIcons, setAmenityIcons] = useState(null);
  useEffect(() => {
    console.log("START DATE", startDate);
    console.log("END DATE", endDate);
    getShowcaseReviews(id.id).then((res) => {
      setReviews(res.reviews);
    });
    getAmenityIcons().then((res) => {
      console.log("AMENITY ICONS", res);
      setAmenityIcons(res.data);
    });
    //Get the property data from the API
    getResidence(id.id).then((res) => {
      setResidence(res.residence);
      console.log(res.residence);
      //If start date and end date are set, check if the total nights is greater than the minimum nights required for the property

      if (startDate && endDate) {
        if (checkDatesBetween(res.residence._id, startDate, endDate) === true) {
          setBookingDisabled(true);
          return;
        }
        if (totalNights < res.residence.terms.minNights) {
          setBookingDisabled(true);
        } else {
          setBookingDisabled(false);
        }
      }
    });
    //Load the date picker if the check in and check out dates are not set
  }, [id]);

  const checkDatesBetween = async (residenceId, startDate, endDate) => {
    await fetchBookedDatesFromBackend(
      residenceId,
      format(startDate, "yyyy-MM-dd"),
      format(endDate, "yyyy-MM-dd")
    ).then((data) => {
      if (data.status === 400) {
        console.log("Error fetching booked dates");
        return true;
      } else {
        console.log("Dates Data", data);
        if (bookedDatesBetween(startDate, endDate, data)) {
          console.log("Booked Dates Between");
          //Check if any toast is already being displayed, if not display toast
          if (!toast.isActive("bookedDatesBetween")) {
            toast.error("The dates you selected are not available", {
              toastId: "bookedDatesBetween",
            });
            return true;
          }
        }
      }
      return false;
    });
  };

  const bookedDatesBetween = (startDate, endDate, data) => {
    // If the status of any date between start date and end date is booked, return true, startDate and endDate are excluded
    if (data === null) {
      return false;
    }
    for (let i = 0; i < data.length; i++) {
      if (
        new Date(data[i].date) > startDate &&
        new Date(data[i].date) < endDate &&
        (data[i].status === "booked" ||
          data[i].status === "unavailable" ||
          data[i].status === "reserved")
      ) {
        return true;
      }
    }
  };

  return (
    <>
      {showAmenities === true && residence && (
        <div
          className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-40 backdrop-filter backdrop-blur-sm"
          //when clicked outside the dialog, close
          onClick={(e) => {
            if (
              amenitiesDialogRef.current &&
              !amenitiesDialogRef.current.contains(e.target)
            ) {
              console.log("LASKDJLAKSJD");
              setShowAmenities(false);
            }
          }}
        >
          <div className="absolute h-screen w-screen bg-black/40 z-30"></div>
          <div className="uppercase z-40 h-full">
            <div className="flex flex-col mx-5 mb-10 justify-center items-center h-full">
              <div
                className=" px-4 py-5 bg-white h-1/2 overflow-scroll no-scrollbar rounded-lg"
                ref={amenitiesDialogRef}
              >
                <div className="text-2xl font-custom-kiona text-primary px-2 pb-4">
                  ALL AMENITIES
                </div>
                <div className={`grid grid-cols-2 gap-5 pt-5 md:pt-0`}>
                  {amenityIcons &&
                    residence.amenities.map((amenity, index) => (
                      <div className="flex justify-center">
                        <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                          {amenityIcons.find(
                            (image) => image.attributes.name === amenity
                          ) ? (
                            <img
                              src={
                                config.STRAPI_URL +
                                amenityIcons.find(
                                  (image) => image.attributes.name === amenity
                                ).attributes.icon.data.attributes.url
                              }
                              className="h-8 w-8"
                              alt="amenityIcon"
                            />
                          ) : null}
                          <div className="text-start text-sm px-1">
                            {amenity}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
              setBookingDisabled(false);
              console.log(props);
              setStartDate(props.startDate);
              setEndDate(props.endDate);
              setTotalNights(
                Math.ceil(
                  (props.endDate - props.startDate) / (1000 * 60 * 60 * 24)
                )
              );
            }}
            bookNow={() =>
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
                  localStorage.getItem("luxe") === true
                    ? navigate("/properties", {
                        state: {
                          filterData: {
                            location: "any",
                            startDate: startDate,
                            endDate: endDate,
                            bedrooms: "any",
                            guests: guests,
                            bathrooms: "any",
                            priceRange: [0, 10000],
                            amenities: [],
                          },
                          luxe: true,
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
                            priceRange: [0, 10000],
                            amenities: [],
                          },
                        },
                      }))
            }
            blockBooking={(value) => setBookingDisabled(value)}
            initialStartDate={startDate}
            initialEndDate={endDate}
            residenceMinNights={residence.terms.minNights}
            residenceId={id.id}
            title={residence.title}
          ></DateRangePicker>
        </div>
      )}

      <div className="w-full">
        <div className="hidden md:block z-30 fixed w-full drop-shadow-2xl">
          <DesktopNavbar />
        </div>
        <div className="md:hidden z-30 fixed w-full">
          <Navbar />
        </div>
      </div>
      <div className="w-full md:container md:mx-auto px-5">
        <div className="pt-16 md:pt-20 md:mb-3">
          <div
            className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
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
                  <rect width="24" height="24" fill="#262150" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {residence !== null ? (
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {
                  //residence.tags include "luxe"
                  residence.tags.includes("luxe") ? (
                    <img
                      src={luxeLogo}
                      alt="luxe"
                      className="w-10 h-10 md:w-16 md:h-16 rounded-full"
                    ></img>
                  ) : null
                }
                <div className="text-lg md:text-2xl font-custom-kiona uppercase text-primary text-start md:text-center">
                  {residence.title}
                </div>
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
                  onMouseEnter={(e) => {
                    setHoveringWishlistButton(true);
                  }}
                  onMouseLeave={(e) => {
                    setHoveringWishlistButton(false);
                  }}
                  id="wishlistButton"
                  className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
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
                        stroke={`
                        ${hoveringWishlistButton === true ? "#FF5A5F" : "#444"}
                        `}
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
                <div className="flex justify-start w-full h-min py-5 items-center relative">
                  <div className="text-md md:text-xl h-min text-primary font-custom-kiona uppercase">
                    {residence.title}
                  </div>
                  {/* {
                  //residence.tags include "luxe"
                  residence.tags.includes("luxe")
                  ? (
                    <img src={luxeLogo} alt="host" className="w-16 h-16 rounded-full absolute right-5 top-5"></img>
                  ) : null
                } */}
                </div>

                <div className=" text-primary text-[10px] md:text-xs grid grid-cols-2 xs:flex gap-1 md:gap-3 pb-5">
                  {residence.reviews.avg !== null ? (
                    <div className="flex flex-row">
                      <span>
                        <div className="flex h-full items-center">
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
                      <div className="w-[1px] h-6 bg-primary"></div>
                    </div>
                  ) : null}

                  <div className="flex gap-1">
                    <img src={guest} alt="bed" className="w-4"></img>
                    <div className="flex items-center">
                      {residence.accommodates + " guests"}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <img src={bedroom} alt="bed" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.bedrooms + " bedrooms"}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <img src={bed} alt="bed" className="w-5"></img>
                    <div className="flex items-center">
                      {residence.beds + " beds"}
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
                  className=" w-full text-secondary underline font-bold text-xs py-2"
                  onClick={() => {
                    setShowFullDescription(!showFullDescription);
                  }}
                >{`${showFullDescription ? "Collapse" : "Read More"} >`}</div>
              </div>
              <div className="flex h-full w-full md:w-2/3 flex-col py-5">
                <div className="text-md font-custom-kiona text-primary">
                  ADD DATES FOR PRICES
                </div>
                <div className="text-xs font-custom-kiona text-secondary pb-3">
                  {`${
                    //how many nights
                    totalNights !== 0 ? (totalNights, "nights in") : ""
                  }  ${residence.title}`}
                </div>
                <div className="w-full h-min rounded-lg border-[2px] border-primary border-opacity-50 max-w-lg">
                  <div className="flex justify-between">
                    <div
                      className="p-2 flex flex-col justify-center items-center w-full cursor-pointer"
                      onClick={() => setDateRangePickerVisible(true)}
                    >
                      <div className="text-sm font-custom-kiona text-primary">
                        CHECK-IN
                      </div>
                      <div className="text-xs font-custom-kiona font-bold text-primary">
                        {startDate !== null
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
                      className="p-2 flex flex-col justify-center items-center w-full cursor-pointer"
                      onClick={() => setDateRangePickerVisible(true)}
                    >
                      <div className="text-sm font-custom-kiona text-primary">
                        CHECK-OUT
                      </div>
                      <div className="text-xs font-custom-kiona font-bold text-primary">
                        {endDate !== null
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
                              className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100"
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
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <span className="font-custom-lora font-extrabold text-lg text-secondary">{`£${
                    residence.prices.basePrice * totalNights
                  }`}</span>
                  <span className=" pl-1 text-sm text-end text-secondary flex items-center justify-end">{`(Inclusive of all Taxes)`}</span>
                </div>
                <div className=" flex justify-center pt-2">
                  <button
                    className={`text-white border font-custom-kiona bg-primary hover:bg-secondary w-full active:bg-primary p-3 rounded-lg cursor-pointer`}
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
                          localStorage.getItem("luxe") === true
                            ? navigate("/properties", {
                                state: {
                                  filterData: {
                                    location: "any",
                                    startDate: startDate,
                                    endDate: endDate,
                                    bedrooms: "any",
                                    guests: guests,
                                    bathrooms: "any",
                                    priceRange: [0, 10000],
                                    amenities: [],
                                  },
                                  luxe: true,
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
                                    priceRange: [0, 10000],
                                    amenities: [],
                                  },
                                },
                              }))
                    }
                  >
                    {bookingDisabled ? "SEE AVAILABLE PROPERTIES" : "BOOK NOW"}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-primary my-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full flex flex-col">
                <div className="text-md md:text-xl font-custom-kiona text-primary">
                  LOCATION
                </div>
                <div className="text-xs md:text-lg font-custom-bold text-secondary pb-5">
                  {
                    //Modify the address to remove numbers from the start, any other numbers after a letter are allowed
                    residence.address.full.replace(/\d+,?\s*/g, "")
                  }
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
              <div className="w-full flex justify-end pt-5 md:pt-0">
                {residence && amenityIcons ? (
                  <Amenities
                    amenities={residence.amenities}
                    showAmenities={showAmenities}
                    setShowAmenities={setShowAmenities}
                    amenityIcons={amenityIcons}
                  ></Amenities>
                ) : (
                  <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center md:mt-10">
              <button
                className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-56 my-3"
                onClick={() => {
                  navigate("/messages");
                }}
              >
                CHAT WITH US
              </button>
            </div>

            {residence !== null && residence.tags.includes("luxe") ? (
              <div className="bg-gradient-to-b from-primary via-primary to-primary/60 rounded-tl-[50px] md:rounded-tl-[100px] flex justify-center items-center my-10 pt-10 pb-5">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="text-2xl text-white font-custom-kiona">
                    MY CITY RESIDENCE
                  </div>
                  <div className="flex justify-center items-center -translate-y-4">
                    <img src={luxeLogo} alt="arrow" className="w-20 h-10" />
                  </div>
                  <div className="font-custom-avenir-light text-white w-full md:w-2/3 text-center">
                    With over three decades in hospitality, My City Residences
                    oversees an expansive collection of properties across
                    renowned areas such as Mayfair, Belgravia, Knightsbridge,
                    Marylebone, and Kensington.With over three decades in
                    hospitality, My City Residences oversees an expansive
                    collection of properties across renowned areas such as
                    Mayfair, Belgravia, Knightsbridge, Marylebone, and
                    Kensington.
                  </div>
                  <button className="bg-white hover:bg-secondary rounded-lg text-primary hover:scale-105 mt-10 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-56 my-3">
                    KNOW MORE
                  </button>
                </div>
              </div>
            ) : null}

            <div className="py-10 container mx-0">
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
