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
        //for each item in res.data create an img object and push it to the array
        let partnersArr = [];
        res.data.forEach((partner) => {
          partnersArr.push(
            <img src={
              `${config.STRAPI_URL}` +
              partner.attributes.image.data.attributes.url
            } alt="Partner" className="w-32 object-fit"/>
          );
        });
        setPartners(partnersArr);
      })
      .catch((err) => {});
  }, []);
  const slider = React.useRef(null);
  const settings = {
    cssEase: "linear",
    slidesToShow: window.innerWidth > 768 ? 5 : 1,
    slidesToScroll: partners ? partners.length : 1,
    arrows: false,
    autoplay: true,
    infinite: true,
    swipeToSlide: true,
    autoplaySpeed: 0,
    speed: 3000 * (partners ? partners.length : 1),
    pauseOnHover: true,
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col">
        <Slider {...settings} className="slider w-full" ref={slider}>
          {partners ? (
            partners.map((partner) => (
              <div className="partner-card text-center">
                <div className="h-20 flex w-full">
                  {partner}
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
