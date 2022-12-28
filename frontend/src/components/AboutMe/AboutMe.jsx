import React from "react";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="about-me" name="about-me">
      <h1 className="about-me--title">About me</h1>
      <div className="about-me--main-container">
        <img
          src="\images\Gizem-about.jpg"
          alt="about-me"
          className="about-me--image"
        />
        <p className="about-me--pharagraph">
          I am an enthusiastic, self-motivated, reliable, responsible and
          hard-working psychologist and researcher. Currently, I am a PhD
          candidate at the Eötvös Loránd University in Budapest, Hungary and my
          research topic is the post-traumatic growth of the women survivors of
          the Syrian conflict through benefitting from cinema as a therapeutic
          intervention. <br />
          <p>&nbsp;</p>
          As my research interest seems like a natural choice as a continuation
          of my passion, over the years I have also managed to dedicate my time
          to developing my counseling skills in the area of delivering
          psychological support to individuals for a change for the better. I
          have extensive experience in compassionate listening, careful and
          delicate reflection on the clients' words, and setting a professional
          yet very comfortable environment that makes the individuals accepted
          in all matters.
          <p>&nbsp;</p>
          My Cognitive Behavioral Therapy training from the Beck Institute
          helped me polish my skills as a psychologist by relying upon an
          evidence-based approach. On the journey of my career as a psychologist
          and a researcher, I am always enthusiastic to learn and undertake new
          challenges.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
