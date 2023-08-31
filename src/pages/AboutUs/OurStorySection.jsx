import React from "react";
import config from "../../config/config";

function OurStorySection({ dynamicText, dynamicImages }) {
  return (
    <div>
      {dynamicText !== null && dynamicImages !== null && (
        <div className="bg-white -translate-y-24 rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:px-20 lg:pt-20 lg:pl-10 gap-2 container mx-auto">
            <div className="flex justify-center w-full">
              <img
                className=" h-[400px] lg:h-[600px] w-full sm:w-1/2 lg:w-full rounded-tl-[80px] py-5 lg:pr-10"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) => image.attributes.name === "OurStory_Image.jpg"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            </div>
            <div className="text-center lg:text-left pr-5 gap-5">
              <div className="text-secondary font-custom text-5xl capitalize pb-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "OurStory_Heading"
                  ).attributes.text}
              </div>
              <div className="flex flex-col">
                <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurStory_Content1"
                    ).attributes.text}
                </div>
                <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "OurStory_Content2"
                    ).attributes.text}
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
