import React from "react";
import "./Subscribe.css";

function Subscribe() {
  return (
    <section className="subscribe">
      <h1 className="subscribe--title">Subscribe to my newsletter</h1>
      <h2 className="subscribe--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </h2>
      <form action="" className="subscribe--form">
        <input
          type="text"
          placeholder="Enter your first name"
          className="subscribe--first-name"
        />
        <input
          type="text"
          placeholder="Enter your email address"
          className="subscribe--email"
        />
        <button className="subscribe--btn">Subscribe</button>
      </form>
    </section>
  );
}

export default Subscribe;
