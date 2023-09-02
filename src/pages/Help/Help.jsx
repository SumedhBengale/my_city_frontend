import React, { useEffect, useState } from "react";
import FrequentQuestionsSection from "../HomePage/FrequentQuestionsSection";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import { getFrequentlyAskedQuestions } from "./api";
import Footer from "../HomePage/Footer";

function Help() {
  const [frequentQuestions, setFrequentQuestions] = useState(null);

  useEffect(() => {
    getFrequentlyAskedQuestions()
      .then((res) => {
        console.log(res.data);
        setFrequentQuestions(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="hidden md:block z-20 fixed top-0 w-full">
        {<DesktopNavbarBlack />}
      </div>
      <div className="flex flex-col h-full justify-between md:mt-16">
        <div className="h-full">
          <div className="flex w-full h-12 bg-white shadow-lg justify-between gap-5">
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
            <div className="w-full flex items-center justify-start">
              <div className="text-lg text-center text-primary font-bold ">
                Help
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <FrequentQuestionsSection
              questions={frequentQuestions}
            ></FrequentQuestionsSection>
          </div>
        </div>

        {/*Show a Button at the bottom of the screen */}
        <div className="flex w-full h-full justify-center p-2 py-10">
          <button className="w-full max-w-lg h-12 text-white bg-primary rounded-lg">
            Chat with Us
          </button>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Help;
