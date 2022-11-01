import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faResearchgate,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const linkedInUrl = "https://www.linkedin.com/";
  const researchGateUrl = "https://www.researchgate.net/";
  const twitterUrl = "https://twitter.com/";

  return (
    <section className="footer">
      <div className="footer--reach-me">
        <p className="footer-reach-me--text">Reach me here:</p>
        <div className="footer--social-icons">
          <div
            className="footer--social"
            onClick={() => {
              window.open(linkedInUrl, "_blank");
            }}
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="3x"
              className="footer--social-icon"
            />
            <p className="footer--social--name">LinkedIn</p>
          </div>
          <div
            className="footer--social"
            onClick={() => {
              window.open(researchGateUrl, "_blank");
            }}
          >
            <FontAwesomeIcon
              icon={faResearchgate}
              size="3x"
              className="footer--social-icon"
            />
            <p className="footer--social--name">Research Gate</p>
          </div>
          <div
            className="footer--social"
            onClick={() => {
              window.open(twitterUrl, "_blank");
            }}
          >
            <FontAwesomeIcon
              icon={faTwitterSquare}
              size="3x"
              className="footer--social-icon"
            />
            <p className="footer--social--name">Twitter</p>
          </div>
        </div>
      </div>
      <div className="footer--creator">
        Created by Resperger Richárd, CodeCool
      </div>
    </section>
  );
}

export default Footer;
