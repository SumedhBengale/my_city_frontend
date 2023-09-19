import { React, useState } from "react";
import plus from "../../assets/images/home/plus.svg";

function FrequentQuestionsSection({ questions }) {
  return (
    <>
      <div className="font-custom-kiona uppercase text-2xl md:text-3xl text-center mt-10 px-5">
        Frequently Asked Questions
      </div>
      <div className="grid grid-cols-1  md:hidden">
        {questions !== null &&
          questions.map((question, index) => {
            return (
              <FrequentQuestion
                question={question.attributes.question}
                answer={question.attributes.answer}
                key={index}
              ></FrequentQuestion>
            );
          })}
      </div>

      <div className="hidden md:block md:px-20">
        <div className="grid grid-cols-2 ">
          <div>
            {questions !== null &&
              questions
                .slice(0, Math.ceil(questions.length / 2))
                .map((question, index) => {
                  return (
                    <FrequentQuestion
                      question={question.attributes.question}
                      answer={question.attributes.answer}
                      key={index}
                    ></FrequentQuestion>
                  );
                })}
          </div>
          <div>
            {questions !== null &&
              questions
                .slice(Math.ceil(questions.length / 2), questions.length)
                .map((question, index) => {
                  return (
                    <FrequentQuestion
                      question={question.attributes.question}
                      answer={question.attributes.answer}
                      key={index}
                    ></FrequentQuestion>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default FrequentQuestionsSection;

function FrequentQuestion({ question, answer }) {
  const [hovering, setHovering] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  return (
    <div className="mx-5 mt-5">
      <div className="Rectangle w-full bg-white hover:bg-primary hover:text-white transition duration:200 linear rounded-lg border border-black flex flex-col py-3"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex justify-between items-center">
          <div className="text-md ml-3 w-3/4 flex font-bold items-center capitalize">
            {question}
          </div>
          <div             
          className="w-8 mr-3 h-full flex justify-center items-center"
          onClick={() => setAnswerVisible(!answerVisible)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="plus" clipPath="url(#clip0_223_696)">
              <g id="Layer 2">
              <g id="plus_2">
              <path id="Vector" d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z" fill={
                hovering ? "#FFFFFF" : "#000000"
              }/>
              </g>
              </g>
              </g>
              <defs>
              <clipPath id="clip0_223_696">
              <rect width="24" height="24" fill="white"/>
              </clipPath>
              </defs>
            </svg>

          </div>
        </div>
        {<div
          className={`transition-all ${answerVisible ? 'h-auto opacity-100 px-3 pt-3' : 'h-0 opacity-0 overflow-hidden'} duration-200 linear`}
          style={{ maxHeight: answerVisible ? '1000px' : '0' }}
        >
          {answer}
        </div>}

      </div>
    </div>
  );
}
