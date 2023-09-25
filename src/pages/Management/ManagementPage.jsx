import React, { useEffect, useRef, useState } from "react";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import HowWeDoIt from "./HowWeDoIt";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import ReviewShowcaseSection from "./ReviewShowcaseSection";
import OurPartnersSection from "../AboutUs/OurPartnersSection";
import Footer from "../HomePage/Footer";
import BlogContainer from "./BlogContainer";
import {
  getLocations,
  getDynamicText,
  getHomeOwnersPageImages,
  newEnquiry,
} from "./api";
import config from "../../config/config";
import HowWeWork from "./HowWeWork";
import { ToastContainer, toast } from "react-toastify";
import enquiryIcon from "../../assets/images/management/enquiry_Icon.png";
import logoBlack from "../../assets/images/black_logo.png";
import { useNavigate } from "react-router-dom";

function ManagementPage() {
  const navigate = useNavigate();
  const [dynamicText, setDynamicText] = useState(null);
  const [dynamicImages, setDynamicImages] = useState(null);
  const [postCode, setPostCode] = useState("");
  const [enquiryPopUpVisible, setEnquiryPopUpVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [propertiesCount, setPropertiesCount] = useState(1);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  const quoteBackdropRef = useRef();

  useEffect(() => {
    setLoading(true);
    getDynamicText()
      .then((res) => {
        console.log(res.data);
        setDynamicText(res.data);
      })
      .catch((err) => {});
    getHomeOwnersPageImages()
      .then((res) => {
        console.log(res.data[0].attributes.images.data);
        setDynamicImages(res.data[0].attributes.images.data);
      })
      .catch((err) => {});
      setLoading(false);

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

  const handleEnquirySubmit = (data) => {
    console.log(data);
    //Make sure nothing is empty
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.location === "" ||
      data.propertiesCount === "" ||
      data.postCode === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    //Make sure email is valid
    if (!data.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    //Make sure phone number is valid
    if (data.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    newEnquiry(data).then((res) => {
      console.log(res);
    });
  };

  const handlePostcodeValidation = (postcode) => {
  // Remove all spaces from the input postcode and convert to uppercase
  const formattedPostcode = postcode.replace(/\s/g, '').toUpperCase();

  // Define the regular expression for UK postcodes
  const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]?[0-9][A-Z]{2}$/;

  // Check if the postcode matches the pattern
  return postcodeRegex.test(formattedPostcode);
}


  const handleQuotePopUp = () => {
    console.log(postCode);
    //Check if postcode is valid for UK
    if (postCode === "") {
      toast.error("Please enter a postcode");
      return;
    }
    //If valid, show enquiry pop up
    const valid = handlePostcodeValidation(postCode)
    if(valid){
    getLocations(postCode).then((res) => {
      console.log(res.locations.result);
      setLocations(res.locations.result);
    });
    setEnquiryPopUpVisible(true);
    document.body.style.overflow = "hidden";
    }else{
      toast.error("Please enter a valid postcode");
    }
  };

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
                (image) => image.attributes.name === "HomeOwnersBackground.png"
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
      <div className={`w-full flex fixed top-0 justify-center items-center z-30 transition-all 
      ${
        hidden ? setTimeout(() => {return "hidden"}, 200) : "block"
      }
        ${hidden ? "-translate-y-96 scale-0 duration-200 ease-out" : "translate-y-0 scale-100 duration-500 ease-in"}
      `} style={{
        height: '100vh'
      }}>
        {enquiryPopUpVisible && (
            <div className="fixed bottom-0 z-40 w-full h-full flex items-end justify-center md:items-center overflow-hidden backdrop-filter backdrop-blur-md" ref={quoteBackdropRef}
              //If clicked on backdrop, close the pop up
              onClick={(e) => {
                if (e.target === quoteBackdropRef.current) {
                  setEnquiryPopUpVisible(false);
                  document.body.style.overflow = "unset";
                }
              }}
            >
              <div className="h-5/6 lg:h-5/6 w-full md:w-max z-30 overflow overflow-auto rounded-t-2xl md:rounded-2xl drop-shadow-2xl flex flex-col no-scrollbar">
                <div className=" bg-neutral-100 rounded-lg p-5 md:p-10 divide-solid gap-5 md:gap-0">
                  <div className="flex flex-col">
                    <div className="flex justify-end">
                      <div
                        className="font-bold"
                        onClick={() => {
                          setEnquiryPopUpVisible(false);
                          document.body.style.overflow = "unset";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 border border-secondary rounded-md text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-96 flex flex-col justify-center items-center  gap-2 md:gap-10">
                        <img
                          src={enquiryIcon}
                          alt="Img"
                          className="w-full h-48 rounded-l-lg object-cover"
                        ></img>
                        <div className="text-center text-2xl md:text-4xl text-primary font-bold">
                          Get your London property rental valuation
                        </div>
                        <div className="text-center w-full md:w-3/4">
                          <div className="text-center text-sm md:text-md text-primary">
                            Understand what your portfolio can achieve based on
                            our flexible lettings model — a blend of short, mid
                            and long lets that takes advantage of short let
                            peaks and the security of long lets.
                          </div>
                          <div className="text-center text-sm md:text-md text-primary">
                            Enter the details of the property you would like us
                            to manage for a rental valuation.
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block px-10">
                        <div className="border-r-2 border-secondary opacity-50 h-full"></div>
                      </div>

                      <div className="w-full md:w-96 flex flex-col justify-center items-center  gap-5 pt-5 md:pt-0">
                        <img
                          src={logoBlack}
                          alt="Img"
                          className="hidden md:block h-24 rounded-l-lg object-contain"
                        ></img>

                        <div className="flex flex-col justify-center items-center gap-5 w-full">
                          <input
                            className="bg-white rounded-lg px-4 h-12 w-full shadow-md"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          ></input>
                          <input
                            className="bg-white rounded-lg px-4 h-12 w-full shadow-md"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          ></input>
                          <input
                            className="bg-white rounded-lg px-4 h-12 w-full shadow-md"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          ></input>
                          <input
                            className="bg-white rounded-lg px-4 h-12 w-full shadow-md"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => {
                              //Accept only numbers, max 14 digits or + sign and country code may be added
                              const re = /^[0-9\b+]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                if (e.target.value.length <= 14) {
                                  setPhone(e.target.value);
                                }
                              }
                            }}
                          ></input>
                          <div className="flex flex-col justify-between items-start w-full">
                            <div className="text-primary text-start text-md">
                              Property Address
                            </div>
                            <div className="h-min w-full bg-white rounded-lg z-20 shadow-md">
                              <select
                                className="bg-white rounded-lg px-4 h-12 w-full"
                                onChange={(e) => setLocation(e.target.value)}
                              >
                                {locations !== null &&
                                  locations.map((location) => {
                                    return (
                                      <option
                                        value={
                                          // location.line_1, location.line_2, location.line_3 if they are not empty string seperated by comma
                                          location.line_1 +
                                          (location.line_2 !== ""
                                            ? ", " + location.line_2
                                            : "") +
                                          (location.line_3 !== ""
                                            ? ", " + location.line_3
                                            : "")
                                        }
                                        className="capitalize"
                                      >
                                        {location.line_1 +
                                          (location.line_2 !== ""
                                            ? ", " + location.line_2
                                            : "") +
                                          (location.line_3 !== ""
                                            ? ", " + location.line_3
                                            : "")
                                        }
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-start w-full">
                            <div className="text-primary text-start text-md">
                              Number of Properties
                            </div>
                            <select
                              className="bg-white rounded-lg px-4 h-12 w-full shadow-md"
                              onChange={(e) =>
                                setPropertiesCount(e.target.value)
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5+">5+</option>
                            </select>
                          </div>
                        </div>
                        <button
                          className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona py-2 mb-24 md:mb-0 px-4 h-12 w-40 my-3"
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              firstName === "" ||
                              lastName === "" ||
                              email === "" ||
                              phone === "" ||
                              location === ""
                            ) {
                              toast.error("Please fill all the fields");
                              return;
                            }
                            const data = {
                              userId: localStorage.getItem("userId"),
                              postCode: postCode,
                              firstName: firstName,
                              lastName: lastName,
                              email: email,
                              phone: phone,
                              location: location,
                              propertiesCount: propertiesCount,
                            };
                            console.log(data);
                            //Send data to backend
                            //If success, show success message
                            //If error, show error message
                            handleEnquirySubmit(data);
                            toast.success(
                              "Your enquiry has been submitted successfully"
                            );
                            setEnquiryPopUpVisible(false);
                            document.body.style.overflow = "unset";
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="h-full flex flex-col items-center z-0 pt-24 2xl:pt-72">
            <div className="max-w-2xl flex flex-col justify-center items-center gap-2 px-3">
              <div className="font-custom-bold text-center text-4xl md:text-5xl text-white pb-4 uppercase">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HomeOwners_Heading"
                  ).attributes.text}
              </div>
              <div className=" text-lg w-full text-center font-custom-avenir-light text-white sm-3 lg:mb-10 capitalize">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "HomeOwners_Subheading"
                  ).attributes.text}
              </div>
              <div className="w-full flex justify-center h-16">
                <input
                  className="bg-white rounded-l-lg px-4 h-full w-full md:w-96"
                  onChange={(e) => setPostCode(e.target.value)}
                  placeholder="Enter Postcode"
                ></input>
                <button
                  className="bg-primary hover:bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona py-2 px-4 h-full w-40 rounded-r-lg uppercase"
                  onClick={() => handleQuotePopUp()}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
          </div>
      {loading === false ?       
      <div className="bg-white translate-y-0 rounded-tl-[50px] md:rounded-tl-[100px] z-30" style={{
        marginTop: '70vh'
      }}>
      {dynamicImages !== null && dynamicText !== null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center md:p-5 lg:px-20 pt-10 lg:pt-20 lg:pl-10 gap-2 md:gap-10 container mx-auto">
              <img
                className=" h-[400px] lg:h-[500px] w-full rounded-tl-[50px] md:rounded-tl-[100px] rounded-md drop-shadow-lg"
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_Introduction_Image.png"
                  ).attributes.url
                }
                alt="Placeholder"
              />
            <div className="text-center lg:text-left md:pr-5">
              <div className="text-secondary font-custom-adam-bold uppercase text-md pb-3 pt-5 lg:pt-0">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Introduction_Heading"
                  ).attributes.text}
              </div>
              <div className="text-primary font-custom-kiona uppercase text-2xl md:text-3xl pb-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Introduction_Subheading"
                  ).attributes.text}
              </div>
              <div className=" w-full text-primary font-custom-avenir text-md leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "Introduction_Description1"
                  ).attributes.text}
              </div>
              <div className=" w-full text-primary text-md font-custom-avenir leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "Introduction_Description2"
                  ).attributes.text}
              </div>
              <button
                className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-40 my-3"
                onClick={() =>{
                  //scroll to top
                  navigate("/about");
                }}
              >
                Find Out More
              </button>
            </div>
          </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
        </div>
      )}

      <FadeInSection>
        {dynamicImages !== null ? (
          <HowWeDoIt
            dynamicText={dynamicText}
            dynamicImages={dynamicImages}
          ></HowWeDoIt>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>

      <FadeInSection>
        {dynamicImages !== null && dynamicText !== null ? (
          <div className="bg-neutral-100 rounded-tl-[50px] md:rounded-tl-[100px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center md:p-5 pt-10 md:pt-0 lg:p-10 lg:pl-10 gap-10 container mx-auto">
              <div className="text-center lg:text-left md:pr-5">
                <div className="text-secondary font-custom-adam text-md pb-3 pt-10">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "Lease_Heading"
                    ).attributes.text}
                </div>
                <div className="text-primary font-custom-kiona uppercase text-2xl md:text-3xl pb-3">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "Lease_Subheading"
                    ).attributes.text}
                </div>
                <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) => text.attributes.name === "Lease_Description"
                    ).attributes.text}
                </div>
                <button
                className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-40 my-3"
                onClick={() =>{
                  //scroll to top
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Get A Quote
              </button>
              </div>
              <div className="flex justify-center w-full rounded-lg">
                <img
                  className=" h-[400px] lg:h-[500px] w-full sm:w-1/2 lg:w-full rounded-md object-cover drop-shadow-lg"
                  src={
                    `${config.STRAPI_URL}` +
                    dynamicImages.find(
                      (image) =>
                        image.attributes.name ===
                        "HomeOwners_LeaseAgreeement_Image.jpg"
                    ).attributes.url
                  }
                  alt="Placeholder"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>

      {/* <FadeInSection> */}
      {dynamicImages !== null && dynamicText !== null ? (
        <HowWeWork
          dynamicText={dynamicText}
          dynamicImages={dynamicImages}
        ></HowWeWork>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
        </div>
      )}
      {/* </FadeInSection> */}
      <FadeInSection>
        {dynamicImages !== null && dynamicText !== null ? (
          <div className="bg-neutral-100 w-full grid grid-cols-1 md:grid-cols-2 place-items-center px-5 md:px-10 py-5 md:py-20 gap-10 mt-10">
            <div className="w-full flex justify-center">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_AreYouAHomeOwner_Image.jpg"
                  ).attributes.url
                }
                alt="Img"
                className="w-full h-full rounded-md object-cover drop-shadow-lg"
              ></img>
            </div>
            <div className="flex w-full">
              <div className="flex flex-col justify-center md:justify-start">
                <div className="text-secondary text-md font-custom-adam text-center md:text-start pb-3 md:pt-10">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "AreYouAHomeOwner_Heading"
                    ).attributes.text}
                </div>
                <div className="text-primary font-custom-kiona uppercase text-center md:text-start text-2xl md:text-3xl pb-3">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "AreYouAHomeOwner_Subheading"
                    ).attributes.text}
                </div>
                <div className=" w-full text-primary text-md font-custom-avenir font-normal leading-normal pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "AreYouAHomeOwner_Content"
                    ).attributes.text}
                </div>
                <div className="w-full flex justify-center md:justify-start">
                  <button
                  className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom-kiona capitalize py-2 px-4 h-12 w-40 my-3"
                  onClick={() => navigate("/about")}
                >
                  Find Out More
                </button>
              </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>

      {/* <FadeInSection>
        <BlogContainer></BlogContainer>
      </FadeInSection> */}
      <FadeInSection>
        <ReviewShowcaseSection></ReviewShowcaseSection>
      </FadeInSection>
        <OurPartnersSection></OurPartnersSection>
      <Footer></Footer>
      </div>
      : <div className="flex justify-center items-center mt-10">
      <div className="animate-spin rounded-full h-32 w-32 border-dashed border-2 border-gray-900"></div>
    </div>  
    }
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

export default ManagementPage;
