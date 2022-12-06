import React, { useState, useContext } from "react";
import { Link as Scroll } from "react-scroll";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);

  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const navigate = useNavigate();

  console.log(path, location);

  const goToPageAndScroll = async (selector) => {
    console.log(selector);
    await navigate("/");
    await scroller.scrollTo(selector, {
      duration: 500,
      smooth: true,
      offset: 50,
      spy: true,
    });
  };

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
        <Link
          to="/"
          onClick={() => {
            setNavOpen(false);
          }}
          className="nav--name"
        >
          Psychologist Gizem Cakin
        </Link>

        <div className={`nav--primary ${navOpen && "nav--open"}`}>
          <div className="nav--anchors">
            {location !== "appointment" ? (
              <>
                {" "}
                <Scroll
                  activeClass="active"
                  onClick={menuToggle}
                  to="about-me"
                  spy={true}
                  smooth={true}
                  className="nav--anchor"
                >
                  About me
                </Scroll>
                <Scroll
                  activeClass="active"
                  onClick={menuToggle}
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
                  onClick={menuToggle}
                  to="blog"
                  spy={true}
                  smooth={true}
                  className="nav--anchor"
                >
                  Blog
                </Scroll>
                <Scroll
                  activeClass="active"
                  onClick={menuToggle}
                  to="contacts"
                  spy={true}
                  smooth={true}
                  className="nav--anchor"
                >
                  Contacts
                </Scroll>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => goToPageAndScroll("about-me")}
                  className="nav--anchor"
                >
                  About me
                </button>
                <button
                  onClick={() => goToPageAndScroll("offers")}
                  className="nav--anchor"
                >
                  What I offer
                </button>
                <button
                  onClick={() => goToPageAndScroll("blog")}
                  className="nav--anchor"
                >
                  Blog
                </button>
                <button
                  onClick={() => goToPageAndScroll("contacts")}
                  className="nav--anchor"
                >
                  Contacts
                </button>
              </>
            )}
          </div>
          <Link
            to="/appointment"
            onClick={menuToggle}
            className="nav--book-appointment-btn"
          >
            Book an appointment
          </Link>
        </div>
        {!navOpen && (
          <FontAwesomeIcon
            onClick={menuToggle}
            icon={faBars}
            size="4x"
            className="hiddenMenuIcon"
          />
        )}
        {navOpen && (
          <FontAwesomeIcon
            onClick={menuToggle}
            icon={faXmark}
            size="4x"
            className="hiddenMenuIcon"
          />
        )}
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
