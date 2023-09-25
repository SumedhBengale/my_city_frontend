import { React, useEffect, useState } from "react";
import loginBackground from "../../assets/images/login/login_background.png";
import Logo from "../../assets/images/white_logo.png";
import GoogleLogo from "../../assets/images/login/google_logo.svg";
import FacebookLogo from "../../assets/images/login/facebook_logo.svg";
import EmailLogo from "../../assets/images/login/email_logo.svg";
import { useNavigate } from "react-router-dom";
import { getVideos, login } from "./api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from '../../config/config';
import Navbar from '../../components/navbar';
import NavbarBlack from '../../components/navbar_black';
import DesktopNavbar from '../../components/desktopNavbar';
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'

const LoginPage = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    getVideos().then((res) => {
      console.log(res.data);
      setVideos(res.data);
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

  const handleSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("userType", response.userType);
        //Navigate to the previous page
        navigate(-1);
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

  return (
    <>
      <div className="hidden md:block z-40 fixed top-0 w-full">
        {<DesktopNavbar />}
      </div>
      <div className="md:hidden z-40 fixed top-0 w-full">
        {<Navbar />}
      </div>
        <div
        style={{
          width: '100%',
          height: '100vh',
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
        {/* Background Image */}
        <div className="absolute h-full w-full bg-black/40"></div>

        <div className="h-full relative scale-100 sm:scale-75 2xl:scale-100">
          <div className="w-full flex justify-center items-start md:items-center md:h-full pt-20 md:pt-0">
          <div className="mx-4 md:w-1/2 xl:w-1/3">
            <div className="w-full flex justify-center items-center">
              <img
                src={Logo}
                alt="My City Logo"
                className="w-48 self-center mb-5"
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
                      <div className="text-white underline">
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

            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0">
              <div class="w-full relative h-full z-0 flex">
                <button className="w-full text-center self-center text-black flex justify-center items-center">
                  Continue with Facebook
                </button>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                  <div class="flex h-full items-center justify-center">
                    <img
                      src={FacebookLogo}
                      alt="Google Logo"
                      className="pl-4 pt-3 self-start z-10"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0">
              <div class="w-full relative h-full z-0 flex">
                <button className="w-full text-center self-center text-black flex justify-center items-center">
                  Continue with Google
                </button>

                <div class="absolute inset-y-0 left-0 z-10 self-start">
                  <div class="flex h-full items-center justify-center">
                    <img
                      src={GoogleLogo}
                      alt="Google Logo"
                      className="pl-4 pt-3 self-start z-10"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0">
              <div class="w-full relative h-full z-0 flex">
                <button
                  className="w-full text-center self-center text-black flex justify-center items-center"
                  onClick={() => navigate("/signup")}
                >
                  SignUp with Email
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
