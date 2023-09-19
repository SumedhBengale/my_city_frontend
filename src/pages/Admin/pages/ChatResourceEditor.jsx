import React, { useEffect, useState } from "react";
import LeftArrow from "../../../assets/images/property/left.svg";
import SenderMessage from "../../Messages/SenderMessage";
import ReceiverMessage from "../../Messages/ReceiverMessage";
import { adminAddMessage, adminGetChat } from "../api"; // Adjust the API functions for admin actions
import Footer from "../../HomePage/Footer";
import { useRef } from "react";

function ChatResourceEditor() {
  const [messages, setMessages] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [text, setText] = useState("");

  const messagesContainerRef = useRef(null); // Reference to the messages container

  useEffect(() => {
    // Fetch chat and set initial messages
    adminGetChat().then((data) => {
      setChatId(data.chat._id);
      if (data.chat.messages.length > 0) {
        setMessages(data.chat.messages);
      }
    });

    // Start polling for new messages every 5 seconds
    const timerId = setInterval(() => {
      adminGetChat().then((data) => {
        if (data.chat.messages.length > 0) {
          //If there are new messages, update the UI
          if (
            messages !== null &&
            messages.length < data.chat.messages.length
          ) {
            setMessages(data.chat.messages);
          }
        }
      });
    }, 5000); // Polling every 5 seconds

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    // Create a new message object based on the entered text
    const newMessage = {
      _id: Math.random().toString(), // Generate a temporary unique ID (replace with your actual ID generation logic)
      sender: "admin",
      message: text,
    };

    //check if prevmessages is null
    if (messages === null) {
      setMessages([newMessage]);
    } else {
      // Add the new message to the UI
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    // Make the API call to add the message
    adminAddMessage(chatId, text)
      .then((data) => {
        if (data.status === 200) {
          console.log("Message added successfully:", data); // Adjust this based on your API response structure
          // If the API call is successful, the UI is already updated, so no further action needed.
        } else {
          // Handle API error (e.g., display an error message to the user)
          console.error("Failed to add message:", data); // Adjust this based on your API response structure
          // Revert the UI by removing the added message
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== newMessage._id)
          );
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
        // Revert the UI by removing the added message
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== newMessage._id)
        );
      });
    setText("");
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex w-full h-12 bg-white shadow-lg justify-between">
            <div className="w-10 h-full" onClick={() => window.history.back()}>
              <img src={LeftArrow} alt="left arrow" className="w-6 h-6 m-3" />
            </div>
            <div className="w-full flex items-center justify-start px-2">
              <div className="text-primary font-custom-kiona text-3xl capitalize">
                Messages
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef} // Attach the ref to the messages container
            className="flex flex-col gap-5 my-5 container mx-auto no-scrollbar"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }} // Add styles for scrolling
          >
            {messages !== null &&
              messages.map((message) =>
                message.sender === "admin" ? (
                  <SenderMessage message={message.message} key={message._id} />
                ) : (
                  <ReceiverMessage
                    message={message.message}
                    key={message._id}
                  />
                )
              )}
          </div>
        </div>
        <form
          className="flex items-center justify-between sticky bottom-0 p-2 container mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="flex-grow mr-2 border border-primary rounded px-2 py-1 focus:outline-none hover:scale-y-110 transition duration-75"
            placeholder="Type Here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-primary text-white hover:scale-105 transition duration-75 px-4 py-2 rounded-lg"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ChatResourceEditor;
