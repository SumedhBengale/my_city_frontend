import { React, useState, useEffect } from "react";
import {saveReview } from "./api";
import { format } from "date-fns";

function PastTripCard({ trip, toast }) {
  const [residence, setResidence] = useState(null);
  const [reviewCardVisible, setReviewCardVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState(null);
  const submitReview = () => {
    //if the rating or review is null, then don't submit
    if (rating === 0 || review === null || review === "") {
      toast("Please fill in all fields");
      return;
    }
    saveReview(trip._id, rating, review).then((data) => {
      console.log(data);
      setReviewCardVisible(false);
    });
  };

  const getReview = () => {
    return true;
  };

  useEffect(() => {
    setResidence(trip.residence);
    setReview(trip.review);
  }, [trip]);

  return (
    <>
      {reviewCardVisible && getReview() && (
        //Pop up review card
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col bg-white mx-3 w-full sm:w-1/2 rounded-lg p-4 gap-2">
            <div className="text-md font-bold">Write a review</div>
            <div className="flex flex-col">
              <div className="text-sm">Overall rating</div>
              <div className="flex py-2 px-4 w-full justify-between items-center">
                <div className="flex flex-col sm:flex-row items-center w-full sm:w-min">
                  <div className="w-full h-full text-md font-custom-bold text-start text-primary">
                    <div className="text-center sm:text-start">Rating</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="w-20 h-8  rounded-full flex justify-end items-center text-black text-center text-xs font-bold"
                      onClick={() =>
                        rating > 0 ? setRating(rating - 1) : null
                      }
                    >
                      {/* < Arrow */}
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M15.707 7.293a1 1 0 010 1.414L12.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="w-full text-md font-custom-bold flex justify-center h-full items-center text-center text-primary">
                      {rating}
                    </div>
                    <div
                      className="w-20 h-8  rounded-full flex justify-start items-center text-black text-center text-xs font-bold"
                      onClick={() =>
                        rating < 10 ? setRating(rating + 1) : null
                      }
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M8.293 16.707a1 1 0 010-1.414L11.586 12 8.293 8.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm">Review</div>
              <textarea
                className="border bg-neutral-100 rounded-lg p-2"
                value={review === null ? trip.review : review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end gap-5">
              <button
                className="bg-neutral-100 rounded-lg p-2"
                onClick={() => setReviewCardVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary hover:bg-secondary rounded-lg p-2 text-white"
                onClick={() => submitReview()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {residence !== null && (
        <div className="flex flex-col bg-neutral-100 rounded-lg p-4 gap-2">
          <div className="w-full h-full flex">
            <img
              src={
                residence.pictures[0].original
                  ? residence.pictures[0].original
                  : residence.pictures[0].thumbnail
              }
              alt="placeholder"
              onClick={() => window.history.back()}
              className=" w-full rounded-xl h-40 md:h-48 lg:h-56"
            />
          </div>
          <div className="text-sm">{residence.roomType}</div>
          <div className="text-md font-custom-kiona text-primary">
            {residence.title}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="text-md font-custom-bold text-primary">Dates</div>
              <div className="text-sm font-custom">{` ${format(
                new Date(trip.checkInDate),
                "dd MMMM"
              )} - ${format(new Date(trip.checkOutDate), "dd MMMM")} `}</div>
            </div>
            <div className="flex flex-col justify-end">
              <div
                className="text-md text-end font-custom-kiona underline"
                onClick={() => setReviewCardVisible(true)}
              >
                Write a review
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PastTripCard;
