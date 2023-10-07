import React from "react";
import amenityIcon from "../../assets/images/property/amenity_icon.png";
import config from "../../config/config";

function Amenities({amenities, showAmenities, setShowAmenities, amenityIcons}) {
  console.log(amenities);
  return (
    <div className="w-full md:w-3/4">
      <div className="text-md md:text-xl text-start pt-5 text-primary uppercase pb-2 md:pl-5">
        Amenities
      </div>
      <div className="flex flex-col justify-start my-10 uppercase">
        {
          <div className={`grid grid-cols-2 gap-5 mb-5`}>
            {amenities[0] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[0]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[0]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[0]}</div>
                </div>
              </div>
            }
            {amenities[1] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[1]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[1]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[1]}</div>
                </div>
              </div>
            }
            {amenities[2] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[2]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[2]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[2]}</div>
                </div>
              </div>
            }
            {amenities[3] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[3]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[3]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[3]}</div>
                </div>
              </div>
            }
            {amenities[4] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[4]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[4]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[4]}</div>
                </div>
              </div>
            }
            {amenities[5] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[5]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[5]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[5]}</div>
                </div>
              </div>
            }
            {amenities[6] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[6]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[6]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[6]}</div>
                </div>
              </div>
            }
            {amenities[7] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[7]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[7]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[7]}</div>
                </div>
              </div>
            }
            {amenities[8] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[8]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[8]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[8]}</div>
                </div>
              </div>
            }
            {amenities[9] && 
              <div className="flex justify-center">
                <div className="w-full h-10 -[1px] hover:scale-105 transition duration-75  rounded-xl flex justify-start items-center">
                  {amenityIcons.find(
                        (image) => image.attributes.name === amenities[9]
                      ) ? <img
                    src={
                      config.STRAPI_URL +
                      amenityIcons.find(
                        (image) => image.attributes.name === amenities[9]
                      ).attributes.icon.data.attributes.url
                    }
                    className="h-8 w-8"
                    alt="amenityIcon"
                  /> : null}
                  <div className="text-start text-sm px-1">{amenities[9]}</div>
                </div>
              </div>
            }

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
          </button>
        </div>
      </div>
    </div>
  );
}

export default Amenities;
