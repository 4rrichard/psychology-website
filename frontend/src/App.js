import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import AboutMe from "./components/AboutMe/AboutMe";
import Blog from "./components/Blog/Blog";
import ContactMe from "./components/ContactMe/ContactMe";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Subscribe from "./components/Subscribe/Subscribe";
import WhatIOffer from "./components/WhatIOffer/WhatIOffer";
import Appointment from "./components/Appointment/Appointment";
import AdminPage from "./components/AdminPage/AdminPage";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "./reset.css";

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
