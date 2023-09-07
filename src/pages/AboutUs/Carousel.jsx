import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPartners } from "./api";
import config from "../../config/config";

const Carousel = () => {
  const [partners, setPartners] = useState(null);
  const nextButton = React.useRef(null);
  useEffect(() => {
    getPartners()
      .then((res) => {
        console.log(res.data);
        setPartners(res.data);
      })
      .catch((err) => {});
    //Infinitely click next button and close the loop when the component unmounts
    const interval = setInterval(() => {
      nextButton?.current?.click();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const slider = React.useRef(null);
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: window.innerWidth > 768 ? 4 : 1,
    slidesToScroll: 1,
    prevArrow: false,
    autoPlay: true,
    nextArrow: false,
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <button
            className="bg-white w-full text-white z-20 flex justify-end items-center"
            onClick={() => {
              slider?.current.slickPrev();
            }}
          ></button>
          <Slider {...settings} className="slider w-5/6" ref={slider}>
            {partners ? (
              partners.map((partner) => (
                <div key={partner.id} className="partner-card text-center">
                  <div className="h-20 flex justify-center w-full">
                    <img
                      src={
                        `${config.STRAPI_URL}` +
                        partner.attributes.image.data.attributes.url
                      }
                      alt="Profile"
                      className="w-32 object-fit"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
              </div>
            )}
          </Slider>
          <button
            ref={nextButton}
            className="bg-white w-full text-white z-20 flex justify-start items-center"
            onClick={() => {
              slider?.current.slickNext();
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
