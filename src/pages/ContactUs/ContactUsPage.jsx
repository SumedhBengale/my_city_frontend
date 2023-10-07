import React, { useEffect } from "react";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import contactBackground from "../../assets/images/contact/contactBackground.jpeg";
import Footer from "../HomePage/Footer";
import location_black from "../../assets/images/contact/location_black.svg";
import phone_black from "../../assets/images/contact/phone_black.svg";
import email_black from "../../assets/images/contact/email_black.svg";
import FadeInSetion from "../../components/fadeIn/fadeInSection";
import MapContainer from "../Property/MapContainer";
import { ToastContainer, toast } from "react-toastify";
import whiteLogo from "../../assets/images/white_logo.png";
import { addContactUsRequest, getDynamicImages, getDynamicText } from "./api";
import config from "../../config/config";
import logoWhite from "../../assets/images/white_logo.png";

function ContactUs() {
  //List of checkboxes
  const checkboxes = ["email", "phone", "whatsapp", "text"];
  const [selectedcheckboxes, setSelectedcheckboxes] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [dynamicText, setDynamicText] = React.useState(null);
  const [dynamicImages, setDynamicImages] = React.useState(null);
  const [hidden, setHidden] = React.useState(false);

  useEffect(() => {
    getDynamicImages()
      .then((res) => {
        console.log(res.data[0].attributes.images.data);
        setDynamicImages(res.data[0].attributes.images.data);
      })      
    getDynamicText().then((res) => {
        console.log(res.data);
        setDynamicText(res.data);
    });

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

  const handleSubmit = () => {
    //check if name and (email or phone) and at least one checkbox is selected
    if (
      name !== "" &&
      (email !== "" || phone !== "") &&
      selectedcheckboxes.length > 0
    ) {
      //print everything
      console.log(name, email, phone, message, selectedcheckboxes);
      //Validate email and phone if they are not empty
      if (email !== "" && !email.includes("@")) {
        toast.error("Please provide a valid email address");
        return;
      }
      if (phone !== "" && (phone.length !== 10 || phone.length !== 11)) {
        toast.error("Please provide a valid phone number");
        return;
      }
      addContactUsRequest({
        userId: localStorage.getItem("userId"),
        name,
        email,
        phone,
        message,
        contactMethods: selectedcheckboxes,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            toast.success(
              "Thank you for contacting us, we will get back to you soon"
            );
          } else {
            toast.error("Something went wrong, please try again later");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong, please try again later");
        });
      //reset the form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSelectedcheckboxes([]);
    } else {
      //show toast error
      toast.error(
        "Please provide your name and email or phone number and at least one contact method"
      );
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
                (image) => image.attributes.name === "ContactBackground.jpeg"
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
              {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "ContactUs_Heading").attributes.text}
            </div>
            <div className=" text-2xl md:text-4xl w-full text-center font-custom-kiona text-white sm-3 lg:mb-10 capitalize">
            {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "ContactUs_Subheading").attributes.text}
            </div>
      </div>
        <div className="bg-white translate-y-0 rounded-tl-[50px] md:rounded-tl-[100px] z-30 pt-10" style={{
        marginTop: '70vh'
      }}>      
          <div className="flex flex-col justify-center items-start h-full bg-neutral-100 w-full px-5 m-5 rounded-lg md:container mx-auto">
            <div className="font-custom-bold text-xl  md:mx-0 mt-10 text-black uppercase">
              Get In Touch
            </div>
            <hr className="w-36 border-sm my-4 ml-3  md:mx-0 border-[1px] border-black" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 place-items-start gap-4">
              <div className="w-full flex flex-col justify-center items-start order-2 lg:order-1">
                <div className="font-custom-kiona text-md  md:mx-0 mt-3 text-black">
                  Name
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3  md:mx-0 drop-shadow-md"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>

                <div className="font-custom-kiona text-md  md:mx-0 mt-3 text-black">
                  Phone
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3  md:mx-0 drop-shadow-md"
                  type="phone"
                  value={phone}
                  onChange={(e) => {
                    //Only allow numbers
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setPhone(e.target.value);
                    }
                  }}
                ></input>

                <div className="font-custom-kiona text-md  md:mx-0 mt-3 text-black">
                  Email
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3  md:mx-0 drop-shadow-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>

                <div className="font-custom-kiona text-md  md:mx-0 mt-3 text-black">
                  Message
                </div>
                <textarea
                  className="w-full h-40 rounded-lg px-3  md:mx-0 drop-shadow-md"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <div className="font-custom-kiona text-md  md:mx-0 mt-3 text-primary uppercase">
                  Preferred method of contact
                </div>
                <div className="flex flex-row justify-start items-center  md:mx-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 capitalize">
                    {checkboxes.map((checkbox) => (
                      <div
                        key={checkbox}
                        className="flex items-center gap-1 mt-1"
                      >
                        <input
                          type="checkbox"
                          id={checkbox}
                          name={checkbox}
                          value={checkbox}
                          onChange={() => {
                            //if the checkbox is selected add it to selectedcheckboxes else remove it from selectedcheckboxes
                            if (selectedcheckboxes.includes(checkbox)) {
                              setSelectedcheckboxes(
                                selectedcheckboxes.filter(
                                  (selectedcheckbox) =>
                                    selectedcheckbox !== checkbox
                                )
                              );
                            } else {
                              setSelectedcheckboxes([
                                ...selectedcheckboxes,
                                checkbox,
                              ]);
                            }
                          }}
                          className="hidden" // Hide the default checkbox
                        />
                        <label
                          htmlFor={checkbox}
                          className={` h-5 w-5 border rounded-md cursor-pointer transition-colors ${
                            selectedcheckboxes.includes(checkbox)
                              ? "bg-secondary"
                              : "bg-white"
                          }`}
                        >
                          {(selectedcheckboxes.includes(checkbox) && (
                            <div className="translate-y-[1px] translate-x-[1px]">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={4}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )) || <div className="w-4 h-4"></div>}
                        </label>
                        <span className="text-sm pl-2 overflow-hidden overflow-ellipsis">
                          {checkbox}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px] px-3 md:px-0 pt-10 order-1 lg:order-2">
                {dynamicText !== null && <MapContainer coordinate={{ 
                  lat: parseFloat(dynamicText.find((text) => text.attributes.name === "Coordinate").attributes.text.split(",")[0]),
                  lng: parseFloat(dynamicText.find((text) => text.attributes.name === "Coordinate").attributes.text.split(",")[1])
                 }} />}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <button
                className="w-40 h-10 bg-primary text-md hover:bg-secondary font-custom-kiona transition duration-75 hover:scale-105 text-white rounded-lg mt-5 mb-5"
                onClick={() => {
                  handleSubmit();
                }}
              >
                SUBMIT
              </button>
            </div>
            {dynamicText !== null ?<div className="flex flex-col w-full">
            <div className="flex w-full justify-center">
              <div className=" my-5 flex flex-col text-center">
                <span className="text-zinc-800 text-xs font-normal leading-normal">
                {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "Greeting").attributes.text}

                </span>
                <span className="text-zinc-800 text-xs font-semibold leading-normal">
                {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "Email").attributes.text}
                </span>
              </div>
            </div>
            <div className="pt-5 pl-0 md:pl-5">
              <div className=" flex items-center h-full mt-5">
                <img
                  src={location_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                  {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "Address").attributes.text}
                </div>
              </div>

              <div className="flex items-center h-full mt-5">
                <img
                  src={phone_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                {dynamicText !== null && dynamicText.find((text) => text.attributes.name === "Phone").attributes.text}
                </div>
              </div>

              <div className="flex items-center h-full mt-5 mb-5">
                <img
                  src={email_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                {dynamicText.find((text) => text.attributes.name === "Email").attributes.text}
                </div>
              </div>
            </div>
          </div>
          : 
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>  
          </div>
        }
          </div>
      {/* <FadeInSetion> */}
      <Footer></Footer>
      </div>

      {/* </FadeInSetion> */}
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

export default ContactUs;
