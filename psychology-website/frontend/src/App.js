import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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

import "./reset.css";
import Appointment from "./components/Appointment";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (path !== "/appointment") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [path]);

  return (
    <>
      <NavBar />
      {display && (
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
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
