import React from "react";

function Notification({ notification }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-sm text-primary text-left px-2">
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
