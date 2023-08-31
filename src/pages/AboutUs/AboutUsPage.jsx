import React, { useEffect } from "react";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import OurStorySection from "./OurStorySection";
import OurValuesSection from "./OurValuesSection";
import OurPartnersSection from "./OurPartnersSection";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import Footer from "../HomePage/Footer";
import aboutBackground from "../../assets/images/about/about_background.png";
import OurTeamSection from "./OurTeamSection";
import { getDynamicImages, getDynamicText } from "./api";

function AboutUsPage() {
  const [dynamicText, setDynamicText] = React.useState(null);
  const [dynamicImages, setDynamicImages] = React.useState(null);
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
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${aboutBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "70vh",
        }}
      >
        {" "}
        {/* Background Image */}
        <div className="hidden md:block z-30 fixed w-full">
          {<DesktopNavbarBlack />}
        </div>
        <div className="md:hidden z-30 fixed w-full">{<NavbarBlack />}</div>
        <div className="h-full flex flex-col justify-center items-center z-0 bg-black/40">
          <div className="font-custom-bold text-4xl md:text-5xl text-white text-center pt-40 pb-4 capitalize">
            Who are we?
          </div>
          <div className=" text-2xl md:text-4xl w-full text-center font-custom text-white sm-3 lg:mb-10 capitalize">
            Home away from home
          </div>
        </div>
      </div>

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
      <FadeInSection>
        <OurPartnersSection></OurPartnersSection>
      </FadeInSection>
      <Footer></Footer>
    </>
  );
}

export default AboutUsPage;
