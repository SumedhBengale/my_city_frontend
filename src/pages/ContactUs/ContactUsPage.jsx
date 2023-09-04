import React from "react";
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
import { addContactUsRequest } from "./api";

function ContactUs() {
  //List of checkboxes
  const checkboxes = ["email", "phone", "whatsapp", "text"];
  const [selectedcheckboxes, setSelectedcheckboxes] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

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
      if (phone !== "" && phone.length !== 10) {
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
    <>
      <div
        style={{
          backgroundImage: `url(${contactBackground})`,
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
        <div className="h-full flex flex-col justify-center items-center z-0 bg-black/40 backdrop-filter backdrop-blur-sm">
          <div className="flex justify-center items-center mx-10">
            <img
              src={whiteLogo}
              alt="My City Logo"
              className="w-48 lg:w-72 self-start mb-10"
            ></img>
          </div>
          <div className="font-custom-bold text-4xl md:text-5xl text-white text-center pb-4 capitalize">
            Contact Us
          </div>
          <div className=" text-2xl md:text-4xl w-full text-center font-custom text-white sm-3 lg:mb-10 capitalize">
            We offer unique places suitable for your comfort
          </div>
        </div>
      </div>
      <FadeInSetion>
        <div className="w-full h-full px-5 bg-white -translate-y-24 rounded-tl-[50px] md:rounded-tl-[100px] pt-20">
          <div className="flex flex-col justify-center items-start h-full bg-gray-200 w-full md:px-5 m-5 rounded-lg container mx-auto">
            <div className="font-custom-bold text-xl mx-3 md:mx-0 mt-10 text-black">
              Get In Touch
            </div>
            <hr className="w-36 border-sm my-4 ml-3 mx-3 md:mx-0 border-[1px] border-black" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 place-items-start gap-4">
              <div className="w-full flex flex-col justify-center items-start order-2 lg:order-1">
                <div className="font-custom text-lg mx-3 md:mx-0 mt-3 text-black">
                  Name
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3 mx-3 md:mx-0 drop-shadow-md"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>

                <div className="font-custom text-xl mx-3 md:mx-0 mt-3 text-black">
                  Phone
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3 mx-3 md:mx-0 drop-shadow-md"
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

                <div className="font-custom text-xl mx-3 md:mx-0 mt-3 text-black">
                  Email
                </div>
                <input
                  className="w-full h-10 rounded-lg px-3 mx-3 md:mx-0 drop-shadow-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>

                <div className="font-custom text-xl mx-3 md:mx-0 mt-3 text-black">
                  Message
                </div>
                <textarea
                  className="w-full h-40 rounded-lg px-3 mx-3 md:mx-0 drop-shadow-md"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <div className="font-custom-bold text-xl mx-3 md:mx-0 mt-3 text-black">
                  Prefferred method of contact
                </div>
                <div className="flex flex-row justify-start items-center mx-3 md:mx-0">
                  <div className="grid grid-cols-2 gap-2 capitalize">
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
                          className={` h-5 w-5 border border-secondary rounded-md cursor-pointer transition-colors ${
                            selectedcheckboxes.includes(checkbox)
                              ? "bg-secondary"
                              : "bg-white"
                          }`}
                        >
                          {(selectedcheckboxes.includes(checkbox) && (
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

              <div className="w-full h-[450px] pt-10 order-1 lg:order-2">
                <MapContainer coordinate={{ lat: 40.7128, lng: -74.006 }} />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <button
                className="w-40 h-10 bg-primary hover:bg-secondary text-white rounded-lg mt-5 mb-5"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
            <div className="flex w-full justify-center">
              <div className="mx-3 my-5 flex flex-col text-center">
                <span className="text-zinc-800 text-xs font-normal leading-normal">
                  Thank you so much for your interest! We’d love to hear from
                  you and help you book your dream vacation! Please submit your
                  email or email directly to:{" "}
                </span>
                <span className="text-zinc-800 text-xs font-semibold leading-normal">
                  info@mycityresidences.com
                </span>
              </div>
            </div>
            <div className="pt-5 pl-5">
              <div className=" flex items-center h-full mt-5">
                <img
                  src={location_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                  96 Earls Court Road, Kensington, W8 6EG
                </div>
              </div>

              <div className="flex items-center h-full mt-5">
                <img
                  src={phone_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                  +44 744 221 1353
                </div>
              </div>

              <div className="flex items-center h-full mt-5 mb-5">
                <img
                  src={email_black}
                  alt="location"
                  className="w-8 pr-3"
                ></img>
                <div className=" w-full text-black text-sm flex items-center">
                  info@mycityresidences.comk
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSetion>
      {/* <FadeInSetion> */}
      <Footer></Footer>
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
    </>
  );
}

export default ContactUs;
