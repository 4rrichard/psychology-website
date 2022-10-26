import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Questions(questions) {
  const QA = questions.questions;
  const [isVisible, setIsVisible] = useState(false);

  const visibilityHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className={
          isVisible
            ? "faq--question-container-active"
            : "faq--question-container"
        }
        onClick={visibilityHandler}
      >
        <h4 className="faq--question">{QA.question}</h4>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="4x"
          className={isVisible ? "faq--close" : "faq--drop-down"}
        />
      </div>

      <div
        className={
          isVisible ? "faq--answer-container-active" : "faq--answer-container"
        }
      >
        {isVisible && <p className="faq--answer">{QA.answer}</p>}
      </div>
    </>
  );
}

export default Questions;
