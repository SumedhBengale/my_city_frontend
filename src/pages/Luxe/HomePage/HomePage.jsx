import { React, useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import NavbarBlack from "../../../components/navbar_black";
import DesktopNavbar from "../../../components/desktopNavbar";
import DesktopNavbarBlack from "../../../components/desktopNavbarBlack";
import homeBackground from "../../../assets/images/home/home_top_image.png";
import IntroductionSection from "./IntroductionSection";
import PropertyCard from "./PropertyCard";
import WhatWeOfferSection from "./WhatWeOfferSection";
import KnowMoreSection from "./KnowMoreSection";
import ReviewShowcaseSection from "./ReviewShowcaseSection";
import FrequentQuestionsSection from "./FrequentQuestionsSection";
import SearchCard from "../../../components/searchCard";
import Footer from "./Footer";
import luxeLogo from "../../../assets/images/luxeLogo.png";
import luxe from "../../../assets/images/luxe.svg";
import FadeInSection from "../../../components/fadeIn/fadeInSection";
import OurPartnersSection from "../../AboutUs/OurPartnersSection";
import {
  getDynamicText,
  getHomepageImages,
  getFeaturedResidences,
  getFrequentlyAskedQuestions,
  getVideos,
} from "./api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../../config/config";

function Home() {
  const navigate = useNavigate();
  const [blackNavbar, setBlackNavbar] = useState(false);
  const [residences, setResidences] = useState(null);
  const [dynamicText, setDynamicText] = useState(null);
  const [dynamicImages, setDynamicImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [frequentQuestions, setFrequentQuestions] = useState(null);

  const search = (params) => {
    console.log(params);
    //if params.startDate is greater than params.endDate, show toast
    if (params.startDate > params.endDate) {
      toast.error("Cannot Check-in after Check-out");
      return;
    }
    localStorage.setItem("checkInDate", params.startDate);
    localStorage.setItem("checkOutDate", params.endDate);
    localStorage.setItem("guestCount", params.guests);
    navigate("/luxe/properties", { state: { filterData: params, limit: 100 } });
  };

  useEffect(() => {
    localStorage.removeItem("checkInDate");
    localStorage.removeItem("checkOutDate");
    localStorage.removeItem("guestCount");
    //on first load clear the localstorage
    getVideos().then((res) => {
      console.log("VIDEOS", res);
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
          navigate("/login");
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
      if (scrollPosition >= (screenHeight * 70) / 100) {
        setBlackNavbar(true);
      } else {
        setBlackNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
        }}
        className="z-0"
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
                      (video) => video.attributes.name === "Luxe_HomePage_Video"
                    ).attributes.video.data.attributes.url
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {/* Background Image */}
        <div className="h-full relative">
          <div className="absolute h-full w-full bg-black/40"></div>
          <div className="hidden md:block z-30 fixed w-full">
            {blackNavbar ? <DesktopNavbarBlack /> : <DesktopNavbar />}
          </div>
          <div className="md:hidden z-30 fixed w-full">
            {blackNavbar ? <NavbarBlack /> : <Navbar />}
          </div>
          <div className="h-full flex flex-col justify-center items-center">
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
                src={luxeLogo}
                alt="My City Logo"
                className="md:w-48 lg:w-72 self-start mb-10"
              ></img>
            </div>
            <div className=" text-md md:text-2xl w-full text-center font-custom-bold text-white capitalize sm-3 lg:mb-10 z-10">
              {
                //split each word in to a seperate div and fade them each one by one
                dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Website_Tagline"
                  ).attributes.text
              }
            </div>

            <div className="z-20">
              <SearchCard search={(params) => search(params)}></SearchCard>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white -translate-y-24 rounded-tl-[50px] md:rounded-tl-[100px]">
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
      </div>
      {/* Seperated into different file because it's static content */}
      <FadeInSection>
        <div className="bg-gradient-to-b  from-primary via-primary to-primary/60 rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="p-4 lg:container lg:mx-auto relative">
            <div className="relative flex justify-center">
              <div className=" text-white font-custom text-3xl capitalize">
                Featured Properties
              </div>
              <div className="absolute -bottom-5 left-4 w-full flex justify-center">
                <img src={luxe} alt="arrow" className="w-20 h-10" />
              </div>
            </div>
            <div className=" text-center text-white font-custom text-sm pt-5 capitalize">
              Hand-picked selection of quality places
            </div>
            <div className="md:py-10">
              {residences === null ? (
                //Circular Progress
                <div className="flex justify-center items-center mt-10">
                  <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 md:gap-20 gap-5 mt-10">
                  <div className="order-1 md:order-2">
                    <PropertyCard
                      residence={residences[0].residence}
                      key={residences[0].residence._id}
                      //If screen width > md, pass highlighted true
                      highlighted={window.innerWidth > 768 ? true : false}
                    ></PropertyCard>
                  </div>
                  <div className="order-2 md:order-1">
                    <PropertyCard
                      residence={residences[1].residence}
                      key={residences[1].residence._id}
                    ></PropertyCard>
                  </div>
                  <div className="order-3 md:order-3">
                    <PropertyCard
                      residence={residences[2].residence}
                      key={residences[2].residence._id}
                    ></PropertyCard>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-10">
              <div
                className="w-[178px] h-12 bg-white hover:bg-secondary text-primary hover:text-white hover:scale-105 transition duration-75 cursor-pointer border border-secondary rounded-xl shadow-lg backdrop-blur-md"
                onClick={() =>
                  navigate("/luxe/properties", {
                    state: {
                      limit: 100,
                    },
                  })
                }
              >
                <div className=" font-bold text-xl h-full flex justify-center items-center">
                  View All
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
        <div className="bg-gradient-to-b  from-primary via-primary to-primary/60 rounded-tl-[50px] md:rounded-tl-[100px] mt-32">
          <div className="container mx-auto">
            {frequentQuestions !== null && (
              <FrequentQuestionsSection
                questions={frequentQuestions}
              ></FrequentQuestionsSection>
            )}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <OurPartnersSection></OurPartnersSection>
      </FadeInSection>

      <Footer></Footer>
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
    </>
  );
}

export default Home;
