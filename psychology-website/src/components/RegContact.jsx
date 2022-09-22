import React from "react";
import { useState, useEffect } from "react";
import BookedMessage from "./BookedMessage";
import "./RegContact.css";

function RegContact({ clickBack }) {
  const [displayConfirm, setDisplayConfirm] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formData));
  }, [formData]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const bookedBtnHandle = () => {
    setDisplayConfirm(false);
  };

  const bookedFormDataHandle = (e) => {
    console.log(formData);
  };

  return (
    <>
      {displayConfirm ? (
        <section className="regContact">
          <h2 className="regContact--details-title">Booking details</h2>
          <form className="contacts--send-email">
            <div className="details-container">
              <div className="regContact--details">
                <h3 className="details--title">Date</h3>
                <h3 className="details--pharagraph">2022 September 22.</h3>
              </div>
              <div className="regContact--details">
                <h3 className="details--title">Time</h3>
                <h3 className="details--pharagraph">10:00</h3>
              </div>
              <div className="regContact--details">
                <h3 className="details--title">Service</h3>
                <h3 className="details--pharagraph">Therapy session</h3>
              </div>
            </div>

            <input
              type="text"
              onChange={handleForm}
              value={formData.fullName}
              name="fullName"
              placeholder="Enter your full name"
              className="send-email--full-name "
            />
            <input
              type="email"
              onChange={handleForm}
              value={formData.email}
              name="email"
              placeholder="Enter your email adress"
              className="send-email--email-adress "
            />
            <input
              type="number"
              onChange={handleForm}
              value={formData.phoneNum}
              name="phoneNum"
              placeholder="Enter your phone number"
              className="send-email--phone-number "
            />
            <textarea
              onChange={handleForm}
              value={formData.message}
              name="message"
              placeholder="Write your message"
              className="send-email--message"
              cols="30"
              rows="10"
            ></textarea>
            <button
              onClick={() => {
                bookedBtnHandle();
                bookedFormDataHandle();
              }}
              className="send-email--btn"
            >
              Finalize Booking
            </button>
          </form>
          <button className="back-to-appointment-btn" onClick={clickBack}>
            Back to Appointments
          </button>
        </section>
      ) : (
        <BookedMessage />
      )}
    </>
  );
}

export default RegContact;
