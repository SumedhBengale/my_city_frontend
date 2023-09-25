import React from "react";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

function OurTeamSection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <>
      {dynamicText !== null && dynamicImages !== null ? (
        <div className="Rectangle w-full bg-neutral-100 md:px-10 pt-10 mt-10">
          <div className="container mx-auto flex flex-col items-center">
            <div className="text-secondary font-custom-kiona text-center text-2xl md:text-5xl">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "OurTeam_Heading"
                ).attributes.text}
            </div>

            <div className="text-primary text-custom text-md pt-5 md:w-2/3 text-center">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "OurTeam_Subheading"
                ).attributes.text}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center mt-10 md:gap-20">
              <div className="w-full flex flex-col items-center md:items-end">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) => image.attributes.name === "OurTeam_Image1.jpg"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[300px] md:h-[500px] object-cover mt-10 mb-10 rounded-lg"
                />
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) => image.attributes.name === "OurTeam_Image2.jpg"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[300px] object-cover mt-10 mb-10 rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col items-center md:items-start">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) => image.attributes.name === "OurTeam_Image3.jpg"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[300px] object-cover mt-10 mb-10 rounded-lg"
                />
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) => image.attributes.name === "OurTeam_Image4.jpg"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[300px] md:h-[500px] object-cover mt-10 mb-10 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-56 my-3"
            onClick={() => {
              navigate('/messages')
            }}
            >
              Chat with us
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}

export default OurTeamSection;
