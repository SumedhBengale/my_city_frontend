import React from "react";

function SenderMessage({ message }) {
  return (
    <>
      <div className="flex justify-end mx-5">
        <div className="bg-primary rounded-tr-lg rounded-tl-lg rounded-bl-lg text-white text-right px-5 py-2 text-sm">
          {message}
        </div>
      </div>
    </>
  );
}

export default SenderMessage;
