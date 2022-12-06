import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import Blog from "../Blog/Blog";
import ContactMe from "../ContactMe/ContactMe";
import FAQ from "../FAQ/FAQ";

import Hero from "../Hero/Hero";

import Subscribe from "../Subscribe/Subscribe";
import WhatIOffer from "../WhatIOffer/WhatIOffer";

function Home() {
  return (
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
  );
}

export default Home;
