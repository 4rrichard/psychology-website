import React from "react";
import "./FAQ.css";
import { faqData } from "./faqData.js";
import Questions from "./Questions";

function FAQ() {
  return (
    <section className="faq">
      <h1 className="faq--title">FAQ</h1>
      {faqData.map((questions, index) => (
        <Questions questions={questions} key={index} />
      ))}
    </section>
  );
}

export default FAQ;
