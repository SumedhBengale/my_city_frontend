import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

function PhotoGrid({ carouselOpen, images }) {
  const [displayedImages, setDisplayedImages] = useState(images.slice(0, 1));

  useEffect(() => {
    const setImages = () => {
      console.log(window.innerWidth);
      // If md, then display 3 images, else if lg display 4 images
      if (window.innerWidth >= 1024) {
        setDisplayedImages(images.slice(0, 5));
      } else if (window.innerWidth >= 768) {
        setDisplayedImages(images.slice(0, 3));
      } else {
        setDisplayedImages(images.slice(0, 1));
      }
    };

    setImages();

    //watch for changes in window.innerWidth
    window.addEventListener("resize", setImages);

    //cleanup function
    return () => {
      window.removeEventListener("resize", setImages);
    };
  }, [images]);

  return (
    <>
      <div className="grid gap-4 grid-cols-4 relative">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            //first image will take up 2 columns and 2 rows, else if only 3 or 4 images then the last image will take up 2 columns and 1 rows
            className={`relative ${
              index === 0
                ? displayedImages.length !== 1
                  ? "hidden md:block md:col-span-2 md:row-span-2 pointer-events-none md:pointer-events-auto"
                  : "hidden md:block w-full md:col-start-2 md:col-span-2 md:row-span-2 pointer-events-none md:pointer-events-auto"
                : displayedImages.length === 3
                ? index === 1 || index === 2
                  ? "col-span-2 row-span-1"
                  : ""
                : displayedImages.length === 4
                ? index === 3
                  ? "col-span-2 row-span-1"
                  : ""
                : ""
            }`}
            onClick={() => carouselOpen(index)}
          >
            <img
              src={image.original ? image.original : image.thumbnail}
              alt={`placeholder-${index}`}
              className={`
                ${
                  index === 0
                    ? "object-cover h-full w-full rounded-lg"
                    : "object-cover h-64 w-full rounded-lg"
                }
              `}
            />
          </div>
        ))}
        <div className="md:hidden col-span-4">
          {<Carousel images={images} currIndex={0} />}
        </div>
      </div>
    </>
  );
}

export default PhotoGrid;
