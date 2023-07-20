import React, { useState, useEffect, useRef } from 'react';
import placeholder_user_image from '../../assets/images/home/placeholder_user_image.jpg';

const HorizontalScrollView = () => {
  const scrollContainerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const itemWidth = 300; // Adjust this value according to your element width

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const containerWidth = scrollContainer.offsetWidth;
      const initialCenterIndex = Math.floor(containerWidth / itemWidth / 2);
      setCenterIndex(initialCenterIndex);
      scrollContainer.scrollLeft = initialCenterIndex * itemWidth;
    }
  }, []);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollX = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.offsetWidth;
      const newCenterIndex = Math.floor((scrollX + containerWidth / 2) / itemWidth);
      setCenterIndex(newCenterIndex);
    }
  };

  return (
    <div
      className="flex h-full overflow-x-scroll scroll-smooth overflow-y-hidden"
      style={{ scrollSnapType: 'x mandatory' }}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      <div className="flex p-4 space-x-4 h-96">
        {Array.from(Array(10).keys()).map((index) => {
          const distanceFromCenter = Math.abs(index - centerIndex);
          const scale = distanceFromCenter === 0 ? 1.25 : 1 - distanceFromCenter * 0.1;
          return (
            <div
              key={index}
              className="flex-none flex items-center justify-center transition-all duration-300"
              style={{
                width: `${itemWidth}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
            >
              <div className="Rectangle h-72 w-2/3 p-4 bg-neutral-100 rounded-2xl border backdrop-blur-[185px]" >
                <div className='flex justify-center flex-col'>
                  <div className='w-full flex justify-center'>
                    <img src={placeholder_user_image} alt="demo user" className="rounded-full w-1/4" />
                  </div>
                  <div className='text-center text-md'>Asheem</div>
                  <div className='text-slate-400 text-[12px] text-center'>May 4</div>
                  <div className='text-[14px] text-center line-clamp-6 w-full text-slate-700'>Great stay, didnt have any time for leisure as we were working in the area but a great place to stay exactly as described on the website. Would stay again if working in the area.Great stay, didnt have any time for leisure as we were working in the area but a great place to stay exactly as described on the website. Would stay again if working in the area.</div>
                  {/*Repeat a star 5 times */}
                  <div className='flex justify-center pt-3'>
                  {Array.from(Array(5).keys()).map((index) => {
                    return (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400 inline"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1l2.598 6.854L20 7.5l-5.196 4.146L15.196 19 10 15.5 4.804 19l1.598-7.354L0 7.5l7.402.354z"
                          clipRule="evenodd"
                        />
                      </svg>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



function Reviews() {
  return (
    <>
        <div className='pl-5 text-lg font-custom font-bold'>Site Reviews</div>
      <HorizontalScrollView />
    </>
  );
}

export default Reviews;
