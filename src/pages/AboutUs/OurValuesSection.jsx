import React from "react";
import config from "../../config/config";

function OurValuesSection({ dynamicText, dynamicImages }) {
  return (
    <>
      {dynamicText !== null && dynamicImages !== null && (
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-secondary font-custom text-center text-5xl capitalize">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "OurValues_Heading"
                ).attributes.text}
            </div>
            <div className="text-primary text-md pt-5 md:w-2/3 text-center">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "OurValues_Subheading"
                ).attributes.text}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center md:items-start gap-5 order-2 md:order-1 md:pl-10">
              <div className="flex flex-col gap-3 justify-center items-center md:items-start">
                <span className="text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "OurValues_ContentHighlight1"
                    ).attributes.text}
                </span>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-start font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "OurValues_Heading1"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-3/4 leading-normal pb-5">
                <div className=" text-primary text-start text-md font-normal">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurValues_Content1"
                    ).attributes.text}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1 md:order-2">
              <img
                className="h-full w-full max-h-[600px] lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "OurValues_Image1.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center md:items-end gap-5 order-2 md:pr-10">
              <div className="flex flex-col gap-3 justify-center items-center md:items-end">
                <span className="text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "OurValues_ContentHighlight2"
                    ).attributes.text}
                </span>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-end font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "OurValues_Heading2"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-3/4 leading-normal pb-5">
                <div className=" text-primary text-end text-md font-normal">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurValues_Content2"
                    ).attributes.text}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1">
              <img
                className="h-full w-full max-h-[600px] lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "OurValues_Image2.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center md:items-start gap-5 order-2 md:order-1 md:pl-10">
              <div className="flex flex-col gap-3 justify-center items-center md:items-start">
                <span className="text-primary">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "OurValues_ContentHighlight3"
                    ).attributes.text}
                </span>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-start font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "OurValues_Heading3"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-3/4 leading-normal pb-5">
                <div className=" text-primary text-start text-md font-normal">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurValues_Content3"
                    ).attributes.text}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1 md:order-2">
              <img
                className="h-full w-full max-h-[600px] lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "OurValues_Image3.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        <button className="bg-primary hover:bg-secondary text-white font-custom text-2xl py-2 px-5 rounded-lg mt-10 mb-10">
          Explore Residences
        </button>
      </div>
    </>
  );
}

export default OurValuesSection;
