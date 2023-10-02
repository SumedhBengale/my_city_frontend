import { React, useEffect, useState, useRef } from "react";
import Logo from "../../assets/images/white_logo.png";
import EmailLogo from "../../assets/images/login/email_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { getClientId, getVideos, login, sendResetPasswordLink } from "./api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config/config";
import Navbar from "../../components/navbar";
import DesktopNavbar from "../../components/desktopNavbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";
import { FacebookProvider } from "react-facebook";
import FacebookLoginButton from "./FacebookLoginButton";

const LoginPage = () => {
  const location = useLocation();
  const [videos, setVideos] = useState(null);
  const [forgetDialogVisible, setForgetDialogVisible] = useState(false);
  const forgetDialogRef = useRef(null);
  const [googleClientId, setGoogleClientId] = useState(null);
  const [facebookAppId, setFacebookAppId] = useState(null);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    getVideos().then((res) => {
      console.log(res.data);
      setVideos(res.data);
    });
    getClientId().then((res) => {
      console.log(res);
      setGoogleClientId(res.googleClientId);
      setFacebookAppId(res.facebookAppId);
    });
  }, []);
  const navigate = useNavigate();
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const resetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("userType", response.userType);
        //Navigate to the previous page
        if (
          location.state &&
          (location.state.from === "signup" ||
            location.state.from === "resetPassword" ||
            location.state.from === "verifyEmail")
        ) {
          navigate("/");
        } else {
          navigate(-1);
        }
      } else if (response.status === 404) {
        toast.error("User not Found");
      } else if (response.status === 401) {
        toast.error("Incorrect Password");
      } else if (response.status === 403) {
        toast.error("Please Verify Your Email");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing your request");
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const response = await sendResetPasswordLink(values.email);
      if (response.status === 200) {
        toast.success("Password Reset Email Sent");
      } else if (response.status === 404) {
        toast.error("User not Found");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <>
      <div className="hidden md:block z-40 fixed top-0 w-full">
        {<DesktopNavbar />}
      </div>
      <div className="md:hidden z-40 fixed top-0 w-full">{<Navbar />}</div>
      <div
        style={{
          width: "100%",
          height: "100dvh",
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
                      (video) => video.attributes.name === "Login_Video"
                    ).attributes.video.data.attributes.url
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {forgetDialogVisible && (
          <div
            className="fixed top-0 left-0 w-full flex flex-col justify-center items-center h-full z-40 backdrop-filter backdrop-blur-sm"
            //when clicked outside the dialog, close
            onClick={(e) => {
              if (
                forgetDialogRef.current &&
                !forgetDialogRef.current.contains(e.target)
              ) {
                setForgetDialogVisible(false);
              }
            }}
          >
            <div className="absolute h-screen w-screen bg-black/40 z-30"></div>
            <div className="uppercase z-40 h-full w-full sm:w-1/2 md:w-1/3">
              <div className="flex flex-col mx-5 mb-10 justify-center items-center h-full">
                <div
                  className=" px-4 py-5 bg-white overflow-scroll no-scrollbar h-min rounded-lg w-full"
                  ref={forgetDialogRef}
                >
                  <div className="text-2xl font-custom-kiona text-primary px-2 pb-4">
                    Reset Password
                  </div>
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={resetPasswordValidationSchema}
                    onSubmit={handleResetPassword}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="flex flex-col">
                          <label className="text-sm font-custom-kiona text-primary px-2 pb-2">
                            Enter your Email
                          </label>
                          <Field
                            name="email"
                            type="text"
                            className="w-full h-12 px-2 bg-white rounded-lg border"
                            placeholder="Email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div className="flex w-full justify-center">
                          <button
                            type="submit"
                            className="w-48 bg-primary hover:bg-secondary hover:scale-105 transition duration-75 flex justify-center text-white items-center h-12 mt-4 px-2 rounded-lg font-custom-kiona"
                          >
                            Reset Password
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Background Image */}
        <div className="absolute h-full w-full bg-black/40"></div>

        <div className="h-full relative scale-100 sm:scale-75 2xl:scale-100">
          <div className="w-full flex justify-center items-center h-full pt-20 md:pt-0">
            <div className="mx-4 md:w-1/2 xl:w-1/3">
              <div className="w-full flex justify-center items-center">
                <img
                  src={Logo}
                  alt="My City Logo"
                  className="w-48 self-center mb-5 hidden md:block"
                ></img>
              </div>
              <div className="w-full h-full p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md">
                {/* Blur Rectangle */}
                <div className="text-white text-[18px] font-bold">
                  Welcome Back
                </div>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        name="email"
                        type="text"
                        className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        name="password"
                        type="password"
                        className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                      {/* Forgot Password Link */}
                      <div className="flex justify-end items-center mt-4">
                        <div
                          className="text-white underline cursor-pointer"
                          onClick={() => setForgetDialogVisible(true)}
                        >
                          Forgot Password?
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black"
                      >
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div class="flex items-center w-full py-4">
                {" "}
                {/* Divider */}
                <hr className=" w-full border-sm my-4" />
                <span class="flex-shrink font-custom-kiona text-lg text-white px-4 italic font-light">
                  or
                </span>
                <hr className="w-full border-sm my-4" />
              </div>

              {facebookAppId !== null && (
                <FacebookProvider appId={facebookAppId}>
                  <FacebookLoginButton
                    facebookAppId={facebookAppId}
                    returnData={(data) => {
                      console.log("FB DATA", data);
                      if (data.status === 409) {
                        toast.error("Email already exists");
                        return;
                      }
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("userId", data.userId);
                      localStorage.setItem("userType", data.userType);
                      //Navigate to the previous page
                      if (
                        location.state &&
                        (location.state.from === "signup" ||
                          location.state.from === "resetPassword" ||
                          location.state.from === "verifyEmail")
                      ) {
                        navigate("/");
                      } else {
                        navigate(-1);
                      }
                    }}
                    returnToast={(message) => {
                      toast.error(message);
                    }}
                  ></FacebookLoginButton>
                </FacebookProvider>
              )}
              {googleClientId !== null && (
                <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLoginButton
                    returnData={(data) => {
                      console.log(data);
                      if (data.status === 409) {
                        toast.error("Email already exists");
                        return;
                      }
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("userId", data.userId);
                      localStorage.setItem("userType", data.userType);
                      //Navigate to the previous page
                      if (
                        location.state &&
                        (location.state.from === "signup" ||
                          location.state.from === "resetPassword" ||
                          location.state.from === "verifyEmail")
                      ) {
                        navigate("/");
                      } else {
                        navigate(-1);
                      }
                    }}
                    returnToast={(message) => {
                      toast.error(message);
                    }}
                  ></GoogleLoginButton>
                </GoogleOAuthProvider>
              )}
              <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0">
                <div class="w-full relative h-full z-0 flex">
                  <button
                    className="w-full text-center self-center text-black flex justify-center items-center"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up with Email
                  </button>

                  <div class="absolute inset-y-0 left-0 z-10 self-start">
                    <div class="flex h-full items-center justify-center">
                      <img
                        src={EmailLogo}
                        alt="Google Logo"
                        className="pl-4 pt-3 self-start z-10"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default LoginPage;
