import React from "react";
import Notification from "./Notification";

function Notifications({ notifications }) {
  return (
    <>
      <div className="mx-2 h-full">
        {notifications !== null ? (
          <div className="mt-5">
            {notifications.map((notification) => (
              //Look for left to right swipes, if present then run an animation to swipe the notification away
              <Notification
                notification={notification}
                key={notification._id}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full justify-center items-center">
            <div className="text-center text-2xl text-primary w-2/3">
              No New Notifications
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Notifications;
