import { React, useState, useEffect, useRef } from "react";
import Navbar from "../../../components/navbar";
import NavbarBlack from "../../../components/navbar_black";
import DesktopNavbar from "../../../components/desktopNavbar";
import DesktopNavbarBlack from "../../../components/desktopNavbarBlack";
import PropertiesBackground from "../../../assets/images/properties/properties_top_image.jpg";
import SearchCard from "../../../components/searchCard";
import filterBlack from "../../../assets/images/properties/filter_black.svg";
import PropertyCard from "../../Luxe/HomePage/PropertyCard";
import Footer from "../../HomePage/Footer";
import luxeLogo from "../../../assets/images/luxeLogo.png";
import FadeInSection from "../../../components/fadeIn/fadeInSection";
import SortDropdown from "./sortDropdown";
import Filter from "../../../components/filter";
import { useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import {
  getDynamicText,
  getLuxeResidences,
  getResidences,
  getVideos,
} from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config/config";

function PropertiesPage() {
  const navigate = useNavigate();
  const search = (params) => {
    console.log(params);
    //if params.startDate is greater than params.endDate, show toast
    if (params.startDate > params.endDate) {
      toast.error("Cannot Check-in after Check-out");
      return;
    }
    localStorage.setItem("checkInDate", params.startDate? params.startDate : null);
    localStorage.setItem("checkOutDate", params.endDate? params.endDate : null);
    localStorage.setItem("guestCount", params.guests);
    navigate("/luxe/properties", { state: { filterData: params, limit: 100, luxe: params.luxe === true ? true : false  } });
  };

  const [blackNavbar, setBlackNavbar] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [residences, setResidences] = useState(null);
  const nearbyPropertiesRef = useRef(null);
  const [fetchedPropertiesFilter, setFetchedPropertiesFilter] = useState(false);
  const [fetchedFilterData, setFetchedFilterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicText, setDynamicText] = useState(null);
  const [videos, setVideos] = useState(null);
  const [searchHidden, setSearchHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    getVideos().then((res) => {
      console.log(res);
      setVideos(res.data);
    });
    getDynamicText().then((res) => {
      console.log(res);
      setDynamicText(res.data);
    });
    getLuxeResidences(
      location.state
        ? {
            filterData: location.state.filterData,
            limit: location.state.limit ? location.state.limit : 100,
          }
        : {}
    )
      .then((res) => {
        console.log(res);
        setResidences(res.residences.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
      const handleScroll = () => {
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        // console.log(scrollPosition, screenHeight * 70 / 100)
        //If scroll position is greater than 1% of screen height, hide this element
        if(scrollPosition > 20) {
          setSearchHidden(true);
        }else{
          setSearchHidden(false);
  
        }
        if (scrollPosition >= (screenHeight*80)/100) {
          setBlackNavbar(true);
        } else {
          setBlackNavbar(false);
        }
      };

    window.addEventListener("scroll", handleScroll);
    //Scroll to the ref 'nearbyPropertiesRef' when the page loads
    if (nearbyPropertiesRef.current) {
      console.log("scrolling");
      setTimeout(
        () =>
          window.scrollTo({
            top: nearbyPropertiesRef.current.offsetTop - 150,
            behavior: "smooth",
          }),
        100
      );
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.state]);
  return (
    <div className="relative">
        {filterVisible && (
          <div className="h-screen w-screen absolute">
            <Filter
              apply={(data) => {
                setFilterVisible(false);
                console.log("filter applied");
                console.log(data);
              }}
              close={() => setFilterVisible(false)}
            ></Filter>
          </div>
        )}
        {fetchedPropertiesFilter && (
          <Filter
            apply={(data) => {
              setLoading(true);
              setFetchedPropertiesFilter(false);
              console.log("filter applied");
              setFetchedFilterData(data);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
            close={() => setFetchedPropertiesFilter(false)}
          ></Filter>
        )}
    <div className="fixed top-0 z-40">
    <div className="hidden md:block z-40 fixed w-full">
            {blackNavbar ? <DesktopNavbarBlack /> : <DesktopNavbar />}
          </div>
          <div className="md:hidden z-40 fixed w-full">
            {blackNavbar ? <NavbarBlack /> : <Navbar />}
          </div>
    </div>
  <div
        style={{
          width: '100%',
          height: '90vh',
        }}
        className="z-0 fixed top-0 left-0"
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
                      (video) => video.attributes.name === "HomePage_Video"
                    ).attributes.video.data.attributes.url
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        <div className="absolute h-full w-full bg-black/40"></div>
        </div>
      </div>
      <div className={`w-full flex fixed top-0 justify-center items-center z-30 transition-all 
      ${
        searchHidden ? setTimeout(() => {return "hidden"}, 200) : "block"
      }
        ${searchHidden ? "-translate-y-96 scale-0 duration-200 ease-out" : "translate-y-0 scale-100 duration-500 ease-in"}
      `} style={{
        height: '100vh'
      }}>
                <div className={`h-full w-full relative`}>
          <div className={`h-full flex flex-col items-center pt-16 sm:pt-20 2xl:pt-40`}>
            <div className="lg:hidden z-10">
              <div className="font-custom-bold text-xl lg:text-3xl text-white text-center pt-10 pb-4">
                {dynamicText !== null &&
                  dynamicText.find(
                    (text) => text.attributes.name === "Website_Name"
                  ).attributes.text}
              </div>
            </div>

            <div className="hidden lg:block justify-center items-center z-10">
              <img
                src={luxeLogo}
                alt="My City Logo"
                className="h-24 2xl:h-36 self-start mb-5 2xl:mb-10"
              ></img>
            </div>
            <div className=" text-md md:text-2xl w-full text-center font-bold font-custom-adam text-white capitalize sm-3 2xl:mb-10 z-10">
              {dynamicText !== null && 
                <div>
                  <TypeAnimation
                    cursor={false}
                    sequence={[
                      dynamicText.find(
                        (text) => text.attributes.name === "Website_Tagline"
                      ).attributes.text,
                    ]}
                    wrapper="div"
                    className="text-md md:text-2xl w-full text-center font-custom-bold text-white capitalize sm-3 lg:mb-10 z-10"
                  />
                </div>
              }
            </div>

            <div className="z-50">
            <SearchCard initialData={location.state ? location.state.filterData : null} search={(params) => search(params)}></SearchCard>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white translate-y-0 rounded-tl-[50px] md:rounded-tl-[100px]" style={{
        marginTop: '70vh'
      }}
        ref={nearbyPropertiesRef}
        >
          <div className="px-5 md:container md:mx-auto">
            <FadeInSection>
              {residences && !loading ? (
                <PropertiesSection
                  setResidences={setResidences}
                  setFilterVisible={setFetchedPropertiesFilter}
                  filterData={fetchedFilterData}
                  residences={residences}
                  limit={
                    location.state && location.state.limit
                      ? location.state.limit
                      : 100
                  }
                ></PropertiesSection>
              ) : (
                <div className="flex justify-center items-center h-screen w-full">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
            </FadeInSection>
          </div>
        {/* <FadeInSection> */}
        <Footer></Footer>
      </div>

        {/* </FadeInSection> */}
    </div>
  );
}

export default PropertiesPage;

function PropertiesSection({
  setResidences,
  setFilterVisible,
  residences,
  filterData,
  limit,
}) {
  const [sortValue, setSortValue] = useState("p-hl");
  const [sortedResidences, setSortedResidences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleLimit, setVisibleLimit] = useState(20);

  useEffect(() => {
    if (residences) {
      let tempResidences = residences;
      if (filterData) {
        //Filter the residences
        console.log("filtering");
        tempResidences = residences.filter((residence) => {
          //Filter by price
          if (
            filterData.priceRange &&
            filterData.priceRange[0] <= residence.prices.basePrice &&
            filterData.priceRange[1] >= residence.prices.basePrice
          ) {
            return true;
          }
        });
        //Residence must contain all selected amenities
        if (filterData.amenities) {
          tempResidences = tempResidences.filter((residence) => {
            let containsAll = true;
            filterData.amenities.forEach((amenity) => {
              if (!residence.amenities.includes(amenity)) {
                containsAll = false;
                console.log(residence.title, "Does not include", amenity);
              }
            });
            return containsAll;
          });
        }
        //Filter out the guests, if any is selected then don't filter anything, else filter out the residences that don't have the capacity
        if (filterData.guests) {
          tempResidences = tempResidences.filter((residence) => {
            if (filterData.guests === "any") {
              return true;
            }
            if (filterData.guests === "5+") {
              return residence.accommodates >= 5;
            }
            return residence.accommodates >= filterData.guests;
          });
        }
        //Filter out the bedrooms, if any is selected then don't filter anything, else filter out the residences that don't have the capacity
        if (filterData.bedrooms) {
          tempResidences = tempResidences.filter((residence) => {
            if (filterData.bedrooms === "any") {
              return true;
            }
            if (filterData.bedrooms === "5+") {
              return residence.bedrooms >= 5;
            }
            return residence.bedrooms >= filterData.bedrooms;
          });
        }
        //Filter out the bathrooms, if any is selected then don't filter anything, else filter out the residences that don't have the capacity
        if (filterData.bathrooms) {
          tempResidences = tempResidences.filter((residence) => {
            if (filterData.bathrooms === "any") {
              return true;
            }
            if (filterData.bathrooms === "5+") {
              return residence.bathrooms >= 5;
            }
            return residence.bathrooms >= filterData.bathrooms;
          });
        }
      }
      console.log("sorting");
      if (sortValue === "p-lh") {
        //Sort by price low to high
        setSortedResidences(
          tempResidences.sort((a, b) => a.prices.basePrice - b.prices.basePrice)
        );
      } else if (sortValue === "p-hl") {
        //Sort by price high to low
        setSortedResidences(
          tempResidences.sort((a, b) => b.prices.basePrice - a.prices.basePrice)
        );
      } else if (sortValue === "r-hl") {
        //Sort by rating high to low
        setSortedResidences(
          tempResidences.sort((a, b) => b.reviews.avg - a.reviews.avg)
        );
      }
      setLoading(false);
    }
  }, [sortValue, residences, filterData]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between pt-10">
        <div className="flex justify-center items-start pt-2">
          <div className="text-primary font-custom-kiona text-2xl md:text-4xl capitalize">
            Available Residences
          </div>
        </div>
        <div className="flex flex-col items-end justify-end mt-3 mb-5 gap-5">
          <div
            className="h-8 w-8 md:h-10 md:w-10 bg-gray-200 rounded-md flex justify-center items-center p-1 cursor-pointer"
            onClick={() => setFilterVisible(true)}
          >
            <img src={filterBlack} alt="filter" className="h-3/4 w-3/4" />
          </div>
          <div className="flex z-10 items-center">
            <div className="flex self-center">Sort by:</div>
            <SortDropdown
              setSortValue={(value) => {
                setLoading(true);
                setSortValue(value);
                console.log(value);
              }}
            />
          </div>
        </div>
      </div>

      {sortedResidences && sortedResidences.length > 0 ? (
        <div className="flex justify-center  max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 place-items-center">
            {sortedResidences && loading !== true ? (
              //shwo a max of limit residences
              sortedResidences.slice(0, visibleLimit).map((residence, index) => {
                return (
                  <PropertyCard key={index} residence={residence}></PropertyCard>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-screen w-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl h-96 font-bold">
          No Residences found
        </div>
      )}
      <div className="flex justify-center my-10">
        {visibleLimit !== 100 && (
          <div
            className="w-[178px] h-14 border bg-primary hover:bg-secondary  text-white hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md"
            onClick={() => {
              setVisibleLimit(100);
              //scroll to the top of the page
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="text-2xl font-custom-kiona h-full flex justify-center items-center">
              View All
            </div>
          </div>
        )}
      </div>
    </>
  );
}
