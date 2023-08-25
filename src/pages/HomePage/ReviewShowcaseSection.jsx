import React, { useState, useEffect, useRef } from 'react';
import { getShowcaseReviews } from './api';
import config from '../../config/config.js';

const HorizontalScrollView = () => {
  const scrollContainerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const itemWidth = 
  window.innerWidth > 1200 ? 600 : 300; 

  useEffect(() => {
    getShowcaseReviews().then((res) => {
      console.log(res.data);
      setReviews(res.data);
      //scroll by 1 pixel to trigger scroll event
      if(scrollContainerRef !== null && scrollContainerRef.current !== null){
        scrollContainerRef.current.scrollLeft = 1;
      }

    });

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
      const newCenterIndex = Math.floor((scrollX + containerWidth/ 10) / itemWidth);
      setCenterIndex(newCenterIndex);
      console.log(newCenterIndex);
    }
  };

  return (
    <div
      className="flex h-full overflow-x-scroll scroll-smooth overflow-y-hidden no-scrollbar"
      style={{ scrollSnapType: 'x mandatory' }}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
     
    <div className={`flex ${
        window.innerWidth > 1200 ? 'h-[500px]' : 'h-96'
    } `}>
      <div className='flex w-20/100 sm:w-30/100'><div className='w-full bg-transparent'></div></div>
      
        {reviews !== null ? reviews.map((review,index) => {
          const distanceFromCenter = Math.abs(index - centerIndex);
          const scale = distanceFromCenter === 0 ? 1.25 : 1 - distanceFromCenter * 0.1;
          return (
            <div
              key={index}
              onClick={()=>{
                //scroll till the item is at the center of the screen
                scrollContainerRef.current.scrollLeft = index * itemWidth;
              }}
              className='flex items-center justify-center transition-all duration-300 hover:scale-105 ease-in cursor-pointer'
              style={{
                width: `${itemWidth}px`,
                transform: `${
                  initialLoad ? 'scale(1)' : `scale(${scale})`
                }`,
                transformOrigin: 'center center',
              }}
            >

            <div className={` ${
              window.innerWidth > 1200 ? 'h-80' : 'h-72'
                } 
                w-2/3 p-4 bg-white rounded-2xl border relative`}
                >
                {
                  distanceFromCenter !== 0 && <div className='absolute h-full w-full top-0 left-0 backdrop-filter backdrop-blur-[2px] scale-105'></div>}
                <div className='flex justify-center flex-col items-center'>
                  <div className='w-20 h-20 flex justify-center '>
                  <img src={`${config.STRAPI_URL}`+review.attributes.profile_photo.data.attributes.url} alt='Profile' className="rounded-full w-full" />
                  </div>
                  <div className='flex flex-col'>
                  <div className='text-center text-md'>{review.attributes.name}</div>
                  <div className='text-slate-400 text-[12px] text-center'>{new Date(review.attributes.date).toLocaleDateString('en-GB')}</div>
                  <div className='text-[14px] text-ellipsis overflow-hidden h-24 lg:h-36 text-center w-full text-primary overflow-y-auto'>{review.attributes.review}</div>
                  </div>
                  {/*Repeat a star 5 times */}
                  <div className='flex justify-center pt-1'>
                  {Array.from(Array(review.attributes.rating).keys()).map((index) => {
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
        })
        : 
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
              <div className='flex w-20/100 sm:w-30/100 '><div className='w-full bg-transparent'></div></div>

      </div>
    </div>
  );
};



function ReviewShowcaseSection() {
  return (
    <div className='w-full bg-zinc-100'>
      <div className="font-custom-bold text-3xl text-center text-primary pt-10 container mx-auto">Hear From Our Happy Guests</div>
      <div className="text-zinc-900 text-opacity-40 text-center text-lg pt-3">Read Our Recent Reviews</div>
      <HorizontalScrollView />
    </div>
  );
}

export default ReviewShowcaseSection;