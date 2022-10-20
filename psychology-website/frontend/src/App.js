import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import AboutMe from "./components/AboutMe";
import Blog from "./components/Blog";
import ContactMe from "./components/ContactMe";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Subscribe from "./components/Subscribe";
import WhatIOffer from "./components/WhatIOffer";
import Appointment from "./components/Appointment";
import AdminPage from "./components/AdminPage";

import "./App.css";
import "./reset.css";
import Dashboard from "./components/Dashboard";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(true);
  const [displayPage, setDisplayPage] = useState(true);

  useEffect(() => {
    if (path !== "/appointment") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
    if (path !== "/admin" && path !== "/login") {
      setDisplayPage(true);
    } else {
      setDisplayPage(false);
    }
  }, [path]);

  return (
    <>
      {displayPage && <NavBar />}
      {display && displayPage && (
        <>
          <Hero />
          <div className="body-container">
            <AboutMe />
            <WhatIOffer />
            <Blog />
            <FAQ />
            <ContactMe />
            <Subscribe />
          </div>
        </>
      )}

      <Routes>
        <Route path="/" />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Dashboard />} />
      </Routes>
      {displayPage && (
        <>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
