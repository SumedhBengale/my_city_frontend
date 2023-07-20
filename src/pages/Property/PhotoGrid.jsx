import React, { useState } from 'react';
import Placeholder2 from '../../assets/images/property/placeholder2.png';
import Placeholder3 from '../../assets/images/property/placeholder3.png';
import Placeholder4 from '../../assets/images/property/placeholder4.png';
import Placeholder5 from '../../assets/images/property/placeholder5.png';

function PhotoGrid() {
  const allImages = [
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
    Placeholder2,
    Placeholder3,
    Placeholder4,
    Placeholder5,
  ];

  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 4));
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setDisplayedImages(allImages);
    setShowAll(true);
  };

  return (
    <>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayedImages.map((image, index) => (
        <div
        key={index}
        className={`bg-gray-200 ${index%3 ===0 ? 'col-span-2 row-span-2' : 'col-span-1'}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          height: index === 0 ? '32rem' : '16rem',
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