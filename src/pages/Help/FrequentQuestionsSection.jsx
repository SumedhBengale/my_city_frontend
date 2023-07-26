import {React, useState} from 'react'
import plus from '../../assets/images/home/plus.svg'

function FrequentQuestionsSection() {
  return (
    <>
        <div className='grid grid-cols-1  md:hidden'>
          <FrequentQuestion question={`How do I change the date of my booking?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
          <FrequentQuestion question={`My flight has been cancelled and I can’t go on my holiday. What should I do?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
          <FrequentQuestion question={`What should I do if an emergency situation might affect my booking?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
          <FrequentQuestion question={`How do I know if my booking is confirmed?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
        </div>

        <div className='hidden md:block md:px-20'>
          <div className='grid grid-cols-2 '>
            <div>
            <FrequentQuestion question={`How do I change the date of my booking?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
          <FrequentQuestion question={`My flight has been cancelled and I can’t go on my holiday. What should I do?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
            </div>
            <div>
            <FrequentQuestion question={`What should I do if an emergency situation might affect my booking?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
          <FrequentQuestion question={`How do I know if my booking is confirmed?`} answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}></FrequentQuestion>
            </div>
          </div>
        </div>
    </>
  )
}

export default FrequentQuestionsSection



function FrequentQuestion(
  {
    question,
    answer
  }
){

  const [answerVisible, setAnswerVisible] = useState(false)

  return(
    <div className='mx-5 mt-5'>
      <div className="Rectangle w-full bg-white rounded-lg border border-black flex flex-col py-3">
        <div className='flex justify-between'>
          <div className='text-md ml-3 w-3/4 flex items-center font-bold capitalize'>{question}</div>
          <img src={plus} alt='plus' className='w-8 mr-3' onClick={()=>setAnswerVisible(!answerVisible)}/>
        </div>
        {answerVisible && <div className='px-3'>{answer}</div>}

      </div>

    </div>
  )
}