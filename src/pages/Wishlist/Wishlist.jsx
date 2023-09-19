import { React, useState, useEffect, useRef } from "react";
import PropertyCard from "../HomePage/PropertyCard";
import Footer from "../HomePage/Footer";
import FadeInSection from "../../components/fadeIn/fadeInSection";
import SortDropdown from "./sortDropdown";
import Filter from "../../components/filter";
import { useLocation } from "react-router-dom";
import { getWishlist } from "./api";

function Wishlist() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [residences, setResidences] = useState(null);
  const nearbyPropertiesRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fetchedPropertiesFilter, setFetchedPropertiesFilter] = useState(false);
  const [fetchedFilterData, setFetchedFilterData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    getWishlist()
      .then((res) => {
        console.log(res);
        if (res.wishlistItems.length === 0) {
          setResidences([]);
          setLoading(false);
          return;
        }
        setResidences(res.wishlistItems);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state]);
  return (
    <>
      <>
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
        <div className="bg-white ">
          <div className="flex w-full h-12 bg-white shadow-lg justify-start items-center gap-5">
            <div
              className="w-10 flex items-center h-full pl-5"
              onClick={() => window.history.back()}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M16.15 3.125C15.725 3.125 15.325 3.325 15.1 3.55L7.70005 11.05C7.40005 11.35 7.30005 11.775 7.30005 12.175C7.30005 12.6 7.40005 13.025 7.70005 13.325L15.1 21.35C15.425 21.675 15.725 21.875 16.15 21.875C16.575 21.875 16.975 21.775 17.3 21.45C17.6 21.15 17.825 20.725 17.825 20.3C17.825 19.9 17.7 19.475 17.3 19.175L10.95 12.175L17.3 5.625C17.5 5.425 17.7 5.1 17.7 4.675C17.7 4.275 17.6 3.85 17.3 3.55C16.875 3.225 16.575 3.125 16.15 3.125Z"
                    fill="#1F2937"
                  />
                </g>
              </svg>
            </div>
            <div className="flex justify-start">
              <div className="text-primary font-custom-kiona text-3xl capitalize">
                WishList
              </div>
              <div className="flex justify-center items-start pl-3 pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M13 22.5L11.88 21.39C6.42 16.05 3 12.66 3 8.5C3 5.42 5.42 3 8.5 3C10.34 3 12.09 3.97 13 5.5C13.91 3.97 15.66 3 17.5 3C20.58 3 23 5.42 23 8.5C23 12.66 19.58 16.05 14.12 21.39L13 22.5Z"
                    fill="none"
                    stroke="#FF5A5F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <FadeInSection>
            {residences !== null && !loading ? (
              residences.length > 0 ? (
                <WishlistSection
                  setFilterVisible={setFetchedPropertiesFilter}
                  filterData={fetchedFilterData}
                  residences={residences}
                ></WishlistSection>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-2xl font-bold">
                    No Wishlist Items Found
                  </div>
                </div>
              )
            ) : (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </FadeInSection>
        </div>
        {/* <FadeInSection> */}
        <Footer></Footer>
        {/* </FadeInSection> */}
      </>
    </>
  );
}

export default Wishlist;

function WishlistSection({ setFilterVisible, residences, filterData }) {
  const [sortValue, setSortValue] = useState("p-lh");
  const [sortedResidences, setSortedResidences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (residences) {
      console.log("residences", residences);
      let tempResidences = residences;

      console.log("sorting");
      if (sortValue === "p-lh") {
        //Sort by price low to high
        setSortedResidences(
          tempResidences.sort(
            (a, b) =>
              a.residence.prices.basePrice - b.residence.prices.basePrice
          )
        );
      } else if (sortValue === "p-hl") {
        //Sort by price high to low
        setSortedResidences(
          tempResidences.sort(
            (a, b) =>
              b.residence.prices.basePrice - a.residence.prices.basePrice
          )
        );
      } else if (sortValue === "r-hl") {
        //Sort by rating high to low
        setSortedResidences(
          tempResidences.sort(
            (a, b) => b.residence.reviews.avg - a.residence.reviews.avg
          )
        );
      }
      setLoading(false);
    }
  }, [sortValue, residences, filterData]);

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="flex flex-col md:flex-row justify-end pt-10">
          <div className="flex flex-col items-end justify-end mt-3 mb-5 gap-5">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 place-items-center">
            {sortedResidences && loading !== true ? (
              sortedResidences.map((residence, index) => {
                return (
                  <PropertyCard
                    key={index}
                    residence={residence.residence}
                  ></PropertyCard>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-2xl font-bold">
            No Residences found
          </div>
        )}
      </div>
    </>
  );
}
