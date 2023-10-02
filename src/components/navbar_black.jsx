import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import hamburgerMenuBlack from "../assets/images/navbar/hamburger_menu_black.svg";
import logoBlack from "../assets/images/black_logo.png";
import personBlack from "../assets/images/navbar/person_black.svg";
import notification from "../assets/images/navbar/notification.svg";
import { useNavigate } from "react-router-dom";
import luxe from "../assets/images/luxe.svg";
import Switch from "react-switch";

function Navbar() {
  const navigate = useNavigate();
  const luxeValue =
    window.location.pathname === "/luxe" 
      ? true
      : false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();

  const handleLuxeChange = () => {
    localStorage.setItem("luxe", !luxeValue);

    //If on /luxe, redirect to /
    if (window.location.pathname === "/luxe") {
      navigate("/");
    }
    //If on /, redirect to /luxe
    else if (window.location.pathname === "/") {
      navigate("/luxe");
    }
  };

  const handleMenuClick = () => {
    if (accountMenuOpen === true) {
      setAccountMenuOpen(false);
    }
    console.log("Yes");
    setMenuOpen(!menuOpen);
  };

  const handleAccountMenuClick = () => {
    if (menuOpen === true) {
      setMenuOpen(false);
    }
    console.log("clicked");
    setAccountMenuOpen(!accountMenuOpen);
  };

  return (
    <>
      <div className={`flex justify-between p-3 bg-white font-custom-kiona`}>
        <img
          src={hamburgerMenuBlack}
          alt="hamburger menu"
          onClick={handleMenuClick}
        />

        <div className="flex items-center justify-center w-full">
          <img src={logoBlack} alt="logo" className="h-12" />
        </div>

        <img
          src={personBlack}
          alt="hamburger menu"
          onClick={handleAccountMenuClick}
        />
      </div>

      {accountMenuOpen && (
        <div className="absolute top-0 flex flex-col w-full bg-white drop-shadow-2xl font-custom-kiona">
          <div className="flex w-full justify-between p-3 relative">
          {
              //If url contains /, or /luxe or /properties then show this
              window.location.pathname === "/" ? (
                <button className="bg-primary hover:scale-105 transition duration-75 h-10 text-black font-custom-kiona px-4 w-20 py-1 rounded-lg self-center"
                  onClick={() => {
                    handleLuxeChange();
                  }}
                >
                  <img src={luxe} alt="My City Logo" className=""></img>
                </button>
              ) : null
            }
            {
              //If url contains /, or /luxe or /properties then show this
              window.location.pathname === "/luxe" ? (
                <button className="bg-primary hover:scale-105 transition duration-75 h-10 text-black font-custom-kiona px-4 w-20 py-1 rounded-lg self-center"
                  onClick={() => {
                    handleLuxeChange();
                  }}
                >
                  <div className="font-custom-kiona text-[9px] text-white">Regular</div>
                </button>
              ) : null
            }

            <div className="flex items-center justify-center w-full">
              <img src={logoBlack} alt="logo" className="h-12" />
            </div>
            
            <img
              src={notification}
              alt="notification menu"
              onClick={() => {
                //Navigate to notifications page
                navigate("/notifications");
              }}
              className="px-2"
            />

            <img
              src={personBlack}
              alt="hamburger menu"
              onClick={handleAccountMenuClick}
            />
            
          </div>

          {!localStorage.getItem("token") ? (
            <NavLink
              to="/login"
              exact
              className={`flex justify-end w-full pb-1 px-3  ${
                location.pathname === "/notifications"
                  ? "underline font-bold"
                  : ""
              }`}
            >
              Login
            </NavLink>
          ) : null}
          <div className="h-full mx-2 mb-3">
            <hr className="w-full h-[2px] bg-black"></hr>
          </div>

          <div className=" gap-3 pr-3">
            <NavLink
              to="/notifications"
              exact
              className={`flex justify-end w-full pb-1  ${
                location.pathname === "/notifications"
                  ? "underline font-bold"
                  : ""
              }`}
            >
              Notifications
            </NavLink>
            <NavLink
              to="/messages"
              exact
              className={`flex justify-end w-full  ${
                location.pathname === "/messages" ? "underline font-bold" : ""
              }`}
            >
              Messages
            </NavLink>
          </div>

          <div className="h-full mx-2 my-3">
            <hr className="w-full h-[2px] bg-black"></hr>
          </div>

          <div className=" pr-3">
            <NavLink
              to="/account"
              exact
              className={`flex justify-end w-full pb-1  ${
                location.pathname === "/account" ? "underline font-bold" : ""
              }`}
            >
              Account
            </NavLink>
            <NavLink
              to="/wishlist"
              exact
              className={`flex justify-end w-full pb-1 ${
                location.pathname === "/wishlist" ? "underline font-bold" : ""
              }`}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/trips"
              exact
              className={`flex justify-end w-full ${
                location.pathname === "/trips" ? "underline font-bold" : ""
              }`}
            >
              Trips
            </NavLink>
          </div>

          <div className="h-full mx-2 my-3">
            <hr className="w-full h-[2px] bg-black"></hr>
          </div>

          <div className=" pr-3 pb-3">
            <NavLink
              to="/help"
              exact
              className={`flex justify-end w-full pb-1 ${
                location.pathname === "/help" ? "underline font-bold" : ""
              }`}
            >
              Help
            </NavLink>
            {localStorage.getItem("token") && (
              <div
                className={`flex justify-end w-full pb-1`}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userType");
                  navigate("/login");
                }}
              >
                Log Out
              </div>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="font-custom-kiona">
          {menuOpen && (
            <div className=" w-full bg-white flex flex-col">
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
                to={`${luxeValue === true ? "/luxe" : "/"}`}
                exact
                className={`flex justify-between p-2 ${
                  location.pathname === "/" ? "underline font-bold" : ""
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to={`${
                  "/properties"
                }`}
                className={`flex justify-between p-2 ${
                  location.pathname === "/properties"
                    ? "underline font-bold"
                    : ""
                }`}
              >
                Properties
              </NavLink>
              <NavLink
                to="/homeowners"
                className={`flex justify-between p-2 ${
                  location.pathname === "/homeowners"
                    ? "underline font-bold"
                    : ""
                }`}
              >
                Homeowners
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
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
