import React from "react";
import { useState, useRef } from "react";
import BookedMessage from "../BookedMessage/BookedMessage";
import "./RegContact.css";
import axios from "../../api/axios";
import ReCAPTCHA from "react-google-recaptcha";

function RegContact({ clickBack, fullDate, setDisableDate }) {
  const { REACT_APP_SITE_KEY } = process.env;
  const captchaRef = useRef();
  const [popup, setPopup] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    message: "",
    messageError: false,
    captcha: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const dateMessage = `\nbooked date: ${fullDate.date} ${fullDate.month} ${fullDate.year} at ${fullDate.hour}`;

  // console.log(dateMessage.slice(0, dateMessage.lastIndexOf("\n")));
  // console.log(dateMessage.slice(dateMessage.lastIndexOf("\n") + 1));

  const sendMessage = () => {
    formData.message += dateMessage;
    formData.captcha += recaptchaValue;
    const fullForm = new FormData();
    fullForm.append("fullName", formData.fullName);
    fullForm.append("email", formData.email);
    fullForm.append("phoneNum", formData.phoneNum);
    fullForm.append("message", formData.message);
    fullForm.append("captcha", formData.captcha);

    captchaRef.current.reset();

    axios
      .post("/api/sendemail", fullForm, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        setFormData({
          fullName: "",
          email: "",
          phoneNum: "",
          message: "",
        });

        // setDisableDate((old) => [
        //   ...old,
        //   [
        //     parseInt(fullDate.year),
        //     fullDate.month,
        //     parseInt(fullDate.date),
        //     fullDate.hour,
        //   ],
        // ]);
        axios.post("/api/addregdata", {
          fullDate: fullDate,
          name: formData.fullName,
          email: formData.email,
          phoneNum: formData.phoneNum,
        });

        setPopup(true);
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
  }

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <section className="regContact">
      <h1 className="regContact--details-title">Booking details</h1>
      <button className="back-to-appointment-btn" onClick={clickBack}>
        Back to Appointments
      </button>
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
        {formData.messageError === true && <div>Recaptcha failed</div>}
        <ReCAPTCHA
          sitekey={REACT_APP_SITE_KEY}
          ref={captchaRef}
          onChange={onChange}
        />
        <button type="submit" className="send-email--btn">
          Finalize Booking
        </button>
      </form>
      {popup && <BookedMessage togglePopup={togglePopup} />}
    </section>
  );
}

export default RegContact;
