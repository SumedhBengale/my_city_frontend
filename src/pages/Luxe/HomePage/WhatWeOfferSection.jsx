import React from "react";
import luxe from "../../../assets/images/luxe.svg";
import config from "../../../config/config";

function WhatWeOfferSection({ dynamicText, dynamicImages }) {
  return (
    <>
      <div className="w-full bg-white flex flex-col justify-center items-center mt-5 backdrop-blur-[185px] pb-10 px-5">
        <div className="w-full container mx-auto">
          <div className="font-custom text-3xl text-center mt-10 text-primary">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "WhatWeOffer_Heading"
              ).attributes.text}
          </div>
          <div className="text-center text-secondary text-md  capitalize">
            {dynamicText !== null &&
              dynamicText.find(
                (text) => text.attributes.name === "WhatWeOffer_Subheading"
              ).attributes.text}
          </div>
          <div className="flex flex-col lg:flex-row text-center items-center lg:items-start justify-around gap-10">
            <div className="flex flex-col justify-center items-center mt-10 max-w-[400px]">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name === "WhatWeOffer_1_Image.svg"
                  ).attributes.url
                }
                alt="booking"
                className="w-16"
              ></img>
              <div className="flex justify-around relative mt-5">
                <div className="flex justify-center items-center">
                  <img src={luxe} alt="arrow" className="w-12 h-6" />
                </div>
                <div className="font-custom-bold  font-normal text-2xl text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "WhatWeOffer_1_Heading"
                    ).attributes.text}
                </div>
              </div>
              <div className="text-md text-primary text-center pt-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "WhatWeOffer_1_Subheading"
                  ).attributes.text}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 max-w-[400px]">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name === "WhatWeOffer_2_Image.svg"
                  ).attributes.url
                }
                alt="booking"
                className="w-16"
              ></img>
              <div className="flex justify-around relative mt-5">
                <div className="flex justify-center items-center">
                  <img src={luxe} alt="arrow" className="w-12 h-6" />
                </div>
                <div className="font-custom-bold  font-normal text-2xl text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "WhatWeOffer_2_Heading"
                    ).attributes.text}
                </div>
              </div>
              <div className="text-md text-primary text-center pt-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "WhatWeOffer_2_Subheading"
                  ).attributes.text}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-10 max-w-[400px]">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name === "WhatWeOffer_3_Image.svg"
                  ).attributes.url
                }
                alt="booking"
                className="w-16"
              ></img>
              <div className="flex justify-around relative mt-5">
                <div className="flex justify-center items-center">
                  <img src={luxe} alt="arrow" className="w-12 h-6" />
                </div>
                <div className="font-custom-bold font-normal text-2xl text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "WhatWeOffer_3_Heading"
                    ).attributes.text}
                </div>
              </div>
              <div className="text-md text-primary text-center pt-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "WhatWeOffer_3_Subheading"
                  ).attributes.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhatWeOfferSection;
