import React from "react";
import { useState } from "react";
import "./FAQ.css";
import { faqData } from "./faqData.js";

function FAQ() {
  const [isVisible, setIsVisible] = useState(false);

  const visibilityHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className="faq">
      <h1 className="faq--title">FAQ</h1>
      {faqData.map((data) => (
        <>
          <div className="faq--question-container" onClick={visibilityHandler}>
            <h4 className="faq--question">{data.question}</h4>
            <img
              src="\images\drop-down.png"
              alt="drop-down-arrow"
              className="faq--drop-down"
            />
          </div>
          {isVisible && <p>{data.answer}</p>}
        </>
      ))}
    </section>
  );
}

export default FAQ;
