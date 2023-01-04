import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookedMessage.css";

function BookedMessage({ togglePopup }) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          togglePopup();
          goHome();
        }}
      ></div>
      <div className="booking-confirmation">
        <h1 className="booking-confirmation--title">Booking successful</h1>
        <p className="booking-confirmation--text">
          Thank you for booking an appointment! The details have been sent to
          your email address!
        </p>
        <button
          className="ok-btn"
          onClick={() => {
            togglePopup();
            goHome();
          }}
        >
          Okay!
        </button>
      </div>
    </>
  );
}

export default BookedMessage;
