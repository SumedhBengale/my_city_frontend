import React from 'react'
import LeftArrow from '../../assets/images/property/left.svg'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'

function Messages() {
  return (
    <>
        <div className='flex flex-col h-screen justify-between'>
            <div>
                <div className='flex w-full h-12 bg-white shadow-lg justify-between'>
                    <div className='w-10 h-full' onClick={()=>window.history.back()}>
                        <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <div className='text-lg text-center font-bold '>Messages</div>
                    </div>
                </div>

                <div className='flex flex-col gap-5 my-5 container mx-auto'>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>
                    <SenderMessage message={'Sumedh Here'}></SenderMessage>
                    <ReceiverMessage message={'Reply from Other Party'}></ReceiverMessage>


                </div>

                
            </div>

            {/*Show a Button at the bottom of the screen */}
            <div className="flex items-center justify-between sticky bottom-0 p-2 container mx-auto">
                <input
                    type="text"
                    className="flex-grow mr-2 border rounded px-2 py-1 focus:outline-none hover:scale-y-110 transition duration-75"
                    placeholder="Type Here..."
                />
                <button className="bg-black text-white hover:scale-105 transition duration-75 px-4 py-2 rounded-lg">
                    Send
                </button>
            </div>
        </div>
    </>
  )
}

export default Messages