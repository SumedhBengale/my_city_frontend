import React from "react";
import Carousel from "./Carousel";

function OurPartnersSection() {
  return (
    <div className="py-10 w-full">
      <div className="mt-5 mb-10">
        <div className="text-center text-primary text-2xl md:text-3xl font-custom-kiona capitalize">
          Our Partners
        </div>
      </div>

      <Carousel></Carousel>
    </div>
  );
}

export default OurPartnersSection;
