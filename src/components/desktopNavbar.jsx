import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import person from "../assets/images/navbar/person.svg";
import notificationWhite from "../assets/images/navbar/notification_white.svg";
import notificationWhiteDot from "../assets/images/navbar/notification_whiteDot.svg";
import { useNavigate } from "react-router-dom";
import Notification from "../pages/Notifications/Notifications_Desktop";
import logoWhite from "../assets/images/logo.png";
import Switch from "react-switch";
import { useEffect } from "react";
import { getNotifications } from "../pages/Notifications/api";
import luxe from "../assets/images/luxe.svg";

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

  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      console.log('token', localStorage.getItem('token'))
    getNotifications().then((data) => {
      if (data.notifications && data.notifications.length > 0) {
        setNotifications(data.notifications);
      }
    });
  }else{
    setNotifications([])
  }
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
      <div className=" w-full bg-transparent flex justify-between text-white gap-3 px-5 py-2">
        <div className="flex h-12">
          <img
            src={logoWhite}
            alt="My City Logo"
            className="h-12 self-start"
          ></img>
        </div>
        <div className="flex h-12 justify-start items-center gap-10">
          {localStorage.getItem("userType") === "admin" ? (
            <NavLink
              to="/admin"
              exact
              className={`flex justify-between p-2 ${
                location.pathname === "/admin" ? "underline font-bold" : ""
              }`}
            >
              Admin
            </NavLink>
          ) : null}
          <NavLink
            to={`${localStorage.getItem("luxe") === "true" ? "/luxe" : "/"}`}
            exact
            className={`flex justify-between p-2 ${
              location.pathname === "/" ? "underline font-bold" : ""
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to={`${
              localStorage.getItem("luxe") === "true"
                ? "/luxe/properties"
                : "/properties"
            }`}
            className={`flex justify-between p-2 ${
              location.pathname === "/properties" ? "underline font-bold" : ""
            }`}
          >
            Properties
          </NavLink>
          <NavLink
            to="/management"
            className={`flex justify-between p-2 ${
              location.pathname === "/management" ? "underline font-bold" : ""
            }`}
          >
            Management
          </NavLink>
          <NavLink
            to="/about"
            className={`flex justify-between p-2 ${
              location.pathname === "/about" ? "underline font-bold" : ""
            }`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={`flex justify-between p-2 ${
              location.pathname === "/contact" ? "underline font-bold" : ""
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
                  src={notificationWhiteDot}
                  alt="notification"
                  className="h-8"
                  onClick={handleNotificationMenuClick}
                />
              ) : (
                <img
                  src={notificationWhite}
                  alt="notification"
                  className="h-8"
                  onClick={handleNotificationMenuClick}
                />
              )
            }

            <img
              src={person}
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
                <div className="pl-4 flex items-center w-20">
                  <Switch
                    //COlor on checked
                    width={80}
                    onColor="#fff"
                    offColor="#fff"
                    offHandleColor="#F9A826"
                    onHandleColor="#F9A826"
                    className="border"
                    uncheckedIcon={
                      <div className="w-full h-full flex items-center pr-1">
                        <img src={luxe} alt="My City Logo"></img>
                      </div>
                    }
                    checkedIcon={
                      <div className="w-full h-full flex items-center pl-2">
                        <div className="font-custom text-xs text-black">
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
          <div className="flex gap-1 h-full items-center">
            <button className="bg-white text-black font-bold px-4 py-2 rounded-lg">
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
            <div className="pl-4 flex items-center">
              {
                //If url contains /, or /luxe or /properties then show this
                window.location.pathname === "/" ||
                window.location.pathname === "/luxe" ||
                window.location.pathname === "/properties" ||
                window.location.pathname === "/luxe/properties" ? (
                  <div className="pl-4 flex items-center w-20">
                    <Switch
                      //COlor on checked
                      width={80}
                      onColor="#fff"
                      offColor="#fff"
                      offHandleColor="#F9A826"
                      onHandleColor="#F9A826"
                      className="border"
                      uncheckedIcon={
                        <div className="w-full h-full flex items-center pr-1">
                          <img src={luxe} alt="My City Logo"></img>
                        </div>
                      }
                      checkedIcon={
                        <div className="w-full h-full flex items-center pl-2">
                          <div className="font-custom text-xs text-black">
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
          </div>
        )}
      </div>

      {notificationMenuOpen && (
        <div className="w-full translate-y-3 bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl relative">
          <div className="absolute top-0 right-5 w-72 h-96 overflow-y-scroll flex flex-col bg-white rounded-xl no-scrollbar">
            <Notification notifications={notifications}></Notification>
          </div>
        </div>
      )}

      {accountMenuOpen && (
        <div className="w-full bg-transparent flex justify-end p-3 font-bold relative">
          <div className="absolute top-0 right-2 w-48 flex flex-col bg-white rounded-xl">
            <div className="flex flex-col gap-3 pl-3 pt-3">
              <NavLink
                to="/messages"
                exact
                className={`flex justify-start w-full  ${
                  location.pathname === "/messages" ? "underline font-bold" : ""
                }`}
              >
                Messages
              </NavLink>
            </div>

            <div className="h-full mx-2 my-3">
              <hr className="w-full h-[2px] bg-black"></hr>
            </div>

            <div className="flex flex-col gap-3 pl-3">
              <NavLink
                to="/account"
                exact
                className={`flex justify-start w-full  ${
                  location.pathname === "/account" ? "underline font-bold" : ""
                }`}
              >
                Account
              </NavLink>
              <NavLink
                to="/wishlist"
                exact
                className={`flex justify-start w-full  ${
                  location.pathname === "/wishlist" ? "underline font-bold" : ""
                }`}
              >
                Wishlist
              </NavLink>
              <NavLink
                to="/trips"
                exact
                className={`flex justify-start w-full  ${
                  location.pathname === "/trips" ? "underline font-bold" : ""
                }`}
              >
                Trips
              </NavLink>
            </div>

            <div className="h-full mx-2 my-3">
              <hr className="w-full h-[2px] bg-black"></hr>
            </div>

            <div className="flex flex-col gap-3 pl-3 pb-3">
              <NavLink
                to="/help"
                exact
                className={`flex justify-start w-full  ${
                  location.pathname === "/help" ? "underline font-bold" : ""
                }`}
              >
                Help
              </NavLink>
              <div
                className={`flex justify-start w-full`}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userType");
                  navigate("/login");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DesktopNavbar;
