import { React, useEffect, useState } from "react";
import LeftArrow from "../../assets/images/home/left.svg";
import PastTripCard from "./PastTripCard";
import UpcomingTripCard from "./UpcomingTripCard";
import DesktopNavbar from "../../components/desktopNavbarBlack";
import { getTrips } from "./api";

function Trips() {
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  useEffect(() => {
    getTrips().then((data) => {
      console.log(data);
      setTrips(data.trips);
      let upcomingTrips = [];
      let pastTrips = [];
      data.trips.forEach((trip) => {
        if (new Date(trip.checkInDate) > new Date()) {
          upcomingTrips.push(trip);
        } else {
          pastTrips.push(trip);
        }
      });
      setUpcomingTrips(upcomingTrips);
      setPastTrips(pastTrips);
    });
  }, []);
  const [selected, setSelected] = useState("upcoming");
  return (
    <>
      <div className="flex w-full h-full bg-white shadow-lg justify-between ">
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
            <div className="text-primary font-custom text-3xl capitalize">
              Trips
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3 md:hidden">
        <div
          className={`text-center w-full text-md font-bold 
                        ${
                          selected === "upcoming"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
          onClick={() => setSelected("upcoming")}
        >
          Upcoming
        </div>

        <div className="h-full w-[2px] mx-2">
          <hr className="w-[2px] h-[32px] bg-black"></hr>
        </div>

        <div
          className={`text-center w-full text-md font-bold 
                        ${
                          selected === "past" ? "text-black" : "text-gray-400"
                        }`}
          onClick={() => setSelected("past")}
        >
          Past
        </div>
      </div>

      <div className="md:block hidden container mx-auto">
        <div className="flex gap-10 m-5">
          <div
            className={`w-min px-5 py-1 rounded-2xl ${
              selected === "upcoming"
                ? "bg-primary"
                : "bg-transparent  border border-secondary"
            }`}
          >
            <div
              className={`text-center w-full text-md text-primary font-custom cursor-pointer
                        ${
                          selected === "upcoming" ? "text-white" : "text-black"
                        }`}
              onClick={() => setSelected("upcoming")}
            >
              Upcoming
            </div>
          </div>

          <div
            className={`w-min px-5 py-1 rounded-2xl cursor-pointer ${
              selected === "past"
                ? "bg-primary"
                : "bg-transparent  border border-secondary"
            }`}
          >
            <div
              className={`text-center w-full text-md font-custom text-primary 
                        ${selected === "past" ? "text-white" : "text-black"}`}
              onClick={() => setSelected("past")}
            >
              Past
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {selected === "upcoming" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-5">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <UpcomingTripCard trip={trip}></UpcomingTripCard>
              ))
            ) : (
              <div className="flex justify-center items-center h-96 col-span-full">
                <div className="text-2xl text-center font-bold">
                  No Upcoming Trips
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-5">
            {pastTrips.length > 0 ? (
              pastTrips.map((trip) => <PastTripCard trip={trip}></PastTripCard>)
            ) : (
              <div className="flex justify-center items-center h-96 col-span-full">
                <div className="text-2xl text-center font-bold">
                  No Past Trips
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Trips;
