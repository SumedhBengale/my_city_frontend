import React, { useEffect, useState } from "react";
import { getPartners } from "./api";
import config from "../../config/config";
import Marquee from "react-fast-marquee";

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

  return (
    <Marquee loop={0} autoFill={true} ref={slider}>
      {partners ? (
        partners.map((partner) => (
          <div className="h-20 flex w-80 items-center">
            <img
              src={
                `${config.STRAPI_URL}` +
                partner.attributes.image.data.attributes.url
              }
              alt="Partner"
              className="w-32 object-fit"
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
        </div>
      )}
    </Marquee>
  );
};

export default Carousel;
