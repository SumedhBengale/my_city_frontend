import React, { useState } from 'react';

function PhotoGrid({carouselOpen, isGridExpanded, images}) {
  const [displayedImages, setDisplayedImages] = useState(images.slice(0, 4));
  const [showAll, setShowAll] = useState(false);
  const [gridExpanded, setGridExpanded] = useState(false);
  const handleShowAll = () => {
    setDisplayedImages(images);
    isGridExpanded(true)
    setGridExpanded(true);
    setShowAll(true);
  };

  return (
    <>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:mx-5 relative">
        {displayedImages.map((image, index) => (
          <div
          key={index}
          className={`bg-gray-200 col-span-2 md:col-span-1`}
          onClick={()=>carouselOpen(index)}
          style={{
            backgroundImage: `url(${image.original ? image.original : image.thumbnail})`,
            backgroundSize: 'cover',
            height: '12rem',
            //Rounded
          }}
        />
        ))}

      {
        window.innerWidth > 1024 &&
      <div className={`absolute right-0 w-1/4 flex justify-center items-center h-[12rem] ${!showAll ? 'backdrop-filter backdrop-blur-[2px]' : null} `}>
          {!showAll && (
            <div className='flex justify-center items-center'>
                <button
                className=" w-20 xl:w-40 text-sm bg-white text-black font-bold hover:scale-105 transition duration-75 hover:bg-black hover:text-white active:text-black active:bg-white border-[1px] border-black py-2 px-4 rounded-lg"
                onClick={handleShowAll}
                >
                Show All Photos
                </button>
            </div>
        )}
      </div>
    }
    </div>

    {!showAll && window.innerWidth < 1024 && (
            <div className='flex justify-center items-center mt-10'>
                <button
                className=" text-md bg-white text-black font-bold hover:scale-105 transition duration-75 hover:bg-black hover:text-white active:text-black active:bg-white border-[1px] border-black py-2 px-4 rounded-lg w-48"
                onClick={handleShowAll}
                >
                Show All Photos
                </button>
            </div>
        )}

    </>
  );
}

export default PhotoGrid;