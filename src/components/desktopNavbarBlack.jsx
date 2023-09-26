import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import personBlack from "../assets/images/navbar/person_black.svg";
import notifcation from "../assets/images/navbar/notification.svg";
import notificationDot from "../assets/images/navbar/notificationDot.svg";
import Notification from "../pages/Notifications/Notifications_Desktop";
import logoBlack from "../assets/images/black.png";
import luxe from "../assets/images/luxe.svg";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { useEffect } from "react";
import { getNotifications } from "../pages/Notifications/api";

function DesktopNavbar() {
  const navigate = useNavigate();
  const luxeValue =
    //If the url is /luxe or /luxe/properties, set the luxeValue to true
    window.location.pathname === "/luxe" ||
    window.location.pathname === "/luxe/properties"
      ? true
      : false;
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const notificationRef = React.useRef();
  const accountRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
    console.log("Yes");
    if (localStorage.getItem("token") !== null) {
      getNotifications().then((data) => {
        if (data.notifications && data.notifications.length > 0) {
          setNotifications(data.notifications);
        }
      });
    } else {
      setNotifications([]);
    }
        //Watch for clicks outside of the notification menu
        document.addEventListener("click", (e) => {
          if (
            notificationRef.current &&
            !notificationRef.current.contains(e.target)
          ) {
            setNotificationMenuOpen(false);
            console.log("clicked outside");
          }
        });
    
        //watch for clicks outside of the account menu
        document.addEventListener("click", (e) => {
          if (
            accountRef.current &&
            !accountRef.current.contains(e.target)
          ) {
            setAccountMenuOpen(false);
            console.log("clicked outside");
          }
    
        });
    
    return () => {
      setLoaded(false);
      document.removeEventListener("click", (e) => {});
      document.removeEventListener("click", (e) => {});
    };

    
  }, []);

  const handleLuxeChange = () => {
    localStorage.setItem("luxe", !luxeValue);

    //If on /luxe/properties, redirect to /properties
    if (window.location.pathname === "/luxe/properties") {
      navigate("/properties");
    }
    //If on /luxe, redirect to /
    else if (window.location.pathname === "/luxe") {
      navigate("/");
    }
    //If on /properties, redirect to /luxe/properties
    else if (window.location.pathname === "/properties") {
      navigate("/luxe/properties");
    }
    //If on /, redirect to /luxe
    else if (window.location.pathname === "/") {
      navigate("/luxe");
    }
  };

  //when component unmounts, set the loaded state to false

  const handleNotificationMenuClick = () => {
    console.log("clicked");
    accountMenuOpen
      ? setAccountMenuOpen(false)
      : console.log("account menu not open");
    setNotificationMenuOpen(!notificationMenuOpen);
  };

  const handleAccountMenuClick = () => {
    console.log("clicked");
    notificationMenuOpen
      ? setNotificationMenuOpen(false)
      : console.log("notification menu not open");
    setAccountMenuOpen(!accountMenuOpen);
  };

  return (
    <>
      <div className=" w-full bg-white flex justify-between items-center text-black gap-3 px-5 py-2">
        <div className="flex h-12 w-48">
          <img
            src={logoBlack}
            alt="logo"
            className={`h-12 
            ${
              loaded
                ? "flex transition duration-100 opacity-100 linear"
                : "opacity-0"
            }
            `}
          ></img>
        </div>
        <div className="flex h-12  gap-10">
          {localStorage.getItem("userType") === "admin" ? (
            <NavLink
              to="/admin"
              exact
              className={`flex justify-between p-2 uppercase ${
                location.pathname === "/admin"                 ? "line line-underline-active-black font-bold" : "line line-underline-black"

              }`}
            >
              Admin
            </NavLink>
          ) : null}
          <NavLink
            to={`${luxeValue === true? "/luxe" : "/"}`}
            exact
            className={`flex justify-between p-2 uppercase ${
              location.pathname === "/" || location.pathname === "/luxe"
              ? "line line-underline-active-black font-bold" : "line line-underline-black"
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to={`${
              luxeValue === true ? "/luxe/properties" : "/properties"
            }`}
            className={`flex justify-between p-2 uppercase ${
              location.pathname === "/properties" ||
              location.pathname === "/luxe/properties"
              ? "line line-underline-active-black font-bold" : "line line-underline-black"
            }`}
          >
            Properties
          </NavLink>
          <NavLink
            to="/homeowners"
            className={`flex justify-between p-2 uppercase ${
              location.pathname === "/homeowners" ? "line line-underline-active-black font-bold" : "line line-underline-black"
            }`}
          >
            Homeowners
          </NavLink>
          <NavLink
            to="/about"
            className={`flex justify-between p-2 uppercase ${
              location.pathname === "/about" ? "line line-underline-active-black font-bold" : "line line-underline-black"
            }`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={`flex justify-between p-2 uppercase ${
              location.pathname === "/contact" ? "line line-underline-active-black font-bold" : "line line-underline-black"
            }`}
          >
            Contact Us
          </NavLink>
        </div>
        {localStorage.getItem("token") ? (
          <div className="flex gap-1 h-full items-center">
            {
              //If there are notifications, show the notification icon
              notifications !== null && notifications.length > 0 ? (
                <img
                  ref={notificationRef}
                  src={notificationDot}
                  alt="notification"
                  className="h-8"
                  onClick={handleNotificationMenuClick}
                />
              ) : (
                <img
                  ref={notificationRef}
                  src={notifcation}
                  alt="notification"
                  className="h-8"
                  onClick={handleNotificationMenuClick}
                />
              )
            }

            <img
              ref={accountRef}
              src={personBlack}
              alt="hamburger menu"
              className="h-8"
              onClick={handleAccountMenuClick}
            />
            {
              //If url contains /, or /luxe or /properties then show this
              window.location.pathname === "/" ||
              window.location.pathname === "/luxe" ||
              window.location.pathname === "/properties" ||
              window.location.pathname === "/luxe/properties" ? (
                <div className="mx-4 flex items-center w-20">
                  <Switch
                    //COlor on checked
                    width={80}
                    onColor="#fff"
                    offColor="#fff"
                    offHandleColor="#c79744"
                    onHandleColor="#c79744"
                    className="border"
                    uncheckedIcon={
                      <div className="w-full h-full flex items-center pr-1">
                        <img src={luxe} alt="My City Logo"></img>
                      </div>
                    }
                    checkedIcon={
                      <div className="w-full h-full flex items-center pl-2">
                        <div className="font-custom-kiona text-[9px] text-black">
                          Regular
                        </div>
                      </div>
                    }
                    checked={luxeValue === true ? true : false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    onChange={() => {
                      handleLuxeChange();
                    }}
                  ></Switch>
                </div>
              ) : null
            }
          </div>
        ) : (
          <div className="flex gap-5 h-full items-center w-48">
                        <div className="pr-4 flex items-center">
              {
                //If url contains /, or /luxe or /properties then show this
                window.location.pathname === "/" ||
                window.location.pathname === "/luxe" ||
                window.location.pathname === "/properties" ||
                window.location.pathname === "/luxe/properties" ? (
                  <div className="px-4 flex items-center w-20">
                    <Switch
                      //COlor on checked
                      width={80}
                      onColor="#fff"
                      offColor="#fff"
                      offHandleColor="#c79744"
                      onHandleColor="#c79744"
                      className="border"
                      uncheckedIcon={
                        <div className="w-full h-full flex items-center pr-1">
                          <img src={luxe} alt="My City Logo"></img>
                        </div>
                      }
                      checkedIcon={
                        <div className="w-full h-full flex items-center pl-2">
                          <div className="font-custom-kiona text-[9px] text-black">
                            Regular
                          </div>
                        </div>
                      }
                      checked={luxeValue === true ? true : false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      onChange={() => {
                        handleLuxeChange();
                      }}
                    ></Switch>
                  </div>
                ) : null
              }
            </div>
            <button className={`bg-primary text-white font-custom-kiona px-4 py-2 rounded-lg  ${
              //If the url is /login, make the login button bold
              location.pathname === "/login" ? "hidden" : "flex"
            }`}>
              <NavLink
                to="/login"
                exact
                className={`flex justify-between  ${
                  location.pathname === "/login" ? "underline font-bold" : ""
                }`}
              >
                Login
              </NavLink>
            </button>
          </div>
        )}
      </div>

      {notificationMenuOpen && (
        <div className="w-full translate-y-3 bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl">
          <div className="relative top-0 right-0 w-72 h-96 overflow-y-scroll flex flex-col bg-white rounded-xl no-scrollbar">
            <Notification notifications={notifications} refresh={(id)=>{
               const newNotifications = notifications.filter((notification) => notification._id !== id)
               setNotifications(newNotifications)
            }}></Notification>
          </div>
        </div>
      )}

      {accountMenuOpen && (
        <div className="w-full bg-transparent translate-y-2 flex justify-end p-3 font-bold relative"
        >
          <ul className="absolute top-0 right-2 w-48 flex flex-col bg-white rounded-xl drop-shadow-2xl">
            <li className="flex flex-col ">
              <NavLink
                to="/messages"
                exact
                className={`flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2 rounded-t-xl  ${
                  location.pathname === "/messages" ? "underline font-bold" : ""
                }`}
              >
                Messages
              </NavLink>
            </li>

            <div className="h-full mx-2">
              <hr className="w-full h-[1px]"></hr>
            </div>

            <div className="flex flex-col ">
              <li className="flex flex-col">
                <NavLink
                  to="/account"
                  exact
                  className={`flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2  ${
                    location.pathname === "/account"
                      ? "underline font-bold"
                      : ""
                  }`}
                >
                  Account
                </NavLink>
              </li>
              <li className="flex flex-col">
                <NavLink
                  to="/wishlist"
                  exact
                  className={`flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2  ${
                    location.pathname === "/wishlist"
                      ? "underline font-bold"
                      : ""
                  }`}
                >
                  Wishlist
                </NavLink>
              </li>
              <li className="flex flex-col">
                <NavLink
                  to="/trips"
                  exact
                  className={`flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2 ${
                    location.pathname === "/trips" ? "underline font-bold" : ""
                  }`}
                >
                  Trips
                </NavLink>
              </li>
            </div>

            <div className="h-full mx-2">
              <hr className="w-full h-[1px]"></hr>
            </div>

            <div className="flex flex-col">
              <li className="flex flex-col">
                <NavLink
                  to="/help"
                  exact
                  className={`flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2  ${
                    location.pathname === "/help" ? "underline font-bold" : ""
                  }`}
                >
                  Help
                </NavLink>
              </li>
              <li className="flex flex-col">
                <div
                  className="flex justify-start w-full font-custom-kiona text-primary hover:bg-neutral-100 px-4 py-2 rounded-b-xl cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userType");
                    navigate("/login");
                  }}
                >
                  Log Out
                </div>
              </li>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default DesktopNavbar;
