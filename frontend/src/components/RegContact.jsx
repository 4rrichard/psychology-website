import React from "react";
import { useState, useRef } from "react";
import BookedMessage from "./BookedMessage";
import "./RegContact.css";
import axios from "../api/axios";
import ReCAPTCHA from "react-google-recaptcha";

function RegContact({ clickBack, fullDate, setDisableDate }) {
  const { REACT_APP_SITE_KEY } = process.env;
  const captchaRef = useRef();

  const [displayConfirm, setDisplayConfirm] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    message: "",
    messageError: false,
  });
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const dateMessage = `\nbooked date: ${fullDate.date} ${fullDate.month} ${fullDate.year} at ${fullDate.hour}`;

  // console.log(dateMessage.slice(0, dateMessage.lastIndexOf("\n")));
  // console.log(dateMessage.slice(dateMessage.lastIndexOf("\n") + 1));

  const sendMessage = () => {
    formData.message += dateMessage;
    const fullForm = new FormData();
    fullForm.append("fullName", formData.fullName);
    fullForm.append("email", formData.email);
    fullForm.append("phoneNum", formData.phoneNum);
    fullForm.append("message", formData.message);

    captchaRef.current.reset();

    console.log(...fullForm);
    axios
      .post("/api/sendemail", { fullForm, recaptchaValue })
      .then(() => {
        setFormData({
          fullName: "",
          email: "",
          phoneNum: "",
          message: "",
        });

        setDisplayConfirm(false);
        setDisableDate((old) => [
          ...old,
          [
            parseInt(fullDate.year),
            fullDate.month,
            parseInt(fullDate.date),
            fullDate.hour,
          ],
        ]);
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
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function onChange(value) {
    setRecaptchaValue(value);
    console.log(value);
  }

  return (
    <>
      {displayConfirm ? (
        <section className="regContact">
          <h2 className="regContact--details-title">Booking details</h2>
          <form
            onSubmit={handleForm}
            className="contacts--send-email"
            onInvalid={(e) =>
              e.target.setCustomValidity("Please fill in the field")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          >
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
              value={formData.fullName}
              onChange={handleChange}
              name="fullName"
              placeholder="Enter your full name"
              className="send-email--full-name "
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email adress"
              className="send-email--email-adress "
              required
            />
            <input
              type="number"
              value={formData.phoneNum}
              onChange={handleChange}
              name="phoneNum"
              placeholder="Enter your phone number"
              className="send-email--phone-number "
              required
            />
            <textarea
              value={formData.message}
              onChange={handleChange}
              name="message"
              placeholder="Write your message"
              className="send-email--message"
              cols="30"
              rows="10"
            ></textarea>
            <ReCAPTCHA
              sitekey={REACT_APP_SITE_KEY}
              ref={captchaRef}
              onChange={onChange}
            />
            <button
              type="submit"
              // onClick={bookedBtnHandle}
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
