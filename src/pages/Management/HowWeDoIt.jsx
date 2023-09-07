import React from "react";
import config from "../../config/config";

function HowWeDoIt({ dynamicText, dynamicImages }) {
  return (
    <>
      <div className="container mx-auto">
        <div className="font-custom text-4xl text-primary text-center sm:text-start sm:pl-5 pt-10 mb-10">
          How We Do It?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-20">
          <div className="w-full h-full flex justify-center">
            <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
              <div className="flex justify-center">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) =>
                        image.attributes.name === "HowWeDoIt_Image1.png"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
                />
              </div>
              <div className=" w-full text-center text-secondary  text-xl pt-5 capitalize">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Title1"
                  ).attributes.text}
              </div>
              <div className=" w-full text-center text-primary text-xs font-normal leading-7 my-4 ">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Content1"
                  ).attributes.text}
              </div>
            </div>
          </div>

          <div className="w-full h-full flex justify-center">
            <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
              <div className="flex justify-center">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) =>
                        image.attributes.name === "HowWeDoIt_Image2.png"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
                />
              </div>
              <div className=" w-full text-center text-secondary  text-xl  pt-5 capitalize leading-relaxed">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Title2"
                  ).attributes.text}
              </div>
              <div className=" w-full text-center text-primary text-xs font-normal leading-7 my-4 ">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Content2"
                  ).attributes.text}
              </div>
            </div>
          </div>

          <div className="w-full h-full flex justify-center">
            <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
              <div className="flex justify-center">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) =>
                        image.attributes.name === "HowWeDoIt_Image3.png"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
                />
              </div>
              <div className=" w-full text-center text-secondary  text-xl pt-5 capitalize leading-relaxed">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Title3"
                  ).attributes.text}
              </div>
              <div className=" w-full text-center text-primary text-xs font-normal leading-7 my-4">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Content3"
                  ).attributes.text}
              </div>
            </div>
          </div>

          <div className="w-full h-full flex justify-center">
            <div className=" w-full h-full m-5 bg-neutral-100 rounded-2xl border border-white px-3">
              <div className="flex justify-center">
                <img
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) =>
                        image.attributes.name === "HowWeDoIt_Image4.png"
                    ).attributes.url
                  }
                  alt="mcr"
                  className="w-full sm:w-1/2 md:w-[400px] h-[150px] object-cover mt-3 mb-3 rounded-lg"
                />
              </div>
              <div className=" w-full text-center text-secondary  text-xl  pt-5 capitalize leading-relaxed">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Title4"
                  ).attributes.text}
              </div>
              <div className=" w-full text-center text-primary text-xs font-normal leading-7 my-4 ">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HowWeDoIt_Content4"
                  ).attributes.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowWeDoIt;
