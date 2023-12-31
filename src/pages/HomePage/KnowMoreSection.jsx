import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

function KnowMoreSection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full container mx-auto flex flex-col lg:flex-row justify-center items-center mt-10 lg:px-20">
        <img
          src={
            `${config.STRAPI_URL}` +
            dynamicImages.find(
              (image) => image.attributes.name === "KnowMore_Image.jpeg"
            ).attributes.url
          }
          alt="know more"
          className="w-full max-h-[450px]  m-5 object-cover rounded-2xl"
        ></img>
        <div className="text-center lg:text-left pl-4">
          <div className="font-custom-kiona text-primary uppercase text-3xl">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "KnowMoreSection_Heading"
              ).attributes.text}
          </div>
          <div className="font-normal font-custom text-lg text-secondary">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "KnowMoreSection_Subheading"
              ).attributes.text}
          </div>
          <div className="text-md font-custom-avenir text-slate-700 pt-5">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "KnowMoreSection_Content"
              ).attributes.text}
          </div>

          <div className="flex justify-center lg:justify-start mt-5">
            <div
              className="w-[178px] h-12  bg-primary hover:bg-secondary border text-white shadow-lg hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md"
              onClick={() => navigate("/about")}
            >
              <div className=" text-xl h-full flex justify-center font-custom-kiona items-center">
                Know More
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KnowMoreSection;
