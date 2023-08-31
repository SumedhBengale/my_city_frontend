import React, { useState } from 'react';


const Carousel = ({images, currIndex}) => {
  console.log(images)
  const [currentIndex, setCurrentIndex] = useState(currIndex);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff > 50) {
      handlePrev();
    } else if (touchDiff < -50) {
      handleNext();
    }
  };

  return (
    <div
      className="w-full h-[300px] md:h-[500px] relative overflow-hidden rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.original ? image.original : image.thumbnail}
          alt={`placeholder-${index}`}
          className={`w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 transform ${currentIndex === index ? 'translate-x-0' : currentIndex > index ? '-translate-x-full' : 'translate-x-full'} absolute top-0 left-0`}
        />
      ))}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl font-bold"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl font-bold"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;