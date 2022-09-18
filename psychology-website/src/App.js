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

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <div className="body-container">
        <AboutMe />
        <WhatIOffer />
        <Blog />
        <FAQ />
        <ContactMe />
        <Subscribe />
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
