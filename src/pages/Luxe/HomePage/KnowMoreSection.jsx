import React from "react";
import luxe from "../../../assets/images/luxe.svg";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";

function KnowMoreSection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b  from-primary via-primary to-primary/60 rounded-tl-[50px] md:rounded-tl-[100px]">
      <div className="w-full container mx-auto flex flex-col lg:flex-row justify-center items-center mt-10 lg:px-20">
        <img
          src={
            `${config.STRAPI_URL}` +
            dynamicImages.find(
              (image) => image.attributes.name === "Luxe_KnowMore_Image.jpeg"
            ).attributes.url
          }
          alt="know more"
          className="w-full max-h-[450px]  m-5 object-cover rounded-2xl"
        ></img>
        <div className="text-center lg:text-left pl-4">
          <div className="relative">
            <div className="font-custom-kiona uppercase text-3xl text-white">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "KnowMoreSection_Heading"
                ).attributes.text}
            </div>
            <div className="absolute top-4 left-28 ml-2">
              <img src={luxe} alt="arrow" className="w-20 h-10" />
            </div>
          </div>
          <div className="font-normal text-lg"></div>
          <div className="text-md font-custom text-white pt-10">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "KnowMoreSection_Content"
              ).attributes.text}
          </div>

          <div className="flex justify-center lg:justify-start mt-5">
            <div
              className="w-[178px] h-12 bg-white hover:bg-secondary border text-primary shadow-lg hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md"
              onClick={() => navigate("/about")}
            >
              <div className=" text-xl h-full flex justify-center font-custom items-center">
                Know More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowMoreSection;
