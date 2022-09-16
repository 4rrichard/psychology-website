import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <a href="##" className="nav--name">
        Psychologist Gizem Cakin
      </a>
      <div className="nav--primary">
        <p className="nav--anchors">
          <a href="##" className="nav--anchor">
            About me
          </a>
          <a href="##" className="nav--anchor">
            What I offer
          </a>
          <a href="##" className="nav--anchor">
            Blog
          </a>
          <a href="##" className="nav--anchor">
            Contacts
          </a>
        </p>
        <button className="nav--book-appointment-btn">
          Book an appointment
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
