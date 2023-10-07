import React from "react";
import { useNavigate } from "react-router-dom";
import luxe from "../../../assets/images/luxe.svg";

function PropertyCard({ residence, highlighted }) {
  const [highlight, setHighlight] = React.useState(highlighted);

  //Function to highjack the highlight property
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(highlighted)}
      className={` w-full  md:w-400 max-w-[400px] cursor-pointer ${
        highlight
          ? "bg-primary text-white"
          : "bg-gray-200 hover:bg-gray-300 text-black"
      }${
        highlighted ? "scale-125" : ""
      } transition duration-75 rounded-2xl backdrop-blur-[185px] pb-5 mb-5`}
      onClick={() =>
        navigate(`/property/${residence._id}`, {
          state: {
            guests: localStorage.getItem("guestCount")
              ? localStorage.getItem("guestCount")
              : 1,
          },
        })
      }
    >
      <div className="relative w-full">
        <div className="absolute bottom-7 left-3 rounded-full pl-4 text-sm font-semibold ">
          <div className="flex text-white justify-center items-center">
            <div className=" text-lg font-custom-lora font-normal">£</div>
            <div className=" text-lg font-custom-kiona">
              {residence.prices.basePrice}
            </div>
            <div className=" text-sm font-custom-kiona font-normal">/night</div>
          </div>
        </div>
        <div className="w-full p-4">
          <img
            className="w-full rounded-xl h-40 md:h-32 lg:h-56 object-cover"
            src={
              residence.pictures[0].original
                ? residence.pictures[0].original
                : residence.pictures[0].thumbnail
            }
            alt="Thumbnail"
          />
        </div>
      </div>
      <div className="px-6 pb-2">
        <div
          className={`font-custom-kiona ${
            highlight ? "text-white" : "text-primary"
          } text-md lg:text-lg mb-1 overflow-ellipsis line-clamp-1`}
        >
          {residence.title.toString()}
        </div>
        <p className=" text-xs lg:text-sm line-clamp-1">{`${residence.address.full.replace(
          /\d+,?\s*/g,
          ""
        )}`}</p>
      </div>

      {/*Also fetch these values from the API */}
      <div className="flex mx-5 flex-row">
        <div className="flex justify-start gap-2 w-full text-sm">
          <div className="flex">
            <svg
              className="mt-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={`
          ${highlight ? "white" : "#262150"}
        `}
            >
              <path
                d="M9.09091 8.3H9.59091V7.8V2.23333H16.3636C18.1194 2.23333 19.5 3.58306 19.5 5.2V12.5H18.6818V10.4V9.9H18.1818H1.81818H1.31818V10.4V12.5H0.5V0.5H1.31818V7.8V8.3H1.81818H9.09091ZM7.68182 4.33333C7.68182 5.46928 6.70574 6.43333 5.45455 6.43333C4.20336 6.43333 3.22727 5.46928 3.22727 4.33333C3.22727 3.19739 4.20336 2.23333 5.45455 2.23333C6.70574 2.23333 7.68182 3.19739 7.68182 4.33333Z"
                stroke={`
          ${highlight ? "white" : "#262150"}
        `}
              />
            </svg>
            <div
              className={`pl-1 ${highlight ? "text-white" : "text-primary"}`}
            >
              {residence.beds}
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={`
          ${highlight ? "white" : "#262150"}
        `}
            >
              <path
                d="M12.7348 7.98438C12.7451 7.75903 12.9324 7.57812 13.1602 7.57812H13.4062H15.2812H15.5273C15.7551 7.57812 15.9424 7.75903 15.9527 7.98438H15.8203H12.8672H12.7348ZM15.8203 9.45312C18.1539 9.45312 20.065 11.3006 20.1675 13.6094H8.51995C8.62249 11.3006 10.5336 9.45312 12.8672 9.45312H15.8203Z"
                stroke={`
          ${highlight ? "white" : "#262150"}
        `}
              />
              <path
                d="M9.65625 1.95312C12.1028 1.95312 14.1365 3.76022 14.4918 6.10938H14.0805C13.729 3.98445 11.8795 2.35938 9.65625 2.35938H7.78125C5.30812 2.35938 3.29688 4.37062 3.29688 6.84375V17.8281V17.8594V18.3281V18.3594V22.0469H2.89062V6.84375C2.89062 4.1475 5.085 1.95312 7.78125 1.95312H9.65625Z"
                stroke={`
          ${highlight ? "white" : "#262150"}
        `}
              />
              <path
                d="M7.78125 15.0781H20.9062C21.0178 15.0781 21.1094 15.1697 21.1094 15.2812C21.1094 15.3928 21.0178 15.4844 20.9062 15.4844H7.78125C7.66969 15.4844 7.57812 15.3928 7.57812 15.2812C7.57812 15.1697 7.66969 15.0781 7.78125 15.0781Z"
                stroke={`
          ${highlight ? "white" : "#262150"}
        `}
              />
            </svg>

            <div
              className={`pl-1 ${highlight ? "text-white" : "text-primary"}`}
            >
              {residence.bathrooms}
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mt-[2px]"
              fill={highlight ? "white" : "#262150"}
            >
              <path
                d="M11.5 4C11.5 5.93386 9.93386 7.5 8 7.5C6.06614 7.5 4.5 5.93386 4.5 4C4.5 2.06614 6.06614 0.5 8 0.5C9.93386 0.5 11.5 2.06614 11.5 4ZM0.5 14C0.5 13.5186 0.737162 13.06 1.21364 12.6202C1.69352 12.1773 2.38208 11.7882 3.18469 11.4666C4.79071 10.8233 6.7275 10.5 8 10.5C9.2725 10.5 11.2093 10.8233 12.8153 11.4666C13.6179 11.7882 14.3065 12.1773 14.7864 12.6202C15.2628 13.06 15.5 13.5186 15.5 14V15C15.5 15.2739 15.2739 15.5 15 15.5H1C0.726142 15.5 0.5 15.2739 0.5 15V14Z"
                stroke={highlight ? "white" : "#262150"}
              />
            </svg>

            <div
              className={`pl-1 ${highlight ? "text-white" : "text-primary"}`}
            >
              {residence.accommodates}
            </div>
          </div>
        </div>
        <div className="text-sm  text-start overflow-ellipsis">
          <img src={luxe} alt="host" className="w-14 md:w-20 h-full" />
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
