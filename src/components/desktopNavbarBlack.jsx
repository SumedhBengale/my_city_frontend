import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import personBlack from "../assets/images/navbar/person_black.svg";
import notification from "../assets/images/navbar/notification.svg";
import Notification from "../pages/Notifications/Notifications_Desktop";
import logoBlack from "../assets/images/black_logo.png";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

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
  const location = useLocation();

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
      <div className=" w-full bg-white flex justify-between text-black gap-3 px-5 py-2">
        <div className="flex h-12">
          <img
            src={logoBlack}
            alt="My City Logo"
            className="h-12 self-start"
          ></img>
        </div>
        <div className="flex h-12  gap-10">
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
            to={`${localStorage.getItem("luxe") ? "/luxe" : "/login"}`}
            exact
            className={`flex justify-between p-2 ${
              location.pathname === "/" ? "underline font-bold" : ""
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to={`${
              localStorage.getItem("luxe") ? "/luxe/properties" : "/properties"
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
            <img
              src={notification}
              alt="notification menu"
              onClick={handleNotificationMenuClick}
              className="px-2 color-white h-7"
            />

            <img
              src={personBlack}
              alt="hamburger menu"
              className="h-8"
              onClick={handleAccountMenuClick}
            />
            <div className="pl-4 flex items-center">
              <Switch
                checked={luxeValue === true ? true : false}
                onChange={() => {
                  handleLuxeChange();
                }}
              ></Switch>
            </div>
          </div>
        ) : (
          <div className="flex gap-1 h-full items-center">
            <button className="bg-primary text-white font-bold px-4 py-2 rounded-lg">
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
              <Switch
                checked={luxeValue === true ? true : false}
                onChange={() => {
                  handleLuxeChange();
                }}
              ></Switch>
            </div>
          </div>
        )}
      </div>

      {notificationMenuOpen && (
        <div className="w-full translate-y-3 bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl">
          <div className="relative top-0 right-0 w-96 h-96 overflow-y-scroll flex flex-col bg-white rounded-xl">
            <Notification></Notification>
          </div>
        </div>
      )}

      {accountMenuOpen && (
        <div className="w-full bg-transparent flex justify-end p-3 font-bold drop-shadow-2xl relative">
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
