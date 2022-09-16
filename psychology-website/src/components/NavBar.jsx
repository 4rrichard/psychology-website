import React from "react";

function NavBar() {
  return (
    <nav>
      <h3 className="nav--name">Psychologist Gizem Cakin</h3>
      <div className="nav--primary">
        <p className="primary--buttons">
          <a href="##">About me</a>
          <a href="##">What I offer</a>
          <a href="##">Blog</a>
          <a href="##">Contacts</a>
          <button className="book-appointment">Book an appointment</button>
        </p>
      </div>
    </nav>
  );
}

export default NavBar;
