import React, { useEffect, useState } from "react";
import filterIcon from "../assets/images/home/filter_icon.svg";
import locationPin from "../assets/images/home/location_pin.svg";
import calendar from "../assets/images/home/calendar.svg";
import guests from "../assets/images/home/guests.svg";
import rooms from "../assets/images/home/rooms.svg";
import Filter from "../components/filter";
import { getCities } from "./api";
import PlainDateRangePicker from "./CustomDatePicker";

function SearchCard({ search, initialData }) {
  const [startDate, setStartDate] = useState(initialData && initialData.startDate ? new Date(initialData.startDate) : null);
  const [endDate, setEndDate] = useState(initialData && initialData.endDate ? new Date(initialData.endDate) : null);
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    initialData && initialData.bedrooms ? initialData.bedrooms : "any"
  );
  const [selectedGuests, setSelectedGuests] = useState(
    initialData && initialData.guests ? initialData.guests : "any"
  );
  const [selectedbathrooms, setSelectedbathrooms] = useState(
    initialData && initialData.bathrooms ? initialData.bathrooms : "any"
  );
  const [location, setLocation] = useState(
    initialData && initialData.location ? initialData.location : "any"
  );
  const [priceRange, setPriceRange] = useState(
    initialData && initialData.priceRange ? initialData.priceRange : [0, 10000]
  );
  const [selectedAmenities, setSelectedAmenities] = useState(
    initialData && initialData.amenities ? initialData.amenities : []
  );
  const [cities, setCities] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [guestNumberPickerVisible, setGuestNumberPickerVisible] =
    useState(false);
  const [roomNumberPickerVisible, setRoomNumberPickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [luxe, setLuxe] = useState(
    initialData && initialData.luxe ? initialData.luxe : false);
  const cardBackdropRef = React.useRef(null);
  const guestPickerRef = React.useRef(null);
  const guestPickerMobileRef = React.useRef(null);
  const locationPickerRef = React.useRef(null);
  const locationPickerMobileRef = React.useRef(null);
  const roomPickerRef = React.useRef(null);
  const roomPickerMobileRef = React.useRef(null);

  useEffect(() => {
    //If startDate and endDate are not null, set the localStorage
    if (startDate !== null && endDate !== null) {
      console.log("Setting localStorage")
      console.log(startDate)
      console.log(endDate)
      localStorage.setItem("checkInDate", startDate);
      localStorage.setItem("checkOutDate", endDate);
    }
    console.log("Initial Data", initialData);
    getCities().then((data) => {
      console.log("City List", data);
      const cities = data.data.attributes.locations;
      //if cities is a string, separate it by comma and convert it to an array where the key is 'city and the value is the city name'
      if (typeof cities === "string") {
        const citiesArray = cities.split(",");
        const citiesObject = citiesArray.map((city) => {
          return { city: city };
        });
        setCities(citiesObject);
      }
    });

    //watch for clicks outside the guest picker
    document.addEventListener("click", (e) => {
      console.log("clicked outside guest picker")
      //If clicked outside the guest picker ref or guest picker mobile ref, close the guest picker
      if (
        guestPickerRef.current && !guestPickerRef.current.contains(e.target) && guestPickerMobileRef.current && !guestPickerMobileRef.current.contains(e.target)
      ) {
        console.log("clicked outside guest picker")
        setGuestNumberPickerVisible(false);
      }
      if(
        locationPickerRef.current && !locationPickerRef.current.contains(e.target) && locationPickerMobileRef.current && !locationPickerMobileRef.current.contains(e.target)
      ){
        setLocationPickerVisible(false);
      }
      if(
        roomPickerRef.current && !roomPickerRef.current.contains(e.target) && roomPickerMobileRef.current && !roomPickerMobileRef.current.contains(e.target)
      ){
        setRoomNumberPickerVisible(false);
      }
    });




  }, []);

  return (
    <div
      className="md:px-5"
      ref={cardBackdropRef}
      onClick={(e) => {
        //if not cardBackdropRef
        if (e.target === cardBackdropRef.current) {
          console.log("clicked outside");
          setGuestNumberPickerVisible(false);
          setRoomNumberPickerVisible(false);
          setLocationPickerVisible(false);
          setDatePickerVisible(false);
          setFilterVisible(false);
        }
      }}
    >
      {filterVisible && (
        <div className="h-screen w-screen absolute top-0 left-0 overflow-scroll">
          <Filter
            initialData={{
              location: location,
              selectedBedrooms: selectedBedrooms,
              selectedGuests: selectedGuests,
              selectedbathrooms: selectedbathrooms,
              priceRange: priceRange,
              selectedAmenities: selectedAmenities,
            }}
            apply={(data) => {
              setFilterVisible(false);
              console.log("filter applied");
              console.log(data);
              setSelectedBedrooms(data.bedrooms);
              setSelectedGuests(data.guests);
              setSelectedbathrooms(data.bathrooms);
              setPriceRange(data.priceRange);
              setSelectedAmenities(data.amenities);
              setLuxe(data.luxeSelection);
            }}
            close={() => setFilterVisible(false)}
          ></Filter>
        </div>
      )}
      {datePickerVisible && (
        <div
          className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm cursor-pointer"
          //when clicked outside the date picker, close the date picker
          onClick={(e) => {
            if (
              e.target.className ===
              "fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm cursor-pointer"
            ) {
              setDatePickerVisible(false);
            }
          }}
        >
          <PlainDateRangePicker
            initialStartDate={startDate}
            initialEndDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            returnData={(data) => {
              console.log("Date Range Picker Data", data);
              setStartDate(data.startDate);
              setEndDate(data.endDate);
              if(data.endDate !== null){
                setDatePickerVisible(false);
              }

            }}
          ></PlainDateRangePicker>
        </div>
      )}
      <div className="px-2 sm:px-10 w-full flex justify-center">
        <div className="z-0 m-4 w-full md:w-full lg:w-full h-min md:h-min bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md lg:hidden">
          <div className="grid grid-cols-2 gap-3 md:gap-9 text-white">
            <div className="col-span-2 flex justify-between">
              {/* Location and Filter */}
              <div
                className="flex cursor-pointer"
                ref={locationPickerMobileRef}
                onClick={() => {
                  setGuestNumberPickerVisible(false);
                  setRoomNumberPickerVisible(false);
                  setLocationPickerVisible(!locationPickerVisible);
                }}
              >
                <img src={locationPin} alt="location pin" className=""></img>
                <div className="pl-2">
                  <div className="text-xs sm:text-sm">Select Location</div>
                  <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                      {location
                        ? location === "any"
                          ? "Where To?" : location === 'anywhere' ? 'Anywhere'
                          : location.city
                        : "Where To?"}
                    </div>
                    {location === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
                </div>
                {locationPickerVisible && (
                  <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20"
                  >
                    <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                    <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setLocation('anywhere');
                      setLocationPickerVisible(false);
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      Anywhere
                    </div>
                  </li>
                      {cities !== null ? (
                        cities.map((city) => {
                          return (
                            <li
                              className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                              onClick={() => {
                                setLocation(city);
                                setLocationPickerVisible(false);
                              }}
                            >
                              <div className="text-md font-custom-bold text-primary capitalize">
                                {city.city}
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <div className="flex justify-center items-center h-10">
                          <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <div
                className="text-white text-[18px] font-bold active:scale-105 transition duration-75 cursor-pointer"
                onClick={() => setFilterVisible(true)}
              >
                <img src={filterIcon} alt="filter" className=""></img>
              </div>
            </div>

            <div className="col-span-2 flex justify-between">
              {/* Start and End Date Selector */}
              <div className="flex flex-col gap-5">
                <div
                  className="flex active:scale-90 transition ease-in duration-50 cursor-pointer"
                  onClick={() => setDatePickerVisible(!datePickerVisible)}
                >
                  <img
                    src={calendar}
                    alt="calendar"
                    className="w-5 sm:w-7 h-full"
                  ></img>
                  <div className="pl-2">
                    <div className="text-xs sm:text-sm">Check-in Date</div>
                    <div className=" text-md sm:text-md font-bold">
                      {startDate ? startDate.getDate() +
                        "/" +
                        (startDate.getMonth() + 1) +
                        "/" +
                        startDate.getFullYear()
                        : "Select"
                      }
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex justify-between">
                  {/* Number of Guests and Rooms Selector */}
                  <div
                    className="flex relative cursor-pointer"
                    ref={guestPickerMobileRef}
                    onClick={() => {
                      setRoomNumberPickerVisible(false);
                      setLocationPickerVisible(false);
                      setGuestNumberPickerVisible(!guestNumberPickerVisible);
                    }}
                  >
                    <img src={guests} alt="calendar" className=""></img>
                    <div className="pl-2">
                      <div className="text-xs sm:text-sm">Number of guests</div>
                      <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                    {selectedGuests === "any" ? "Any" : selectedGuests}
                    </div>
                    {selectedGuests === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
                    </div>
                    {guestNumberPickerVisible && (
                      <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20">
                        <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                          <li
                            className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => {
                              setSelectedGuests("any");
                              setGuestNumberPickerVisible(false);
                              localStorage.setItem("guestCount", "any");
                            }}
                          >
                            <div className="text-md font-custom-bold text-primary">
                              Any
                            </div>
                          </li>
                          {Array.from({ length: 4 }, (_, i) => i + 1).map(
                            (item) => (
                              <li
                                className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                                onClick={() => {
                                  setSelectedGuests(item);
                                  setGuestNumberPickerVisible(false);
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
                            )
                          )}
                          <li
                            className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => {
                              setSelectedGuests(5);
                              setGuestNumberPickerVisible(false);
                              localStorage.setItem("guestCount", 5);
                            }}
                          >
                            <div className="text-md font-custom-bold text-primary">
                              5+ guests
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div
                  className="flex active:scale-90 transition ease-in duration-50  cursor-pointer"
                  onClick={() => setDatePickerVisible(!datePickerVisible)}
                >
                  <img
                    src={calendar}
                    alt="calendar"
                    className="w-5 sm:w-7 h-full"
                  ></img>
                  <div className="pl-2">
                    <div className="text-xs sm:text-sm">Check-out Date</div>
                    <div className=" text-md sm:text-md font-bold">
                      {endDate ? endDate.getDate() +
                        "/" +
                        (endDate.getMonth() + 1) +
                        "/" +
                        endDate.getFullYear()
                        : "Select"
                      }
                    </div>
                  </div>
                </div>

                <div
                  className="flex relative  cursor-pointer"
                  ref={roomPickerMobileRef}
                  onClick={() => {
                    setGuestNumberPickerVisible(false);
                    setLocationPickerVisible(false);
                    setRoomNumberPickerVisible(!roomNumberPickerVisible);
                  }}
                >
                  <img src={rooms} alt="calendar" className=""></img>
                  <div className="pl-2">
                    <div className="text-xs sm:text-sm">Number of rooms</div>
                    <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                    {selectedBedrooms === "any" ? "Any" : selectedBedrooms}
                    </div>
                    {selectedBedrooms === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
                  </div>
                  {roomNumberPickerVisible && (
                    <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20">
                      <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                        <li
                          className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                          onClick={() => {
                            setSelectedBedrooms("any");
                            setRoomNumberPickerVisible(false);
                          }}
                        >
                          <div className="text-md font-custom-bold text-primary">
                            Any
                          </div>
                        </li>
                        {Array.from(
                          //0 to 4
                          { length: 5 },
                          (_, i) => i
                        ).map((item) => (
                          <li
                            className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => {
                              setSelectedBedrooms(item);
                              setRoomNumberPickerVisible(false);
                            }}
                          >
                            <div className="text-md font-custom-bold text-primary">
                              {item === 1 ? item + " room" : item + " rooms"}
                            </div>
                            <div className="w-5 h-5">
                              {rooms === item && (
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
                        <li
                          className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                          onClick={() => {
                            setSelectedBedrooms(5);
                            setRoomNumberPickerVisible(false);
                          }}
                        >
                          <div className="text-md font-custom-bold text-primary">
                            5+ rooms
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="w-full cursor-pointer col-span-2 h-10 md:mb-3 bg-white text-black active:scale-105 transition duration-75  active:bg-gray-200 rounded-lg"
              onClick={() =>
                search({
                  location: location,
                  startDate: startDate,
                  endDate: endDate,
                  bedrooms: selectedBedrooms,
                  guests: selectedGuests,
                  bathrooms: selectedbathrooms,
                  priceRange: priceRange,
                  amenities: selectedAmenities,
                })
              }
            >
              <div className="w-full relative h-full z-0 flex">
                <div className="w-full text-center self-center text-primary font-custom-kiona flex justify-center items-center">
                  Search
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-0 py-5 w-full max-w-7xl bg-white text-white bg-opacity-5 px-3 rounded-2xl border backdrop-blur-md hidden lg:block">
        <div className="col-span-2 flex justify-around gap-5">
          <div
            className="flex items-center cursor-pointer"
            ref={locationPickerRef}
            onClick={() => {
              setGuestNumberPickerVisible(false);
              setRoomNumberPickerVisible(false);
              setLocationPickerVisible(!locationPickerVisible);
            }}
          >
            <img src={locationPin} alt="location pin" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Select Location</div>
              <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                      {location
                        ? location === "any"
                          ? "Where To?" : location === 'anywhere' ? 'Anywhere'
                          : location.city
                        : "Where To?"}
                    </div>
                    {location === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
            </div>
            {locationPickerVisible && (
              <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20"
              >
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setLocation('anywhere');
                      setLocationPickerVisible(false);
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      Anywhere
                    </div>
                  </li>
                  {cities !== null ? (
                    cities.map((city) => {
                      return (
                        <li
                          className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                          onClick={() => {
                            setLocation(city);
                            setLocationPickerVisible(false);
                          }}
                        >
                          <div className="text-md font-custom-bold text-primary capitalize">
                            {city.city}
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center h-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="h-20 w-[2px] bg-white "></div>

          <div
            className="flex items-center active:scale-90 transition ease-in duration-50 cursor-pointer"
            onClick={() => setDatePickerVisible(!datePickerVisible)}
          >
            <img src={calendar} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Check-in Date</div>
              <div className=" text-md sm:text-md font-bold">
                {startDate ? startDate.getDate() +
                  "/" +
                  (startDate.getMonth() + 1) +
                  "/" +
                  startDate.getFullYear()
                  : "Select"
                }
              </div>
            </div>
          </div>

          <div className="h-20 w-[2px] bg-white"></div>

          <div
            className="flex items-center active:scale-90 transition ease-in duration-50 cursor-pointer"
            onClick={() => setDatePickerVisible(!datePickerVisible)}
          >
            <img src={calendar} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Check-out Date</div>
              <div className=" text-md sm:text-md font-bold">
                {endDate ? endDate.getDate() +
                  "/" +
                  (endDate.getMonth() + 1) +
                  "/" +
                  endDate.getFullYear()
                  : "Select"
                }
              </div>
            </div>
          </div>
          <div className="h-20 w-[2px] bg-white"></div>

          <div
            className="flex items-center cursor-pointer"
            ref={guestPickerRef}
            onClick={() => {
              setRoomNumberPickerVisible(false);
              setLocationPickerVisible(false);
              setGuestNumberPickerVisible(!guestNumberPickerVisible);
            }}
          >
            <img src={guests} alt="calendar relative" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Number of guests</div>
              <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                    {selectedGuests === "any" ? "Any" : selectedGuests}
                    </div>
                    {selectedGuests === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
            </div>
            {guestNumberPickerVisible && (
              <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20">
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setSelectedGuests("any");
                      setGuestNumberPickerVisible(false);
                      localStorage.setItem("guestCount", "any");
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      Any
                    </div>
                  </li>
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
                    <li
                      className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => {
                        setSelectedGuests(item);
                        setGuestNumberPickerVisible(false);
                        localStorage.setItem("guestCount", item);
                      }}
                    >
                      <div className="text-md font-custom-bold text-primary">
                        {item === 1 ? item + " guest" : item + " guests"}
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
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setSelectedGuests(5);
                      setGuestNumberPickerVisible(false);
                      localStorage.setItem("guestCount", 5);
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      5+ guests
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="h-20 w-[2px] bg-white"></div>

          <div
            className="flex items-center cursor-pointer"
            ref={roomPickerRef}
            onClick={() => {
              setGuestNumberPickerVisible(false);
              setLocationPickerVisible(false);
              setRoomNumberPickerVisible(!roomNumberPickerVisible);
            }}
          >
            <img src={rooms} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2 relative">
              <div className="text-xs sm:text-sm">Number of rooms</div>
              <div className="flex">
                    <div className=" text-md sm:text-md font-bold capitalize">
                    {selectedBedrooms === "any" ? "Any" : selectedBedrooms}
                    </div>
                    {selectedBedrooms === 'any' && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                            fill="white"
                          />
                        </svg>}
                  </div>
            </div>
            {roomNumberPickerVisible && (
              <div className="absolute top-0 h-48 overflow-scroll no-scrollbar w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20">
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setSelectedBedrooms("any");
                      setRoomNumberPickerVisible(false);
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      Any
                    </div>
                  </li>
                  {Array.from(
                    //0 to 4
                    { length: 5 },
                    (_, i) => i
                  ).map((item) => (
                    <li
                      className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => {
                        setSelectedBedrooms(item);
                        setRoomNumberPickerVisible(false);
                      }}
                    >
                      <div className="text-md font-custom-bold text-primary">
                        {item === 1 ? item + " room" : item + " rooms"}
                      </div>
                      <div className="w-5 h-5">
                        {rooms === item && (
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
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                    onClick={() => {
                      setSelectedBedrooms(5);
                      setRoomNumberPickerVisible(false);
                    }}
                  >
                    <div className="text-md font-custom-bold text-primary">
                      5+ rooms
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* <div className='h-20 w-[2px] bg-white'></div> */}

          <div className="flex mx-5 gap-8">
            <div
              className="w-32 cursor-pointer h-6 md:h-10 self-center bg-white text-black hover:scale-105 transition duration-75 hover:bg-gray-200 rounded-lg border"
              onClick={() =>
                search({
                  location: location,
                  startDate: startDate,
                  endDate: endDate,
                  bedrooms: selectedBedrooms,
                  guests: selectedGuests,
                  bathrooms: selectedbathrooms,
                  priceRange: priceRange,
                  amenities: selectedAmenities,
                  luxe: luxe
                })
              }
            >
              <div className="relative h-full z-0 flex">
                <div className="w-full text-center font-custom-kiona text-primary self-center flex justify-center items-center">
                  Search
                </div>
              </div>
            </div>

            <div
              className="text-white text-[18px] font-bold flex items-center hover:scale-110 transition duration-75 cursor-pointer "
              onClick={() => setFilterVisible(true)}
            >
              <img src={filterIcon} alt="filter" className=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
