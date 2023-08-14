import React, { useState } from 'react';
import Left from '../../assets/images/about/left.svg';
import Right from '../../assets/images/about/right.svg';
import Partner1 from '../../assets/images/about/partner_1.png';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      <img src={Partner1} alt="Partner 1" className="object-cover" />,
      <img src={Partner1} alt="Partner 1" className="object-cover" />,
      <img src={Partner1} alt="Partner 1" className="object-cover" />,
      <img src={Partner1} alt="Partner 1" className="object-cover" />,
      <img src={Partner1} alt="Partner 1" className="object-cover" />,
    ];
  
    const handleClickPrev = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };
  
    const handleClickNext = () => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };
  
    return (
      <>
        <div className='container mx-auto w-full flex justify-center'>
          <div className='flex justify-between w-96'>
              <button
                  className="mr-2 px-4 py-2 text-black font-bold"
                  >
                  <img src={Left} alt="Left" className="w-5 h-5 hover:scale-125 transition duration-75" onClick={handleClickPrev}/>
              </button>
              <div className="w-full flex flex-col items-center">
              <div className="relative w-full h-40 overflow-hidden">
                  <div
                  className="flex absolute h-full"
                  style={{
                      transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
                      transition: 'transform 0.5s ease-in-out',
                      width: `${slides.length * 100}%`,
                  }}
                  >
                  {slides.map((slide, index) => (
                      <div key={index} className="w-full flex justify-center">
                      <p className="font-custom-bold text-2xl flex justify-start items-center font-bold mx-2">{slide}</p>
                      </div>
                  ))}
                  </div>
              </div>
              
              </div>
              <button
                  className="ml-2 px-4 py-2 text-black font-bold"
                  >
                  <img src={Right} alt="Right" className="w-5 h-5 hover:scale-125 transition duration-75" onClick={handleClickNext}/>
      
              </button>
          </div>
        </div>
        <div className="flex justify-center mt-2">
        {slides.map((_, index) => (
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