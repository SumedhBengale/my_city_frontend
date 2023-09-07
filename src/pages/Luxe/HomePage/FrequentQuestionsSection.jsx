import { React, useState } from "react";
import plus from "../../../assets/images/home/plus_white.svg";

function FrequentQuestionsSection({ questions }) {
  return (
    <>
      <div className="font-custom-kiona uppercase text-2xl md:text-3xl text-center mt-10 pt-5 px-5 text-white">
        Frequently Asked Questions
      </div>
      <div className="grid grid-cols-1 md:hidden pb-5">
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

      <div className="hidden md:block md:px-20 pb-5">
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
  const [answerVisible, setAnswerVisible] = useState(false);

  return (
    <div className="mx-5 mt-5">
      <div className="Rectangle w-full bg-transparent rounded-lg border border-white flex flex-col py-3">
        <div className="flex justify-between">
          <div className="text-md text-white ml-3 w-3/4 flex  items-center capitalize">
            {question}
          </div>
          <img
            src={plus}
            alt="plus"
            className="w-8 mr-3"
            onClick={() => setAnswerVisible(!answerVisible)}
          />
        </div>
        {answerVisible && <div className="px-3 text-white">{answer}</div>}
      </div>
    </div>
  );
}
