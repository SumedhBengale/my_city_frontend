import React, { useState } from "react";
import Notification from "./Notification";

function Notifications({ notifications, refresh }) {
  
  return (
    <>
      <div className="mx-2 h-full">
        {notifications !== null ? (
          <div className="mt-5">
            {notifications && notifications.map((notification) => (
                <Notification notification={notification} refresh={refresh}/>
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
