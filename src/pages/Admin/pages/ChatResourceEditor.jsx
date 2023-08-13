import React, { useEffect, useState } from 'react';
import LeftArrow from '../../../assets/images/property/left.svg';
import SenderMessage from '../../Messages/SenderMessage';
import ReceiverMessage from '../../Messages/ReceiverMessage'
import { adminAddMessage, adminGetChat } from '../api'; // Adjust the API functions for admin actions

function ChatResourceEditor() {
  const [messages, setMessages] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch chat and set initial messages (for admin)
    adminGetChat().then((data) => {
      setChatId(data.chat._id);
      if (data.chat.messages.length > 0) {
        console.log(data.chat);
        setMessages(data.chat.messages);
        console.log(data.chat.messages);
      }
    });
  }, []);

  const handleSend = () => {
    // Send a message as admin
    adminAddMessage(chatId, text).then((data) => {
      console.log(data);
      if (data.status === 201) {
        console.log(data.chat.messages);
        setMessages(data.chat.messages);
        setText('');
      }
    });
  };

  return (
    <>
      <div className='flex flex-col h-screen justify-between'>
        <div>
          <div className='flex w-full h-12 bg-white shadow-lg justify-between'>
            <div className='w-10 h-full' onClick={() => window.history.back()}>
              <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3' />
            </div>
            <div className='w-full flex items-center justify-center'>
              <div className='text-lg text-center font-bold '>Messages</div>
            </div>
          </div>

          <div className='flex flex-col gap-5 my-5 container mx-auto'>
            {messages !== null &&
              messages.map((message) =>
                message.sender === 'admin' ? (
                  <SenderMessage message={message.message} />
                ) : (
                  <ReceiverMessage message={message.message} />
                )
              )}
          </div>
        </div>

        {/* Show a Button at the bottom of the screen */}
        <form className='flex items-center justify-between sticky bottom-0 p-2 container mx-auto'>
          <input
            type='text'
            className='flex-grow mr-2 border rounded px-2 py-1 focus:outline-none hover:scale-y-110 transition duration-75'
            placeholder='Type Here...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='bg-black text-white hover:scale-105 transition duration-75 px-4 py-2 rounded-lg'
            type='submit'
            onClick={() => handleSend()}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatResourceEditor;
