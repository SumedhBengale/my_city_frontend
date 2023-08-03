import React, { useState } from 'react';

function PhotoGrid({carouselOpen, images}) {
  const [displayedImages, setDisplayedImages] = useState(images.slice(0, 3));
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setDisplayedImages(images);
    setShowAll(true);
  };

  return (
    <>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:px-10">
      {displayedImages.map((image, index) => (
        <div
        key={index}
        className={`bg-gray-200 rounded-lg ${index === 0 ? 'col-span-2 md:row-span-2 md:col-span-2' : index === 1 ? 'col-span-2 md:col-span-1' : index === 2 ? 'col-span-2 md:col-span-1' : 'col-span-2 md:col-span-1'}`}
        onClick={()=>carouselOpen()}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          height: index === 0 ? '31rem' : '15rem',
          //Rounded
        }}
      />
      ))}
    </div>
    {!showAll && (
        <div className='flex justify-center items-center mt-5'>
            <button
            className="bg-white text-black font-bold hover:scale-105 transition duration-75 hover:bg-black hover:text-white active:text-black active:bg-white border-[1px] border-black py-2 px-4 rounded-lg w-48"
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