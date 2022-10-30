import React, { useState, useContext } from "react";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);

  const menuToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .get("/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setAuth({});
        alert("You are logged out");
      });
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav--name">
          Psychologist Gizem Cakin
        </Link>

        <div className={`nav--primary ${navOpen && "nav--open"}`}>
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
              hashSpy={true}
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
        <FontAwesomeIcon
          onClick={menuToggle}
          icon={faBars}
          size="4x"
          className="hiddenMenuIcon"
        />
        {auth.admin && (
          <button onClick={handleLogout} className="logged-in">
            {auth.admin}
          </button>
        )}
      </nav>
    </>
  );
}

export default NavBar;
