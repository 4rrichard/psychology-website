import React from "react";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);

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
