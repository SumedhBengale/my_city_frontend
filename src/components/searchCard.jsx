import React, { useEffect, useState } from "react";
import filterIcon from "../assets/images/home/filter_icon.svg";
import locationPin from "../assets/images/home/location_pin.svg";
import calendar from "../assets/images/home/calendar.svg";
import guests from "../assets/images/home/guests.svg";
import rooms from "../assets/images/home/rooms.svg";
import Filter from "../components/filter";
import DateRangePicker from "./DateRangePicker";
import { getCities } from "./api";

function SearchCard({ search }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState("any");
  const [selectedGuests, setSelectedGuests] = useState("any");
  const [selectedbathrooms, setSelectedbathrooms] = useState("any");
  const [location, setLocation] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [cities, setCities] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [guestNumberPickerVisible, setGuestNumberPickerVisible] =
    useState(false);
  const [roomNumberPickerVisible, setRoomNumberPickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const cardBackdropRef = React.useRef(null);
  const guestPickerDesktopRef = React.useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className="md:px-5 z-20"
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
            }}
            close={() => setFilterVisible(false)}
          ></Filter>
        </div>
      )}
      {datePickerVisible && (
        <div
          className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm"
          //when clicked outside the date picker, close the date picker
          onClick={(e) => {
            if (
              e.target.className ===
              "fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-30 backdrop-filter backdrop-blur-sm"
            ) {
              setDatePickerVisible(false);
            }
          }}
        >
          <DateRangePicker
            initialStartDate={startDate}
            initialEndDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            returnData={(data) => {
              setDatePickerVisible(false);
              setStartDate(data.startDate);
              setEndDate(data.endDate);
            }}
            blockBooking={() => null}
          ></DateRangePicker>
        </div>
      )}
      <div className="px-2 sm:px-10 w-full flex justify-center">
        <div className="z-0 m-4 w-full md:w-full lg:w-full h-min md:h-min bg-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md lg:hidden">
          <div className="grid grid-cols-2 gap-3 md:gap-9 text-white">
            <div className="col-span-2 flex justify-between">
              {/* Location and Filter */}
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  setGuestNumberPickerVisible(false);
                  setRoomNumberPickerVisible(false);
                  setLocationPickerVisible(!locationPickerVisible);
                }}
              >
                <img src={locationPin} alt="location pin" className=""></img>
                <div className="pl-2">
                  <div className="text-xs sm:text-sm">Select Location</div>
                  <div className=" text-md sm:text-md font-bold">
                    {location
                      ? location === "any"
                        ? "Select"
                        : location.city
                      : "Select"}
                  </div>
                </div>
                {locationPickerVisible && (
                  <div className="absolute top-0 h-min w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20">
                    <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                      {cities !== null ? (
                        cities.map((city) => {
                          return (
                            <li
                              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setLocation(city);
                                setLocationPickerVisible(false);
                              }}
                            >
                              <div className="text-md font-custom-bold text-primary">
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
                  className="flex active:scale-90 transition ease-in duration-50"
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
                      {startDate.getDate() +
                        "/" +
                        (startDate.getMonth() + 1) +
                        "/" +
                        startDate.getFullYear()}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex justify-between">
                  {/* Number of Guests and Rooms Selector */}
                  <div
                    className="flex relative"
                    onClick={() => {
                      setRoomNumberPickerVisible(false);
                      setLocationPickerVisible(false);
                      setGuestNumberPickerVisible(!guestNumberPickerVisible);
                    }}
                  >
                    <img src={guests} alt="calendar" className=""></img>
                    <div className="pl-2">
                      <div className="text-xs sm:text-sm">Number of guests</div>
                      <div className=" text-md sm:text-md font-bold">
                        {selectedGuests === "any" ? "Any" : selectedGuests}
                      </div>
                    </div>
                    {guestNumberPickerVisible && (
                      <div className="absolute top-0 h-min w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20">
                        <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                          <li
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                  className="flex active:scale-90 transition ease-in duration-50 "
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
                      {endDate.getDate() +
                        "/" +
                        (endDate.getMonth() + 1) +
                        "/" +
                        endDate.getFullYear()}
                    </div>
                  </div>
                </div>

                <div
                  className="flex relative"
                  onClick={() => {
                    setGuestNumberPickerVisible(false);
                    setLocationPickerVisible(false);
                    setRoomNumberPickerVisible(!roomNumberPickerVisible);
                  }}
                >
                  <img src={rooms} alt="calendar" className=""></img>
                  <div className="pl-2">
                    <div className="text-xs sm:text-sm">Number of rooms</div>
                    <div className=" text-md sm:text-md font-bold">
                      {selectedBedrooms === "any" ? "Any" : selectedBedrooms}
                    </div>
                  </div>
                  {roomNumberPickerVisible && (
                    <div className="absolute top-0 h-min w-40 translate-y-16 bg-white rounded-lg shadow-lg z-20">
                      <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                        <li
                          className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                          className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
              className="w-full col-span-2 h-10 md:mb-3 bg-white text-black active:scale-105 transition duration-75 cursor-pointer active:bg-gray-200 rounded-lg"
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
                <div className="w-full text-center self-center font-black flex justify-center items-center">
                  Search
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-0 py-8 w-full max-w-7xl bg-white text-white bg-opacity-5 p-5 rounded-2xl border backdrop-blur-md hidden lg:block">
        <div className="col-span-2 flex justify-around gap-5">
          <div
            className="flex items-center"
            onClick={() => {
              setGuestNumberPickerVisible(false);
              setRoomNumberPickerVisible(false);
              setLocationPickerVisible(!locationPickerVisible);
            }}
          >
            <img src={locationPin} alt="location pin" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-[12px]">Select Location</div>
              <div className="font-bold  text-xl">
                {location
                  ? location === "any"
                    ? "Select"
                    : location.city
                  : "Select"}
              </div>
            </div>
            {locationPickerVisible && (
              <div className="absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20">
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                  {cities !== null ? (
                    cities.map((city) => {
                      return (
                        <li
                          className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setLocation(city);
                            setLocationPickerVisible(false);
                          }}
                        >
                          <div className="text-md font-custom-bold text-primary">
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
            className="flex items-center active:scale-90 transition ease-in duration-50"
            onClick={() => setDatePickerVisible(!datePickerVisible)}
          >
            <img src={calendar} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Check-in Date</div>
              <div className=" text-md sm:text-md font-bold">
                {startDate.getDate() +
                  "/" +
                  (startDate.getMonth() + 1) +
                  "/" +
                  startDate.getFullYear()}
              </div>
            </div>
          </div>

          <div className="h-20 w-[2px] bg-white"></div>

          <div
            className="flex items-center active:scale-90 transition ease-in duration-50"
            onClick={() => setDatePickerVisible(!datePickerVisible)}
          >
            <img src={calendar} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Check-out Date</div>
              <div className=" text-md sm:text-md font-bold">
                {endDate.getDate() +
                  "/" +
                  (endDate.getMonth() + 1) +
                  "/" +
                  endDate.getFullYear()}
              </div>
            </div>
          </div>
          <div className="h-20 w-[2px] bg-white"></div>

          <div
            className="flex items-center"
            ref={guestPickerDesktopRef}
            onClick={() => {
              setRoomNumberPickerVisible(false);
              setLocationPickerVisible(false);
              setGuestNumberPickerVisible(!guestNumberPickerVisible);
            }}
          >
            <img src={guests} alt="calendar relative" className="w-8 h-8"></img>
            <div className="pl-2">
              <div className="text-xs sm:text-sm">Number of guests</div>
              <div className=" text-md sm:text-md font-bold">
                {selectedGuests === "any" ? "Any" : selectedGuests}
              </div>
            </div>
            {guestNumberPickerVisible && (
              <div className="absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20">
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
            className="flex items-center"
            onClick={() => {
              setGuestNumberPickerVisible(false);
              setLocationPickerVisible(false);
              setRoomNumberPickerVisible(!roomNumberPickerVisible);
            }}
          >
            <img src={rooms} alt="calendar" className="w-8 h-8"></img>
            <div className="pl-2 relative">
              <div className="text-xs sm:text-sm">Number of rooms</div>
              <div className=" text-md sm:text-md font-bold">
                {selectedBedrooms === "any" ? "Any" : selectedBedrooms}
              </div>
            </div>
            {roomNumberPickerVisible && (
              <div className="absolute top-0 h-min w-48 translate-y-24 bg-white rounded-lg shadow-lg z-20">
                <ul className="flex flex-col gap-2  text-black border font-bold rounded-lg">
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
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
              className="w-32 h-6 md:h-10 self-center bg-white text-black hover:scale-105 transition duration-75 cursor-pointer hover:bg-gray-200 rounded-lg border"
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
              <div className="relative h-full z-0 flex">
                <div className="w-full text-center font-bold self-center flex justify-center items-center">
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
