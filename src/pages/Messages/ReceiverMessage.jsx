import React from "react";

function ReceiverMessage({ message }) {
  return (
    <>
      <div className="flex justify-start mx-5">
        <div className="bg-neutral-200 rounded-tr-lg rounded-tl-lg rounded-br-lg text-black text-left px-5 py-2 text-sm">
          {message}
        </div>
      </div>
    </>
  );
}

export default ReceiverMessage;
