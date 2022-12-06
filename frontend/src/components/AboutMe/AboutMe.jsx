import React from "react";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="about-me" name="about-me">
      <h1 className="about-me--title">About me</h1>
      <div className="about-me--main-container">
        <img
          src="\images\about-me-image.jpg"
          alt="about-me"
          className="about-me--image"
        />
        <p className="about-me--pharagraph">
          Phasellus ultricies augue sit amet dolor aliquam, a dapibus felis
          varius. Vivamus non volutpat ipsum, eget ultrices tortor. Sed vel
          viverra sapien. Proin lectus turpis, facilisis ac justo vel, ornare
          consequat ligula. Proin facilisis hendrerit diam ac commodo.
          Vestibulum fermentum rutrum libero mollis tincidunt. Ut et purus eu
          nisi pellentesque congue at sit amet arcu. Cras semper ac ante id
          rutrum. Nunc eget odio vitae justo auctor consequat. Phasellus
          ultricies augue sit amet dolor aliquam, a dapibus felis varius.
          Vivamus non volutpat ipsum, eget ultrices tortor. Sed vel viverra
          sapien. Proin lectus turpis, facilisis ac justo vel, ornare consequat
          ligula. Proin facilisis hendrerit diam ac commodo.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
