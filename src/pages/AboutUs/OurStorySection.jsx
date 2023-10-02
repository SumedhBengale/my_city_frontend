import React from "react";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

function OurStorySection({ dynamicText, dynamicImages }) {
  const navigate = useNavigate();
  return (
    <div>
      {dynamicText !== null && dynamicImages !== null && (
        <div className="bg-white rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center lg:px-20 pt-10 lg:pt-20 lg:pl-10 gap-2 container mx-auto">
            <div className="flex justify-center w-full">
              <img
                className=" h-[400px] md:h-full w-full sm:w-1/2 lg:w-full rounded-tl-[50px] md:rounded-tl-[100px] md:py-0 lg:pr-10 drop-shadow-lg"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "OurStory_Image.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
            <div className="text-center lg:text-left md:pr-5 gap-5">
              <div className="text-secondary font-custom-kiona text-2xl md:text-5xl capitalize pb-3 drop-shadow-lg">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "OurStory_Heading"
                  ).attributes.text}
              </div>
              <div className="flex flex-col">
                <div className=" w-full text-primary font-custom-avenir text-md pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurStory_Content1"
                    ).attributes.text}
                </div>
                <div className=" w-full text-primary text-md font-custom-avenir pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurStory_Content2"
                    ).attributes.text}
                </div>
                <div className="w-full flex justify-center md:justify-start">
                  <button
                  className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-56 my-3"
                  onClick={() => {
                    localStorage.getItem("luxe") === true ?
                    navigate("/properties", {
                      state: {
                        limit: 100,
                        luxe: true,
                      },
                    })
                    : 
                    navigate("/properties", {
                      state: {
                        limit: 100,
                      },
                    })
                  }}
                >
                  Explore Residences
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OurStorySection;
