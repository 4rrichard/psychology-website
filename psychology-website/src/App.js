import "./App.css";
import AboutMe from "./components/AboutMe";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
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
      </div>
    </>
  );
}

export default App;
