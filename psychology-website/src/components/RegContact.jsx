import React from "react";
import { useState } from "react";
import BookedMessage from "./BookedMessage";
import "./RegContact.css";
import axios from "axios";

function RegContact({ clickBack, fullDate }) {
  const [displayConfirm, setDisplayConfirm] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    message: "",
    messageError: false,
  });

  const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSe-m8AyQmotKf10l_T3y-oKveOapK2SMP4ldH2jCBcISBL4Zw/viewform";
  const GOOGLE_FORM_NAME_ID = "entry.1349438757";
  const GOOGLE_FORM_EMAIL_ID = "entry.907658896";
  const GOOGLE_FORM_PHONE_NUMBER_ID = "entry.909529888";
  const GOOGLE_FORM_MESSAGE_ID = "entry.1030994600";
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/corsdemo";

  const sendMessage = () => {
    const fullForm = new FormData();
    formData.append(GOOGLE_FORM_MESSAGE_ID, formData.message);
    formData.append(GOOGLE_FORM_EMAIL_ID, formData.email);
    formData.append(GOOGLE_FORM_NAME_ID, formData.fullName);
    formData.append(GOOGLE_FORM_PHONE_NUMBER_ID, formData.phoneNum);
    axios
      .post(CORS_PROXY + GOOGLE_FORM_ACTION_URL, fullForm)
      .then(() => {
        setFormData({
          fullName: "",
          email: "",
          phoneNum: "",
          message: "",
        });
      })
      .catch(() => {
        setFormData({
          messageError: true,
        });
      });
  };

  const handleForm = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const bookedBtnHandle = () => {
    setDisplayConfirm(false);
  };

  return (
    <>
      {displayConfirm ? (
        <section className="regContact">
          <h2 className="regContact--details-title">Booking details</h2>
          <form onSubmit={handleForm} className="contacts--send-email">
            <div className="details-container">
              <div className="regContact--details">
                <h3 className="details--title">Date</h3>
                <h3 className="details--pharagraph">
                  {`${fullDate.year} ${fullDate.month} ${fullDate.date}`}
                </h3>
              </div>
              <div className="regContact--details">
                <h3 className="details--title">Time</h3>
                <h3 className="details--pharagraph">{fullDate.hour}</h3>
              </div>
              <div className="regContact--details">
                <h3 className="details--title">Service</h3>
                <h3 className="details--pharagraph">Therapy session</h3>
              </div>
            </div>

            <input
              type="text"
              value={formData.fullName ?? ""}
              onChange={handleChange}
              name="fullName"
              placeholder="Enter your full name"
              className="send-email--full-name "
            />
            <input
              type="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email adress"
              className="send-email--email-adress "
            />
            <input
              type="number"
              value={formData.phoneNum ?? ""}
              onChange={handleChange}
              name="phoneNum"
              placeholder="Enter your phone number"
              className="send-email--phone-number "
            />
            <textarea
              value={formData.message ?? ""}
              onChange={handleChange}
              name="message"
              placeholder="Write your message"
              className="send-email--message"
              cols="30"
              rows="10"
            ></textarea>
            <button
              type="submit"
              onClick={bookedBtnHandle}
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
