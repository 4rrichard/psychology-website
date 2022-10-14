import React from "react";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav>
        <Link to="/" className="nav--name">
          Psychologist Gizem Cakin
        </Link>
        <div className="nav--primary">
          <div className="nav--anchors">
            <Scroll
              activeClass="active"
              to="about-me"
              spy={true}
              smooth={true}
              className="nav--anchor"
            >
              About me
            </Scroll>

            <Scroll
              activeClass="active"
              to="offers"
              spy={true}
              smooth={true}
              className="nav--anchor"
            >
              What I Offer
            </Scroll>

            <Scroll
              activeClass="active"
              to="blog"
              spy={true}
              smooth={true}
              className="nav--anchor"
            >
              Blog
            </Scroll>

            <Scroll
              activeClass="active"
              to="contacts"
              spy={true}
              smooth={true}
              className="nav--anchor"
            >
              Contacts
            </Scroll>
          </div>
          <Link to="/appointment" className="nav--book-appointment-btn">
            Book an appointment
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
