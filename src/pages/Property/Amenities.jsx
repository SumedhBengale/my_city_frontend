import React from "react";
import amenityIcon from "../../assets/images/property/amenity_icon.png";

function Amenities({amenities, showAmenities, setShowAmenities}) {
  console.log(amenities);
  return (
    <div className="w-full md:w-3/4">
      <div className="text-md md:text-xl text-start pt-5 text-primary uppercase pb-2 md:pl-5">
        Amenities
      </div>
      <div className="flex flex-col justify-start my-10 uppercase">
        {
          <div className={`grid grid-cols-2 gap-5 mb-5`}>
            {amenities[0] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[0]}</div>
              </div>
            </div>}
            {amenities[1] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[1]}</div>
              </div>
            </div>}
            {amenities[2] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[2]}</div>
              </div>
            </div>}
            {amenities[3] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[3]}</div>
              </div>
            </div>}
            {amenities[4] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[4]}</div>
              </div>
            </div>}
            {amenities[5] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[5]}</div>
              </div>
            </div>}
            {amenities[6] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[6]}</div>
              </div>
            </div>}
            {amenities[7] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[7]}</div>
              </div>
            </div>}
            {amenities[8] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[8]}</div>
              </div>
            </div>}
            {amenities[9] && <div className="flex justify-center">
              <div className="w-full h-10  -[1px]  hover:scale-105 transition duration-75  text-primary  rounded-xl flex justify-start items-center">
                <img
                  src={amenityIcon}
                  className="h-12 w-12"
                  alt="amenityIcon"
                />
                <div className="text-start text-sm px-1">{amenities[9]}</div>
              </div>
            </div>}

          </div>
        }
        <div className="flex justify-center">
          <button
            className="flex justify-center w-56  fill-primary border text-primary active:text-white hover:text-white border-primary hover:fill-white -primary hover:scale-105 transition duration-75 hover:bg-primary  bg-white  rounded-lg px-3 py-2"
            onClick={() => setShowAmenities(!showAmenities)}
          >
            <div className="font-custom-kiona text-md uppercase">{` ${
              showAmenities ? "Hide Amenities" : "Show All Amenities"
            }`}</div>
            {/*Down arrow svg */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 self-center ml-2 -translate-y-[1px] ${
                showAmenities ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 16a1 1 0 01-.707-.293l-6-6a1 1 0 111.414-1.414L10 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6A1 1 0 0110 16z"
                clipRule="evenodd"
              />
            </svg> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Amenities;
