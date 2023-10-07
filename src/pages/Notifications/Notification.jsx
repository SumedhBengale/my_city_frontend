import React, { useEffect } from "react";
import { deleteNotification, setViewed } from "./api";
import { useSwipeable } from "react-swipeable";

function Notification({ notification, refresh }) {
  const [offset, setOffset] = React.useState(0);
  const handlers = useSwipeable({
    trackMouse: true,
    onSwiped: async (eventData) => await deleteNotification(notification._id),    
    onSwiping: (eventData) => {
      setOffset('full');
      setTimeout(() => {
        refresh(notification._id);
      }, 300);
    }
  });
  //If the notification is visible to the user, then run the setViewed function to update the notification to viewed
  useEffect(() => {
    if (notification.viewed === false) {
      setViewed(notification._id);
    }
  }, [notification]);

  return (
    <>
      <div className={`flex flex-col transition duration-300 cursor-pointer translate-x-${offset} `} {...handlers} >
        <div className="flex justify-between">
          <div className="text-sm text-primary text-left px-2 select-none">
            {notification.message}
          </div>
          {notification.viewed === false && (
            <div className=" bottom-0 text-center flex items-center pr-3">
              <div className="bg-red-500 text-white rounded-xl py-1 px-3 text-[10px]">
                New
              </div>
            </div>
          )}
        </div>
        <div className="h-full mx-2 my-2">
          <hr className="w-full h-[2px] bg-black"></hr>
        </div>
      </div>
    </>
  );
}

export default Notification;
