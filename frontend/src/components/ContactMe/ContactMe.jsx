import React from "react";
import { useState } from "react";
import axios from "../../api/axios";
import "./ContactMe.css";

function ContactMe() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    message: "",
    messageError: false,
  });

  const sendMessage = () => {
    const fullForm = new FormData();
    fullForm.append("fullName", formData.fullName);
    fullForm.append("email", formData.email);
    fullForm.append("phoneNum", formData.phoneNum);
    fullForm.append("message", formData.message);
    fullForm.append("captcha", formData.captcha);

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
      })
      .catch(() => {
        setFormData({
          messageError: true,
        });
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section className="contacts">
      <h1 className="contacts--title">Contact me</h1>
      <div className="contacts-container">
        <div className="contacts--info">
          <p className="contacts--subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit.
          </p>
          <div className="contacts--adress">
            <h3 className="contacts--adress-subtitle">Address</h3>
            <p className="contacts--adress-pharagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            </p>
          </div>
          <div className="contacts--hours">
            <h3 className="contacts--hours-subtitle">Hours</h3>
            <p className="contacts--hours-pharagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            </p>
          </div>
          <div className="contacts--contact">
            <h3 className="contacts--contact-subtitle">Contacts</h3>
            <p className="contacts--contact-pharagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            </p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10780.902942915289!2d19.0577637!3d47.5049949!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1e1303babc750580!2zQ29kZWNvb2wgQnVkYXBlc3QgLSBQcm9ncmFtb3rDsyBLw6lwesOpcywgSW5mb3JtYXRpa3VzIEvDqXB6w6lz!5e0!3m2!1shu!2shu!4v1663503961778!5m2!1shu!2shu"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="google-maps"
            className="google-maps"
          ></iframe>
        </div>
        <form className="contacts--send-email">
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
          <button className="send-email--btn">Send</button>
        </form>
      </div>
    </section>
  );
}

export default ContactMe;
