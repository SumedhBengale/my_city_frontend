import { React, useState } from "react";
import black_logo from "../../../assets/images/black_logo.png";
import location_black from "../../../assets/images/home/location_black.svg";
import phone_black from "../../../assets/images/home/phone_black.svg";
import email_black from "../../../assets/images/home/email_black.svg";
import twitter from "../../../assets/images/home/twitter.svg";
import facebook from "../../../assets/images/home/facebook.svg";
import instagram from "../../../assets/images/home/instagram.svg";
import linkedin from "../../../assets/images/home/linkedin.svg";

function Footer() {
  const [currencySwitcherVisible, setCurrencySwitcherVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("Property Currency");

  const currencies = {
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    EUR: "Euro",
    USD: "US Dollar",
    SGD: "Singapore Dollar",
    GBP: "Pound Sterling",
    INR: "Indian Rupee",
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setCurrencySwitcherVisible(false);
  };

  return (
    <>
      {/* {currencySwitcherVisible && (
        <div className='fixed bottom-0 h-screen w-screen backdrop-blur-lg bg-black/40 flex justify-center items-end md:items-center z-50'>
            <div className=' w-full md:w-1/2 bg-white rounded-2xl p-5'>
            <div className='flex justify-between mb-5'>
              <div className='font-bold' onClick={()=>setCurrencySwitcherVisible(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border border-black rounded-md text-black" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
        <div className='w-full text-center font-bold font-custom text-xl mb-1'>Currency Switcher</div>
        </div>
            <div className=''>
                <div className='font-bold px-4 py-2 bg-gray-100 mb-2'>Suggested Currencies</div>
                {
                    Object.keys(currencies).map((currency) => (
                        !['GBP', 'INR'].includes(currency) && (
                            <div key={currency} className={`px-4 py-2 cursor-pointer ${selectedCurrency === currency ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect(currency)}>
                            {currency + ' - ' + currencies[currency]}
                            </div>
                        )
                    ))
                }
            </div>
            <div className=''>
                <div className='font-bold px-4 py-2 bg-gray-100 mb-2'>All Currencies</div>
                {
                    Object.keys(currencies).map((currency) => (
                        ['GBP', 'INR'].includes(currency) && (
                        <div key={currency} className={`px-4 py-2 cursor-pointer ${selectedCurrency === currency ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect(currency)}>
                            {currency + ' - ' + currencies[currency]}
                        </div>
                        )
                    ))
                }
                <div className={`px-4 py-2 cursor-pointer ${selectedCurrency === 'Property Currency' ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect('Property Currency')}>
                    Property Currency
                </div>
            </div>
            </div>
        </div>
      )} */}
      <div className="Rectangle w-full bg-zinc-100 py-10">
        <div className="mx-0 2xl:container 2xl:mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:mx-5">
            {/* <div className='pt-10 pl-5'>
                <div className='font-custom-bold text-xl' onClick={()=> setCurrencySwitcherVisible(!currencySwitcherVisible)}>Currency Switcher</div>
            </div> */}
            <div className="pt-10 sm:pl-5 md:w-1/2 h-full md:flex md:justify-center flex-col">
              <div className="flex justify-center mb-5">
                <img
                  src={black_logo}
                  alt="logo"
                  className="h-28 max-w-[300px] pt-5 sm:pl-5"
                ></img>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <div className="w-8 h-8 rounded-full border-[2px] border-black">
                  <img
                    src={twitter}
                    alt="twitter"
                    className="w-5 h-5 ml-1 mt-1"
                  ></img>
                </div>

                <div className="w-8 h-8 rounded-full border-[2px] border-black">
                  <img
                    src={facebook}
                    alt="twitter"
                    className="w-5 h-5 ml-1 mt-1"
                  ></img>
                </div>

                <div className="w-8 h-8 rounded-full border-[2px] border-black">
                  <img
                    src={instagram}
                    alt="twitter"
                    className="w-5 h-5 ml-1 mt-1"
                  ></img>
                </div>

                <div className="w-8 h-8 rounded-full border-[2px] border-black">
                  <img
                    src={linkedin}
                    alt="twitter"
                    className="w-5 h-5 ml-1 mt-1"
                  ></img>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="pt-10 pl-5">
                  <div className="font-custom-bold text-xl pl-3">Explore</div>
                  <div className="text-black text-md pt-3 pl-3">Home</div>
                  <div className="text-black text-md pt-3 pl-3">Properties</div>
                  <div className="text-black text-md pt-3 pl-3">
                    Rental Estimate
                  </div>
                </div>

                <div className="pt-10 pl-5">
                  <div className="font-custom-bold text-xl pl-3">Company</div>
                  <div className="text-black text-md pt-3 pl-3">About Us</div>
                  <div className="text-black text-md pt-3 pl-3">Blogs</div>
                  <div className="text-black text-md pt-3 pl-3">Management</div>
                </div>

                <div className="pt-10 pl-5">
                  <div className="font-custom-bold text-xl w-full">
                    Contact Us
                  </div>
                  <div className=" flex items-center mt-5">
                    <img
                      src={location_black}
                      alt="location"
                      className="w-10 pr-3"
                    ></img>
                    <div className=" w-full text-black text-md flex items-center">
                      Po Box 1046, Stockton On Tees, TS19 1XL
                    </div>
                  </div>

                  <div className="mr-5">
                    <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                  </div>

                  <div className="flex items-center mt-5">
                    <img
                      src={phone_black}
                      alt="location"
                      className="w-10 pr-3"
                    ></img>
                    <div className=" w-full text-black text-md flex items-center">
                      800 987 6543
                    </div>
                  </div>

                  <div className="mr-5">
                    <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                  </div>

                  <div className="flex items-center mt-5">
                    <img
                      src={email_black}
                      alt="location"
                      className="w-10 pr-3"
                    ></img>
                    <div className=" w-full text-black text-md flex items-center">
                      info@boostly.co.uk
                    </div>
                  </div>

                  <div className="mr-5">
                    <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-5 text-sm pl-5">
                My City Residence ©2023. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
