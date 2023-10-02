import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPartners } from "./api";
import config from "../../config/config";

const Carousel = () => {
  const [partners, setPartners] = useState(null);
  useEffect(() => {
    getPartners()
      .then((res) => {
        console.log(res.data);
        setPartners(res.data);
      })
      .catch((err) => {});
  }, []);
  const slider = React.useRef(null);
  const settings = {
    cssEase: "linear",
    slidesToShow: window.innerWidth > 768 ? 5 : 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col">
          <Slider {...settings} className="slider w-full" ref={slider}>
            {partners ? (
              partners.map((partner) => (
                <div key={partner.id} className="partner-card text-center">
                  <div className="h-20 flex justify-center w-full">
                    <img
                      src={
                        `${config.STRAPI_URL}` +
                        partner.attributes.image.data.attributes.url
                      }
                      alt="Profile"
                      className="w-32 object-fit"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
              </div>
            )}
          </Slider>
      </div>
    </div>
  );
};

export default Carousel;
