import { React, useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbar from "../../components/desktopNavbar";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import IntroductionSection from "./IntroductionSection";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import WhatWeOfferSection from "./WhatWeOfferSection";
import KnowMoreSection from "./KnowMoreSection";
import ReviewShowcaseSection from "./ReviewShowcaseSection";
import FrequentQuestionsSection from "./FrequentQuestionsSection";
import SearchCard from "../../components/searchCard";
import Footer from "./Footer";
import logoWhite from "../../assets/images/white_logo.png";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import OurPartnersSection from "../AboutUs/OurPartnersSection";
import { TypeAnimation } from 'react-type-animation';

import {
  getDynamicText,
  getHomepageImages,
  getFeaturedResidences,
  getFrequentlyAskedQuestions,
  getVideos,
} from "./api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config/config";
import Slider from "react-slick";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [blackNavbar, setBlackNavbar] = useState(false);
  const [residences, setResidences] = useState(null);
  const [dynamicText, setDynamicText] = useState(null);
  const [dynamicImages, setDynamicImages] = useState(null);
  const [frequentQuestions, setFrequentQuestions] = useState(null);
  const [videos, setVideos] = useState(null);
  const [searchHidden, setSearchHidden] = useState(false);
  const sliderRef = useRef();
  const [highlightedIndex, setHighlightedIndex] = useState(
    window.innerWidth > 1024 ? 1 : 0
  );
  const search = (params) => {
    console.log(params);
    //Check if startDate and endDate both exist, if any is missing, show toast
    // if (!params.startDate || !params.endDate) {
    //   toast.error("Please select both Check-in and Check-out dates");
    //   return;
    // }
    //if params.startDate is greater than params.endDate, show toast
    if (params.startDate > params.endDate) {
      toast.error("Cannot Check-in after Check-out");
      return;
    }
    localStorage.setItem("checkInDate", params.startDate? params.startDate : "");
    localStorage.setItem("checkOutDate", params.endDate? params.endDate : "");
    localStorage.setItem("guestCount", params.guests);
    navigate("/properties", { state: { filterData: params, limit: 100, luxe: params.luxe === true ? true : false } });
  };

  useEffect(() => {
    localStorage.setItem("luxe", false);
    localStorage.removeItem("checkInDate");
    localStorage.removeItem("checkOutDate");
    localStorage.removeItem("guestCount");
    //on first load clear the localstorage
    getVideos().then((res) => {
      console.log(res.data);
      setVideos(res.data);
    });
    getDynamicText()
      .then((res) => {
        console.log(res.data);
        setDynamicText(res.data);
      })
      .catch((err) => {});
    getHomepageImages()
      .then((res) => {
        console.log(res.data[0].attributes.images.data);
        setDynamicImages(res.data[0].attributes.images.data);
      })
      .catch((err) => {});
    getFeaturedResidences()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setResidences(res.residences);
        } else if (res.status === 401) {
          console.log("unauthorized");
          localStorage.removeItem("token");
          // navigate('/login')
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getFrequentlyAskedQuestions()
      .then((res) => {
        console.log(res.data);
        setFrequentQuestions(res.data);
      })
      .catch((err) => {});

    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      // console.log(scrollPosition, screenHeight * 70 / 100)
      //If scroll position is greater than 1% of screen height, hide this element
      if(scrollPosition > 20) {
        setSearchHidden(true);
      }else{
        setSearchHidden(false);

      }
      if (scrollPosition >= (screenHeight*80)/100) {
        setBlackNavbar(true);
      } else {
        setBlackNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [navigate]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    //Autoscroll after 2 seconds
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <div>
      <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="#262150"
            >
              <path
                d="M17.4002 13.325C17.7002 13.025 17.8252 12.6 17.8252 12.175C17.8252 11.775 17.7002 11.35 17.4002 11.15L10.0002 3.65C9.7002 3.325 9.3752 3.125 8.8502 3.125C8.4502 3.125 8.1252 3.225 7.8252 3.55C7.5002 3.85 7.3002 4.275 7.3002 4.675C7.3002 5.1 7.4002 5.525 7.7002 5.825L14.0752 12.3L7.6002 19.275C7.3002 19.575 7.2002 20 7.2002 20.425C7.2002 20.825 7.4002 21.25 7.7002 21.575C8.0252 21.775 8.4502 21.875 8.8502 21.875C9.2752 21.875 9.7002 21.675 10.0002 21.35L17.4002 13.325Z"
                fill="#262150"
              />
            </svg>
    </div>,
    prevArrow: <svg
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
  </svg>,
    beforeChange: (oldIndex, newIndex) => {
      console.log("OLD",oldIndex,"NEW",newIndex)
      window.innerWidth > 1024 ? setHighlightedIndex(newIndex === 6 ? 0 : newIndex+1) : setHighlightedIndex(newIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        }
      }
    ]
  };


  return (
    <div className="relative">  
    <div className="fixed top-0 z-40">
    <div className="hidden md:block z-40 fixed w-full">
            {blackNavbar ? <DesktopNavbarBlack /> : <DesktopNavbar />}
          </div>
          <div className="md:hidden z-40 fixed w-full">
            {blackNavbar ? <NavbarBlack /> : <Navbar />}
          </div>
    </div>
  <div
        style={{
          width: '100%',
          height: '90vh',
        }}
        className="z-0 fixed top-0 left-0"
      >
        <div className="z-0">
          {videos !== null && (
            <video
              autoPlay
              loop
              muted
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <source
                src={
                  videos !== null &&
                  `${config.STRAPI_URL}` +
                    videos.find(
                      (video) => video.attributes.name === "HomePage_Video"
                    ).attributes.video.data.attributes.url
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        <div className="absolute h-full w-full bg-black/40"></div>
        </div>
      </div>
      <div className={`w-full flex fixed top-0 justify-center items-center z-30 transition-all 
      ${
        searchHidden ? setTimeout(() => {return "hidden"}, 200) : "block"
      }
        ${searchHidden ? "-translate-y-96 scale-0 duration-200 ease-out" : "translate-y-0 scale-100 duration-500 ease-in"}
      `} style={{
        height: '100vh'
      }}>
                <div className={`h-full w-full relative`}>
          <div className={`h-full flex flex-col items-center pt-16 sm:pt-20 2xl:pt-40`}>
            <div className="lg:hidden z-10">
              <div className="font-custom-bold text-xl lg:text-3xl text-white text-center pt-10 pb-4">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Website_Name"
                  ).attributes.text}
              </div>
            </div>

            <div className="hidden lg:block justify-center items-center z-10">
              <img
                src={logoWhite}
                alt="My City Logo"
                className="h-24 2xl:h-36 self-start mb-5 2xl:mb-10"
              ></img>
            </div>
            <div className=" text-md md:text-2xl w-full text-center font-bold font-custom-adam text-white capitalize sm-3 2xl:mb-10 z-10">
              {dynamicText !== null && 
                <div>
                  <TypeAnimation
                    cursor={false}
                    sequence={[
                      dynamicText.find(
                        (text) => text.attributes.name === "Website_Tagline"
                      ).attributes.text,
                    ]}
                    wrapper="div"
                    className="text-md md:text-2xl w-full text-center font-custom-bold text-white capitalize sm-3 mb-5 2xl:mb-10 z-10"
                  />
                </div>
              }
            </div>

            <div className="z-50">
            <SearchCard initialData={location.state ? location.state.filterData : null} search={(params) => search(params)}></SearchCard>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white translate-y-0 rounded-tl-[50px] md:rounded-tl-[100px]" style={{
        marginTop: '70vh'
      }}>
        <div className="md:container md:mx-auto">
          <FadeInSection>
            {dynamicText !== null && dynamicImages !== null && (
              <IntroductionSection
                dynamicText={dynamicText}
                dynamicImages={dynamicImages}
              ></IntroductionSection>
            )}
          </FadeInSection>
        </div>
      {/* Seperated into different file because it's static content */}
      <FadeInSection>
        <div className="bg-white rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="p-4 lg:container lg:mx-auto relative">
            <div className="relative flex justify-center md:pb-3">
              <div className=" text-primary font-custom-kiona text-2xl md:text-4xl capitalize">
              FEATURED PROPERTIES
              </div>
            </div>
            <div className=" text-center text-secondary font-bold font-custom-kiona text-md md:text-lg pt-2 capitalize">
              Hand-picked Selection Of Quality Places
            </div>
            <div className="md:pt-10">
            {residences === null ? (
              //Circular Progress
              <div className="flex justify-center items-center md:mt-10">
                <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
              </div>
            ) : (
              <Slider {...settings} ref={sliderRef} className="flex justify-center items-center h-[400px] md:h-[600px]">
                {residences !== null && residences.map((residence, index) => (
                  residences !== null && <div id={residence._id} key={residence._id}
                  className="px-10 h-[400px] md:h-[600px] flex items-center justify-center" 
                  >
                    <div className="flex h-full justify-center items-center cursor-pointer"
                      >
                    <FeaturedPropertyCard
                      highlighted={
                        highlightedIndex !== null && highlightedIndex === index ? true : false
                      }
                      residence={residence}
                    ></FeaturedPropertyCard>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>

            <div className="flex justify-center">
              <div
                className="w-[178px] h-12 bg-primary hover:bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer rounded-xl shadow-lg backdrop-blur-md"
                onClick={() =>
                  navigate("/properties", {
                    state: {
                      limit: 100,
                    },
                  })
                }
              >
                <div className="font-custom-kiona text-xl h-full flex justify-center items-center">
                  VIEW ALL
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        {dynamicImages !== null && dynamicText !== null ? (
          <WhatWeOfferSection
            dynamicText={dynamicText}
            dynamicImages={dynamicImages}
          ></WhatWeOfferSection>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>

      <FadeInSection>
        {dynamicImages !== null && dynamicText !== null && (
          <KnowMoreSection
            dynamicText={dynamicText}
            dynamicImages={dynamicImages}
          ></KnowMoreSection>
        )}
      </FadeInSection>

      <FadeInSection>
        <div className="mt-10">
          <ReviewShowcaseSection></ReviewShowcaseSection>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="bg-white rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="container mx-auto">
            {frequentQuestions !== null && (
              <FrequentQuestionsSection
                questions={frequentQuestions}
              ></FrequentQuestionsSection>
            )}
          </div>
        </div>
      </FadeInSection>

        <OurPartnersSection></OurPartnersSection>

      <Footer></Footer>
    </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Home;
