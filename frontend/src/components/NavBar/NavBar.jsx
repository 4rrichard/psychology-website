import React, { useState, useContext, useEffect } from "react";
import { Link as Scroll, scroller } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import LogoutPopup from "../LogoutPopup/LogoutPopup";
import "./NavBar.css";

function NavBar() {
    const { auth, setAuth } = useContext(AuthContext);
    const [navOpen, setNavOpen] = useState(false);
    const [popup, setPopup] = useState(false);
    const path = useLocation().pathname;
    const location = path.split("/")[1];
    const navigate = useNavigate();

    const goToPageAndScroll = async (selector) => {
        await navigate("/");
        await scroller.scrollTo(selector, {
            duration: 500,
            smooth: true,
            offset: 50,
            spy: true,
        });
    };

    const menuToggle = () => setNavOpen(!navOpen);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/logout", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setAuth(null);
            setPopup(true);
            navigate("/admin");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {
        if (popup) {
            const timer = setTimeout(() => setPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [popup]);

    return (
        <>
            <nav className="navbar">
                <Link
                    to="/"
                    onClick={() => setNavOpen(false)}
                    className="nav--name"
                >
                    Psychologist Gizem Cakin
                </Link>

                <div className={`nav--primary ${navOpen && "nav--open"}`}>
                    <div className="nav--anchors">
                        {location === "" ? (
                            <>
                                <Scroll
                                    onClick={menuToggle}
                                    to="about-me"
                                    smooth
                                    className="nav--anchor"
                                >
                                    About me
                                </Scroll>
                                <Scroll
                                    onClick={menuToggle}
                                    to="offers"
                                    smooth
                                    className="nav--anchor"
                                >
                                    What I Offer
                                </Scroll>
                                <Scroll
                                    onClick={menuToggle}
                                    to="blog"
                                    smooth
                                    className="nav--anchor"
                                >
                                    Blog
                                </Scroll>
                                <Scroll
                                    onClick={menuToggle}
                                    to="contacts"
                                    smooth
                                    className="nav--anchor"
                                >
                                    Contacts
                                </Scroll>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() =>
                                        goToPageAndScroll("about-me")
                                    }
                                    className="nav--anchor"
                                >
                                    About me
                                </button>
                                <button
                                    onClick={() => goToPageAndScroll("offers")}
                                    className="nav--anchor"
                                >
                                    What I Offer
                                </button>
                                <button
                                    onClick={() => goToPageAndScroll("blog")}
                                    className="nav--anchor"
                                >
                                    Blog
                                </button>
                                <button
                                    onClick={() =>
                                        goToPageAndScroll("contacts")
                                    }
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

                {!navOpen ? (
                    <FontAwesomeIcon
                        onClick={menuToggle}
                        icon={faBars}
                        size="4x"
                        className="hiddenMenuIcon"
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={menuToggle}
                        icon={faXmark}
                        size="4x"
                        className="hiddenMenuIcon"
                    />
                )}

                {auth?.admin && (
                    <button onClick={handleLogout} className="logged-in">
                        {auth.admin}
                    </button>
                )}

                {popup && <LogoutPopup />}
            </nav>
        </>
    );
}

export default NavBar;
