import React from 'react'

function SenderMessage({message}) {
  return (
    <>
        <div className='flex justify-end mx-5'>
            <div className='bg-black rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl text-white text-right px-5 py-2 text-sm'>{message}</div>
        </div>
    </>
  )
}

export default SenderMessage