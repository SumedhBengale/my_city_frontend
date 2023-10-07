import React, { useState, useEffect, useRef } from "react";
import config from "../../config/config.js";
import PropertyCard from "./PropertyCard.jsx";

const FeaturedProperties = ({ residences }) => {
  const scrollContainerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const itemWidth = window.innerWidth > 1200 ? 600 : 300;

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const containerWidth = scrollContainer.offsetWidth;
      const initialCenterIndex = Math.floor(containerWidth / itemWidth / 2);
      setCenterIndex(initialCenterIndex);
      scrollContainer.scrollLeft = initialCenterIndex * itemWidth;
    }
  }, [itemWidth]);

  const handleScroll = () => {
    setInitialLoad(false);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollX = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.offsetWidth;
      const newCenterIndex = Math.floor(
        (scrollX + containerWidth / 10) / itemWidth
      );
      setCenterIndex(newCenterIndex);
      console.log(newCenterIndex);
    }
  };

  return (
    <div
      className="flex h-full overflow-x-scroll scroll-smooth overflow-y-hidden no-scrollbar"
      style={{ scrollSnapType: "x-mandatory" }}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      <div
        className={`flex ${window.innerWidth > 1200 ? "h-[500px]" : "h-96"} `}
      >
        <div className="flex w-20/100 sm:w-30/100">
          <div className="w-full bg-transparent"></div>
        </div>

        {residences !== null ? (
          residences.map((review, index) => {
            const distanceFromCenter = Math.abs(index - centerIndex);
            const scale =
              distanceFromCenter === 0 ? 1.25 : 1 - distanceFromCenter * 0.1;
            return (
              <div
                key={index}
                onClick={() => {
                  //scroll till the item is at the center of the screen
                  scrollContainerRef.current.scrollLeft = index * itemWidth;
                }}
                className="flex items-center justify-center transition-all duration-300 hover:scale-105 ease-in cursor-pointer"
                style={{
                  width: `${itemWidth}px`,
                  transform: `${initialLoad ? "scale(1)" : `scale(${scale})`}`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className={` ${window.innerWidth > 1200 ? "h-80" : "h-72"} 
                w-2/3 p-4 bg-white rounded-2xl border relative`}
                >
                  {distanceFromCenter !== 0 && (
                    <div className="absolute h-full w-full top-0 left-0 backdrop-filter backdrop-blur-[2px] scale-105"></div>
                  )}
                  <div className="flex flex-col h-full">
                    <PropertyCard
                      residence={residences[0].residence}
                      key={residences[0].residence._id}
                      //If screen width > md, pass highlighted true
                      highlighted={window.innerWidth > 768 ? true : false}
                    ></PropertyCard>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <div className="flex w-20/100 sm:w-30/100 ">
          <div className="w-full bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
