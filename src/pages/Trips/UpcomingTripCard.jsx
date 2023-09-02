import { React, useState, useEffect } from "react";
import Image2 from "../../assets/images/property/placeholder2.png";
import Chat from "../../assets/images/trips/chat.svg";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function UpcomingTripCard({ trip }) {
  const navigate = useNavigate();
  const [residence, setResidence] = useState(null);

  useEffect(() => {
    setResidence(trip.residence);
  }, [trip]);
  return (
    <>
      {residence !== null && (
        <div className="flex flex-col bg-neutral-100 rounded-lg p-4 gap-2">
          <div className="w-full h-full flex">
            <img
              src={
                residence.pictures[0].original
                  ? residence.pictures[0].original
                  : residence.pictures[0].thumbnail
              }
              alt="left arrow"
              className=" w-full rounded-xl h-40 md:h-48 lg:h-56"
            />
          </div>
          <div className="text-sm font-custom">{residence.roomType}</div>
          <div className="text-lg font-custom text-primary">
            {residence.title}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="text-md font-custom-bold text-primary">Dates</div>
              <div className="text-sm">
                {
                  //In format eg: 12-14 June
                  format(new Date(trip.checkInDate), "dd MMM") +
                    " - " +
                    format(new Date(trip.checkOutDate), "dd MMM")
                }
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-md text-end font-custom text-primary underline">
                Edit
              </div>
              <div className="flex">
                <img src={Chat} alt="chat" className="w-5 h-5" />
                <div
                  className="text-sm pl-2 underline"
                  onClick={() => {
                    navigate(`/messages`);
                  }}
                >
                  Chat with us
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpcomingTripCard;
