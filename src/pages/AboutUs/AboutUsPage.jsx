import React, { useEffect } from "react";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import OurStorySection from "./OurStorySection";
import OurValuesSection from "./OurValuesSection";
import OurPartnersSection from "./OurPartnersSection";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import Footer from "../HomePage/Footer";
import OurTeamSection from "./OurTeamSection";
import { getDynamicImages, getDynamicText } from "./api";
import config from "../../config/config";
import logoWhite from "../../assets/images/white_logo.png";

function AboutUsPage() {
  const [dynamicText, setDynamicText] = React.useState(null);
  const [dynamicImages, setDynamicImages] = React.useState(null);
  const [hidden, setHidden] = React.useState(false);
  useEffect(() => {
    getDynamicText()
      .then((res) => {
        console.log(res.data);
        setDynamicText(res.data);
      })
      .catch((err) => {});
    getDynamicImages()
      .then((res) => {
        console.log(res.data[0].attributes.images.data);
        setDynamicImages(res.data[0].attributes.images.data);
      })
      .catch((err) => {});

      const handleScroll = () => {
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        // console.log(scrollPosition, screenHeight * 70 / 100)
        //If scroll position is greater than 1% of screen height, hide this element
        if(scrollPosition > 20) {
          setHidden(true);
        }else{
          setHidden(false);
  
        }

      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);
  return (
    <div className="relative">
      <div className="fixed top-0 z-40">
        <div className="hidden md:block z-40 fixed w-full">
                {<DesktopNavbarBlack />}
        </div>
        <div className="md:hidden z-40 fixed w-full">
          {<NavbarBlack />}
        </div>
      </div>
      {dynamicImages !== null && dynamicText !== null && (
        <div>
        <div
          style={{
            //Blurry Background Image
            backgroundImage: `url(${
              `${config.STRAPI_URL}` +
              dynamicImages.find(
                (image) => image.attributes.name === "AboutBackground.png"
              ).attributes.url
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "90vh",
          }}
          className="fixed top-0"
        >
        </div>
        <div className="fixed top-0 h-screen w-screen bg-black/40 backdrop-filter backdrop-blur-sm"></div>
      </div>
      )}
      <div className={`w-full flex flex-col fixed top-0 z-30 transition-all pt-24 sm:pt-20 2xl:pt-52 
      ${
        hidden ? setTimeout(() => {return "hidden"}, 200) : "block"
      }
        ${hidden ? "-translate-y-96 scale-0 duration-200 ease-out" : "translate-y-0 scale-100 duration-500 ease-in"}
      `} style={{
        height: '100vh'
      }}>
            <div className="w-full flex justify-center items-center z-10 pt-20">
              <img
                src={logoWhite}
                alt="My City Logo"
                className="w-1/2 sm:w-1/3 md:w-48 lg:w-96 self-start mb-10"
              ></img>
            </div>
            <div className="font-custom-bold text-3xl md:text-5xl text-white text-center pb-4 capitalize">
              {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "AboutUs_Heading").attributes.text}
            </div>
            <div className=" text-2xl md:text-4xl w-full text-center font-custom-kiona text-white sm-3 lg:mb-10 capitalize">
            {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "AboutUs_Subheading").attributes.text}
            </div>
      </div>
      <div className="bg-white translate-y-0 rounded-tl-[50px] md:rounded-tl-[100px] z-30" style={{
        marginTop: '70vh'
      }}>
      {dynamicText !== null && dynamicImages !== null ? (
        <OurStorySection
          dynamicText={dynamicText}
          dynamicImages={dynamicImages}
        ></OurStorySection>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <FadeInSection>
        {dynamicText !== null && dynamicImages !== null ? (
          <OurTeamSection
            dynamicText={dynamicText}
            dynamicImages={dynamicImages}
          ></OurTeamSection>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>
      <FadeInSection>
        <OurValuesSection
          dynamicText={dynamicText}
          dynamicImages={dynamicImages}
        ></OurValuesSection>
      </FadeInSection>
        <OurPartnersSection></OurPartnersSection>
      <Footer></Footer>
      </div>
    </div>
  );
}

export default AboutUsPage;
