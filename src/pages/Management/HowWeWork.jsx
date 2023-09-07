import React from "react";
import config from "../../config/config";

function HowWeWork({ dynamicText, dynamicImages }) {
  return (
    <>
      <div className="flex-col">
        <div className="flex justify-center items-center p-5  gap-2 container mx-auto w-full ">
          <div className="text-center lg:text-left max-w-4xl">
            <div className="flex justify-center">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "HowWeWork_Key.svg"
                  ).attributes.url
                }
                alt="Key"
                className="h-32 w-32"
              />
            </div>
            <div className="text-primary text-center font-custom text-3xl capitalize pb-3">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "HowWeWork_Heading"
                ).attributes.text}
            </div>
            <div className=" w-full text-primary text-center text-md font-normal leading-normal pb-5">
              {dynamicText !== null &&
                dynamicText.find(
                  (text) => text.attributes.name === "HowWeWork_Subheading"
                ).attributes.text}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 px-4">
            <div className="flex flex-col justify-center items-center md:items-start gap-5 order-2 md:order-1 md:pl-10">
              <div className="flex flex-row md:flex-col gap-3 justify-center items-center md:items-start">
                <div className="border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center">
                  <div className="absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl">
                    1
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-center md:text-start font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "HowWeWork_Heading1"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-3/4 text-primary text-center md:text-start text-md font-normal leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeWork_Content1"
                  ).attributes.text}
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1 md:order-2">
              <img
                className="h-96 w-full lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_HowWeWork_Image1.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-100 px-4">
            <div className="flex flex-col justify-center items-center md:items-end gap-5 order-2 md:pr-10">
              <div className="flex flex-row md:flex-col gap-3 justify-center items-center md:items-end">
                <div className="border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center">
                  <div className="absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl">
                    2
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-center md:text-end font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "HowWeWork_Heading2"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-3/4 text-primary text-center md:text-end text-md font-normal leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeWork_Content2"
                  ).attributes.text}
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1">
              <img
                className="h-96 w-full  lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_HowWeWork_Image2.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 px-4">
            <div className="flex flex-col justify-center items-center md:items-start gap-5 order-2 md:order-1 md:pl-10">
              <div className="flex flex-row md:flex-col gap-3 justify-center items-center md:items-start">
                <div className="border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center">
                  <div className="absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl">
                    3
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="text-secondary drop-shadow-lg text-center md:text-start font-custom text-xl md:text-5xl capitalize">
                    {dynamicText !== null &&
                      dynamicText.find(
                        (text) => text.attributes.name === "HowWeWork_Heading3"
                      ).attributes.text}
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-3/4 text-primary text-center md:text-start text-md font-normal leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeWork_Content3"
                  ).attributes.text}
              </div>
            </div>
            <div className="flex justify-center w-full p-5 order-1 md:order-2">
              <img
                className="h-96 w-full lg:w-full rounded-md object-cover"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_HowWeWork_Image3.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <button className="bg-primary text-white font-custom text-2xl py-3 px-10 rounded-lg hover:bg-secondary hover:text-primary transition duration-300 ease-in-out">
            Get a Quote
          </button>
        </div>
      </div>
    </>
  );
}

export default HowWeWork;
