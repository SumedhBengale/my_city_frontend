import React, { useEffect, useState } from "react";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import HowWeDoIt from "./HowWeDoIt";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import managementBackground from "../../assets/images/management/management_background.png";
import ReviewShowcaseSection from "../HomePage/ReviewShowcaseSection";
import OurPartnersSection from "../AboutUs/OurPartnersSection";
import Footer from "../HomePage/Footer";
import BlogContainer from "./BlogContainer";
import {
  getCities,
  getDynamicText,
  getHomeOwnersPageImages,
  newEnquiry,
} from "./api";
import config from "../../config/config";
import HowWeWork from "./HowWeWork";
import { ToastContainer, toast } from "react-toastify";
import enquiryIcon from "../../assets/images/management/enquiry_Icon.png";
import logoBlack from "../../assets/images/black_logo.png";

function ManagementPage() {
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
  const [cities, setCities] = useState(null);

  useEffect(() => {
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
    getCities().then((data) => {
      console.log("City List", data);
      const cities = data.data.attributes.locations;
      //if cities is a string, separate it by comma and convert it to an array where the key is 'city and the value is the city name'
      if (typeof cities === "string") {
        const citiesArray = cities.split(",");
        const citiesObject = citiesArray.map((city) => {
          return { city: city };
        });
        console.log(citiesObject);
        setCities(citiesObject);
        //Set default location to the first city in the list
        setLocation(citiesObject[0].city);
      }
    });
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

  const handleQuotePopUp = () => {
    console.log(postCode);
    //Check if postcode is valid for UK
    if (postCode === "") {
      toast.error("Please enter a postcode");
      return;
    }
    //If valid, show enquiry pop up
    if (postCode.length < 6) {
      toast.error("Please enter a valid postcode");
      return;
    }
    setEnquiryPopUpVisible(true);
    setEnquiryPopUpVisible(!enquiryPopUpVisible);
  };

  return (
    <>
      <div
        style={{
          //Blurry Background Image
          backgroundImage: `url(${managementBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "80vh",
        }}
        className="relative"
      >
        {" "}
        {/* Background Image */}
        <div className="hidden md:block z-30 fixed w-full">
          {<DesktopNavbarBlack />}
        </div>
        <div className="md:hidden z-30 fixed w-full">{<NavbarBlack />}</div>
        {enquiryPopUpVisible && (
          <div className="fixed bottom-0 z-40 w-full h-full flex items-end justify-center md:items-center overflow-hidden backdrop-filter backdrop-blur-md">
            <div className="h-5/6 lg:h-5/6 w-full md:w-max z-30 overflow overflow-auto rounded-t-2xl md:rounded-2xl drop-shadow-2xl flex flex-col no-scrollbar">
              <div className=" bg-neutral-100 rounded-lg p-5 md:p-10 divide-solid gap-5 md:gap-0">
                <div className="flex flex-col">
                  <div className="flex justify-end">
                    <div
                      className="font-bold"
                      onClick={() => {
                        setEnquiryPopUpVisible(false);
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
                          and long lets that takes advantage of short let peaks
                          and the security of long lets.
                        </div>
                        <div className="text-center text-sm md:text-md text-primary">
                          Enter the details of the property you would like us to
                          manage for a rental valuation.
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
                              {cities !== null &&
                                cities.map((city) => {
                                  return (
                                    <option value={city.city}>
                                      {city.city}
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
                            onChange={(e) => setPropertiesCount(e.target.value)}
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
                        className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3"
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
        <div className="h-full flex flex-col justify-center items-center z-0 bg-black/40 backdrop-filter backdrop-blur-sm">
          <div className="max-w-2xl flex flex-col justify-center items-center px-3">
            <div className="font-custom-bold text-center text-4xl md:text-5xl text-white md:pt-40 pb-4 capitalize">
              Unlock your properties true potential
            </div>
            <div className=" text-lg w-full text-center font-custom text-white sm-3 lg:mb-10 capitalize">
              Boost yield, maximise income and easily manage your property by
              partnering with MyCityResidences the London property experts.
            </div>
            <div className="w-full flex justify-center">
              <input
                className="bg-white rounded-l-lg px-4 h-full w-full md:w-96"
                onChange={(e) => setPostCode(e.target.value)}
                placeholder="Enter Postcode"
              ></input>
              <button
                className="bg-primary hover:bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-full w-40 rounded-r-lg uppercase"
                onClick={() => handleQuotePopUp()}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
      {dynamicImages !== null && dynamicText !== null ? (
        <div className="bg-white -translate-y-24 rounded-tl-[50px] md:rounded-tl-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:px-20 lg:pt-20 lg:pl-10 gap-2 container mx-auto">
            <div className="flex justify-center w-full">
              <img
                className=" h-[400px] lg:h-[600px] w-full sm:w-1/2 lg:w-full rounded-tl-[80px] py-5 lg:pr-10"
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
            </div>
            <div className="text-center lg:text-left pr-5">
              <div className="text-secondary  text-md pb-3 pt-10">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Introduction_Heading"
                  ).attributes.text}
              </div>
              <div className="text-primary font-custom text-3xl capitalize pb-3">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Introduction_Subheading"
                  ).attributes.text}
              </div>
              <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "Introduction_Description1"
                  ).attributes.text}
              </div>
              <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) =>
                      text.attributes.name === "Introduction_Description2"
                  ).attributes.text}
              </div>
            </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:p-10 lg:pl-10 gap-10 container mx-auto">
            <div className="text-center lg:text-left pr-5">
              <div className="text-secondary text-md pb-3 pt-10">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Lease_Heading"
                  ).attributes.text}
              </div>
              <div className="text-primary font-custom-bold text-3xl capitalize pb-3">
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
              <button className="bg-primary hover-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3">
                Find Out More
              </button>
            </div>
            <div className="flex justify-center w-full rounded-lg">
              <img
                className=" h-[400px] lg:h-[500px] w-full sm:w-1/2 lg:w-full rounded-md py-5 lg:pr-10 object-cover"
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
          <div className="bg-neutral-100 w-full grid grid-cols-1 md:grid-cols-2 place-items-center px-10 py-20 gap-10 mt-10">
            <div className="w-full flex justify-center">
              <img
                src={
                  `${config.STRAPI_URL}` +
                  dynamicImages.find(
                    (image) =>
                      image.attributes.name ===
                      "HomeOwners_EndToEndManagement_Image.jpg"
                  ).attributes.url
                }
                alt="Img"
                className="w-full h-full rounded-md object-cover"
              ></img>
            </div>
            <div className="flex w-full">
              <div className="flex flex-col justify-center md:justify-start">
                <div className="text-secondary text-md pb-3 pt-10">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "EndToEndManagement_Heading"
                    ).attributes.text}
                </div>
                <div className="text-primary font-custom-bold text-3xl capitalize pb-3">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "EndToEndManagement_Subheading"
                    ).attributes.text}
                </div>
                <div className=" w-full text-primary text-md font-normal leading-normal pb-5">
                  {dynamicText !== null &&
                    dynamicText.find(
                      (text) =>
                        text.attributes.name === "EndToEndManagement_Content"
                    ).attributes.text}
                </div>
                <button className="bg-primary hover:bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3">
                  Find Out More
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        )}
      </FadeInSection>

      <FadeInSection>
        <BlogContainer></BlogContainer>
      </FadeInSection>
      <FadeInSection>
        <ReviewShowcaseSection></ReviewShowcaseSection>
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

export default ManagementPage;
