import React from "react";
import config from "../../../config/config";
import luxe from "../../../assets/images/luxe.svg";
import { useNavigate } from "react-router-dom";

function IntroductionSection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:px-20 lg:pt-20 lg:pl-10 gap-10">
      <div className="text-center lg:text-left pr-5 flex flex-col justify-center items-center">
        <div className="w-full text-primary font-custom-kiona text-4xl text-center uppercase pb-3 pt-10">
          {dynamicText !== null &&
            dynamicText.find(
              (text) => text.attributes.name === "Introduction_Heading"
            ).attributes.text}
        </div>
        <div className="h-full my-3 w-full flex justify-center">
          <hr className="w-3/4 h-[2px] bg-secondary"></hr>
        </div>
        <div className=" w-full text-[#333333] text-md font-normal text-center leading-normal pb-5">
          {dynamicText !== null &&
            dynamicText.find(
              (text) => text.attributes.name === "Introduction_Description1"
            ).attributes.text}
        </div>
        <div className=" w-full text-[#333333] text-md font-normal text-center leading-normal pb-5">
          {dynamicText !== null &&
            dynamicText.find(
              (text) => text.attributes.name === "Introduction_Description2"
            ).attributes.text}
        </div>
        <button
          className="relative bg-primary  hover:bg-secondary border text-white shadow-lg hover:scale-105 transition duration-75 cursor-pointer font-custom text-lg py-3 px-5 rounded-lg"
          onClick={() =>
            navigate("/luxe/properties", {
              state: {
                limit: 100,
              },
            })
          }
        >
          <div>Explore Residences</div>
          <div className="absolute bottom-0 left-1 w-full flex justify-center">
            <img src={luxe} alt="arrow" className="w-14 h-7" />
          </div>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center gap-6">
        <div className="w-full flex flex-col items-center md:items-end">
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image1.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
          />
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image2.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-[300px] object-cover mt-3 mb-3 rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col items-center md:items-start">
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image3.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-[300px] object-cover mt-3 mb-3 rounded-lg"
          />
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image4.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;
