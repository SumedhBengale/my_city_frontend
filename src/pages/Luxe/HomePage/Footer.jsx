import { React, useEffect, useState } from "react";
import twitter from "../../../assets/images/home/twitter_white.svg";
import facebook from "../../../assets/images/home/facebook_white.svg";
import instagram from "../../../assets/images/home/instagram_white.svg";
import linkedin from "../../../assets/images/home/linkedin_white.svg";
import luxeLogo from "../../../assets/images/luxeLogo.png";
import { getFooter } from "./api";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    getFooter().then((res) => {
      setFooter(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <div className="Rectangle w-full rounded-tl-[50px] md:rounded-tl-[100px] bg-gradient-to-b from-primary via-primary to-primary/60 h-full]">
        {footer !== null ? (
          <div className="mx-0 2xl:container 2xl:mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between w-full px-4">
              <div className="flex flex-col md:flex-row w-full md:w-1/3 justify-evenly order-2 md:order-1">
                <div className="pt-10 pl-5 py-10">
                  <div
                    className="font-custom-bold text-white font-bold text-xl pl-3"
                    oncli
                  >
                    Explore
                  </div>
                  <div
                    className="text-white text-md pt-3 pl-3 cursor-pointer"
                    onClick={() => navigate("/luxe")}
                  >
                    Home
                  </div>
                  <div
                    className="text-white text-md pt-3 pl-3 cursor-pointer"
                    onClick={() =>
                      navigate("/properties", { state: { luxe: true } })
                    }
                  >
                    Properties
                  </div>
                  <div
                    className="text-white text-md pt-3 pl-3 cursor-pointer"
                    onClick={() => navigate("/homeowners")}
                  >
                    Rental Estimate
                  </div>
                </div>

                <div className="pt-10 pl-5 py-10">
                  <div className="font-custom-bold text-white font-bold text-xl pl-3">
                    Company
                  </div>
                  <div
                    className="text-white text-md pt-3 pl-3"
                    onClick={() => navigate("/about")}
                  >
                    About Us
                  </div>
                  <div className="text-white text-md pt-3 pl-3">Blogs</div>
                  <div
                    className="text-white text-md pt-3 pl-3"
                    onClick={() => navigate("/homeowners")}
                  >
                    Management
                  </div>
                </div>
              </div>

              <div className="pl-0 md:pl-5 sm:pl-0 h-full flex md:items-between md:justify-between flex-col order-1 md:order-2">
                <div className="flex flex-col h-min pt-4 px-4">
                  <div className="flex justify-center mb-5">
                    <img
                      src={luxeLogo}
                      alt="logo"
                      className="h-24 max-w-[300px] pt-5 md:pt-0"
                    ></img>
                  </div>

                  <div className="flex justify-center mt-5 gap-5">
                    <img
                      src={twitter}
                      alt="twitter"
                      className="w-5 h-5 ml-1 mt-1 cursor-pointer"
                      onClick={() => {
                        window.location.href = footer.find(
                          (text) => text.attributes.name === "twitterLink"
                        ).attributes.text;
                      }}
                    ></img>

                    <img
                      src={facebook}
                      alt="facebook"
                      className="w-5 h-5 ml-1 mt-1 cursor-pointer"
                      onClick={() => {
                        window.location.href = footer.find(
                          (text) => text.attributes.name === "facebookLink"
                        ).attributes.text;
                      }}
                    ></img>

                    <img
                      src={instagram}
                      alt="instagram"
                      className="w-5 h-5 ml-1 mt-1 cursor-pointer"
                      onClick={() => {
                        window.location.href = footer.find(
                          (text) => text.attributes.name === "instagramLink"
                        ).attributes.text;
                      }}
                    ></img>

                    <img
                      src={linkedin}
                      alt="linkedin"
                      className="w-5 h-5 ml-1 mt-1 cursor-pointer"
                      onClick={() => {
                        window.location.href = footer.find(
                          (text) => text.attributes.name === "linkedInLink"
                        ).attributes.text;
                      }}
                    ></img>
                  </div>
                </div>
                <div className="text-center text-white mt-5 text-sm pl-5 hidden md:block">
                  <div className="w-full items-center flex flex-col">
                    {
                      footer.find(
                        (text) => text.attributes.name === "copyrightStatement"
                      ).attributes.text
                    }
                    <div className="flex gap-3 cursor-pointer underline">
                      <div onClick={() => navigate("terms-of-use")}>
                        Terms of Use
                      </div>
                      <div onClick={() => navigate("/privacy-policy")}>
                        Privacy Policy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 pl-5 order-3  py-10">
                <div className="font-custom-bold text-white text-xl w-full">
                  Contact Us
                </div>
                <div className=" flex items-center mt-5">
                  <div alt="address" className="w-10 pr-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="location">
                        <path
                          id="Vector"
                          d="M12 2C9.879 2.00238 7.84555 2.846 6.34578 4.34578C4.846 5.84555 4.00238 7.879 4 10C4 13.255 6.363 15.958 8.866 18.819C9.658 19.725 10.478 20.662 11.208 21.61C11.3014 21.7312 11.4214 21.8293 11.5587 21.8968C11.696 21.9644 11.847 21.9995 12 21.9995C12.153 21.9995 12.304 21.9644 12.4413 21.8968C12.5786 21.8293 12.6986 21.7312 12.792 21.61C13.522 20.662 14.342 19.725 15.134 18.819C17.637 15.958 20 13.255 20 10C19.9976 7.879 19.154 5.84555 17.6542 4.34578C16.1544 2.846 14.121 2.00238 12 2ZM12 13C11.4067 13 10.8266 12.8241 10.3333 12.4944C9.83994 12.1648 9.45542 11.6962 9.22836 11.1481C9.0013 10.5999 8.94189 9.99667 9.05764 9.41473C9.1734 8.83279 9.45912 8.29824 9.87868 7.87868C10.2982 7.45912 10.8328 7.1734 11.4147 7.05764C11.9967 6.94189 12.5999 7.0013 13.1481 7.22836C13.6962 7.45542 14.1648 7.83994 14.4944 8.33329C14.8241 8.82664 15 9.40666 15 10C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7956 13 12 13Z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className=" w-full text-white text-md flex items-center">
                    {
                      footer.find((text) => text.attributes.name === "address")
                        .attributes.text
                    }
                  </div>
                </div>

                <div className="mr-5">
                  <div className="w-full h-[1px] bg-white mt-3 mr-20" />
                </div>

                <div className="flex items-center mt-5">
                  <div alt="location" className="w-10 pr-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="call">
                        <path
                          id="Vector"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.7303 16.996C19.2673 18.403 17.4533 19.105 16.1573 18.988C14.3873 18.828 12.4613 17.889 10.9993 16.855C8.8503 15.335 6.8373 12.984 5.6643 10.489C4.8353 8.72596 4.6493 6.55796 5.8823 4.95096C6.3383 4.35696 6.8323 4.03996 7.5723 4.00296C8.6003 3.95296 8.7443 4.54096 9.0973 5.45696C9.3603 6.14196 9.7113 6.84096 9.9073 7.55096C10.2743 8.87596 8.9913 8.93096 8.8293 10.014C8.7293 10.697 9.5563 11.613 9.9303 12.1C10.6512 13.0484 11.5341 13.862 12.5383 14.503C13.1083 14.862 14.0263 15.509 14.6783 15.152C15.6823 14.602 15.5883 12.909 16.9913 13.482C17.7183 13.778 18.4223 14.205 19.1163 14.579C20.1893 15.156 20.1393 15.754 19.7303 16.996C20.0363 16.068 19.4243 17.924 19.7303 16.996Z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className=" w-full text-white text-md flex items-center">
                    {
                      footer.find((text) => text.attributes.name === "phone")
                        .attributes.text
                    }
                  </div>
                </div>

                <div className="mr-5">
                  <div className="w-full h-[1px] bg-white mt-3 mr-20" />
                </div>

                <div className="flex items-center mt-5">
                  <div alt="location" className="w-10 pr-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="mail">
                        <path
                          id="Vector"
                          d="M12 11L20 6.34052C19.6784 6.1218 19.2878 6.00244 18.8858 6H5.11424C4.7122 6.00244 4.32163 6.1218 4 6.34052L12 11Z"
                          fill="#fff"
                        />
                        <path
                          id="Vector_2"
                          d="M12.3471 12.3202L12.2379 12.3698H12.1864C12.1272 12.3953 12.0644 12.412 12 12.4194C11.9466 12.4259 11.8926 12.4259 11.8393 12.4194H11.7879L11.6786 12.3698L3.06429 7C3.02313 7.14977 3.00153 7.30391 3 7.45885V16.1398C3 16.6332 3.20319 17.1063 3.56487 17.4552C3.92654 17.804 4.41708 18 4.92857 18H19.0714C19.5829 18 20.0735 17.804 20.4351 17.4552C20.7968 17.1063 21 16.6332 21 16.1398V7.45885C20.9985 7.30391 20.9769 7.14977 20.9357 7L12.3471 12.3202Z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                  </div>
                  <div
                    className=" w-full text-white text-md flex items-center cursor-pointer"
                    onClick={() => {
                      window.open(`mailto:${
                        footer.find((text) => text.attributes.name === "email")
                          .attributes.text
                      }
                                    }`);
                    }}
                  >
                    {
                      footer.find((text) => text.attributes.name === "email")
                        .attributes.text
                    }
                  </div>
                </div>

                <div className="mr-5">
                  <div className="w-full h-[1px] bg-white mt-3 mr-20" />
                </div>
              </div>
              <div className="text-center text-white font-bold mt-5 text-sm pl-5 md:hidden order-5">
                <div className="w-full items-center flex flex-col">
                  {
                    footer.find(
                      (text) => text.attributes.name === "copyrightStatement"
                    ).attributes.text
                  }
                  <div className="flex gap-3 cursor-pointer underline">
                    <div onClick={() => navigate("terms-of-use")}>
                      Terms of Use
                    </div>
                    <div onClick={() => navigate("/privacy-policy")}>
                      Privacy Policy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;
