import React from "react";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h4 className="hero--subtitle">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </h4>
      <h1 className="hero--title">Mental Health Therapy in Budapest</h1>
      <Scroll
        activeClass="active"
        to="about-me"
        spy={true}
        smooth={true}
        className="hero--aboutme-btn"
      >
        About me
      </Scroll>
      <Link to="/appointment" className="hero--book-appointment-btn">
        Book an appointment
      </Link>
    </section>
  );
}

export default Hero;
