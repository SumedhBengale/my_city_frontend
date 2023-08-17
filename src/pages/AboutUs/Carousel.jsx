import React, { useEffect, useState } from 'react';
import Left from '../../assets/images/about/left.svg';
import Right from '../../assets/images/about/right.svg';
import Partner1 from '../../assets/images/about/partner_1.png';
import { getPartners } from './api';
import config from '../../config/config.js';

const Carousel = () => {

  const [slides, setSlides] = useState(null);

  useEffect(() => {
    getPartners().then((res) => {
      console.log(res.data);
      setSlides(res.data);
    });
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerPage = 
    window.innerWidth > 800 ? 5 : window.innerWidth > 768 ? 3 : 1;

  const handleClickPrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleClickNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <>
      <div className="container mx-auto w-full flex justify-center">
        <div className="flex justify-between w-full">
          <button className="mr-2 px-4 py-2 text-black font-bold">
            <img
              src={Left}
              alt="Left"
              className="w-5 h-5 hover:scale-125 transition duration-75"
              onClick={handleClickPrev}
            />
          </button>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full h-40 overflow-hidden">
              {slides !== null &&<div
                className="flex absolute h-full gap-10 "
                style={{
                  transform: `translateX(-${
                    (currentSlide * 100) / slides.length
                  }%)`,
                  transition: 'transform 0.5s ease-in-out',
                  width: `${slides.length * (100 / itemsPerPage)}%`,
                }}
              >
                {slides !== null && slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`w-${100 / itemsPerPage -3} flex justify-center`}
                  >
                    <img
                      src={`${config.STRAPI_URL}`+slide.attributes.image.data.attributes.url}
                      alt={`Slide ${index + 1}`}
                      className={`object-stretch w-96 h-full`}
                    />
                  </div>
                ))}
              </div>}
            </div>
          </div>
          <button className="ml-2 px-4 py-2 text-black font-bold">
            <img
              src={Right}
              alt="Right"
              className="w-5 h-5 hover:scale-125 transition duration-75"
              onClick={handleClickNext}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        {slides !== null && slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentSlide ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
