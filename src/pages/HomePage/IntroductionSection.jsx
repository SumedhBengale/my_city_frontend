import React from "react";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

function IntroductionSection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:px-20 lg:pt-20 gap-10">
      <div className="text-center lg:text-left md:pr-5 flex flex-col justify-center items-center">
        <div className="w-full text-primary font-custom-kiona text-2xl md:text-4xl text-center uppercase pb-3 pt-10 md:pt-0">
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
          className="bg-primary font-custom-kiona hover:bg-secondary border text-white shadow-lg hover:scale-105 transition duration-75 cursor-pointer text-lg py-2 px-5 rounded-lg"
          onClick={() =>
            navigate("/properties", {
              state: {
                limit: 100,
              },
            })
          }
        >
          Explore Residences
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center gap-6 h-min md:h-full">
        <div className="w-full flex flex-col items-center md:items-end gap-6">
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image1.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-1/3 object-cover  rounded-lg"
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
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-2/3 object-cover  rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col items-center md:items-start gap-6">
          <img
            src={
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) =>
                  image.attributes.name === "HomePage_Introduction_Image3.jpg"
              ).attributes.url
            }
            alt="mcr"
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-2/3 object-cover  rounded-lg"
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
            className="w-full sm:w-1/2 md:w-[400px] h-[150px] md:h-1/3 object-cover  rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;
