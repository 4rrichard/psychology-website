import React, { useState } from "react";

function Questions(questions) {
  const QA = questions.questions;
  const [isVisible, setIsVisible] = useState(false);

  const visibilityHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="faq--question-container" onClick={visibilityHandler}>
        <h4 className="faq--question">{QA.question}</h4>
        <img
          src="\images\drop-down.png"
          alt="drop-down-arrow"
          className="faq--drop-down"
        />
      </div>
      {isVisible && <p>{QA.answer}</p>}
    </>
  );
}

export default Questions;
