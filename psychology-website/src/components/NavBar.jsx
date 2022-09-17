import React from "react";
import { Link } from "react-scroll";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <a href="##" className="nav--name">
        Psychologist Gizem Cakin
      </a>
      <div className="nav--primary">
        <div className="nav--anchors">
          <Link
            activeClass="active"
            to="about-me"
            spy={true}
            smooth={true}
            className="nav--anchor"
          >
            About me
          </Link>

          <Link
            activeClass="active"
            to="offers"
            spy={true}
            smooth={true}
            className="nav--anchor"
          >
            What I Offer
          </Link>

          <Link
            activeClass="active"
            to="blog"
            spy={true}
            smooth={true}
            className="nav--anchor"
          >
            Blog
          </Link>

          <Link
            activeClass="active"
            to="contacts"
            spy={true}
            smooth={true}
            className="nav--anchor"
          >
            Contacts
          </Link>
        </div>
        <button className="nav--book-appointment-btn">
          Book an appointment
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
