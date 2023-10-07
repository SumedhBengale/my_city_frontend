import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getShowcaseReviews } from "./api";
import config from "../../config/config";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    getShowcaseReviews()
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => {});
  }, []);
  const slider = React.useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    
    prevArrow: false,
    nextArrow: false,
  };

  return (
    <div className="w-full flex justify-center bg-neutral-100 rounded-tl-[50px] md:rounded-tl-[100px] py-10">
      <div className="w-full md:max-w-[1400px] flex flex-col">
        <div className="w-full flex justify-center mb-5">
          <h1 className="text-2xl font-custom-kiona text-center text-primary px-2">
            Hear From Our Happy Customers
          </h1>
        </div>
        <div className="flex justify-between">
          <button
            className="w-min text-white z-20"
            onClick={() => {
              slider?.current.slickPrev();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="262150"
            >
              <path
                d="M16.1498 3.125C15.7248 3.125 15.3248 3.325 15.0998 3.55L7.6998 11.05C7.3998 11.35 7.2998 11.775 7.2998 12.175C7.2998 12.6 7.3998 13.025 7.6998 13.325L15.0998 21.35C15.4248 21.675 15.7248 21.875 16.1498 21.875C16.5748 21.875 16.9748 21.775 17.2998 21.45C17.5998 21.15 17.8248 20.725 17.8248 20.3C17.8248 19.9 17.6998 19.475 17.2998 19.175L10.9498 12.175L17.2998 5.625C17.4998 5.425 17.6998 5.1 17.6998 4.675C17.6998 4.275 17.5998 3.85 17.2998 3.55C16.8748 3.225 16.5748 3.125 16.1498 3.125Z"
                fill="#262150"
              />
            </svg>
          </button>
          <Slider {...settings}  className="slider w-5/6" ref={slider}>
            {reviews ? (
              reviews.map((review) => (
                <div key={review.id} className="review-card text-center">
                  
                  <div className="w-full flex flex-col items-center gap-2">
                    <div className=" w-5/6 text-center text-lg text-primary font-custom-adam">
                      {review.attributes.review}
                    </div>
                    <div className="mb-5">
                    {Array.from(Array(review.attributes.rating).keys()).map(
                      (index) => {
                        return (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-secondary inline mx-1"
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
                      }
                    )}
                    {Array.from(Array(5 - review.attributes.rating).keys()).map(
                      (index) => {
                        return (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            w-
                            className="h-5 w-5 text-gray-300 inline mx-1"
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
                      }
                    )}
                  </div>
                    <div className="h-20 flex justify-center w-full">
                      <img
                        src={
                          `${config.STRAPI_URL}` +
                          review.attributes.profile_photo.data.attributes.url
                        }
                        alt="Profile"
                        className="rounded-full w-20"
                      />
                    </div>
                    <p className="text-2xl capitalize font-custom-adam text-priamry">{review.attributes.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
              </div>
            )}
          </Slider>
          <button
            className="w-min text-white z-20"
            onClick={() => {
              slider?.current.slickNext();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="262150"
            >
              <path
                d="M17.4002 13.325C17.7002 13.025 17.8252 12.6 17.8252 12.175C17.8252 11.775 17.7002 11.35 17.4002 11.15L10.0002 3.65C9.7002 3.325 9.3752 3.125 8.8502 3.125C8.4502 3.125 8.1252 3.225 7.8252 3.55C7.5002 3.85 7.3002 4.275 7.3002 4.675C7.3002 5.1 7.4002 5.525 7.7002 5.825L14.0752 12.3L7.6002 19.275C7.3002 19.575 7.2002 20 7.2002 20.425C7.2002 20.825 7.4002 21.25 7.7002 21.575C8.0252 21.775 8.4502 21.875 8.8502 21.875C9.2752 21.875 9.7002 21.675 10.0002 21.35L17.4002 13.325Z"
                fill="#262150"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
