import React from "react";
import "./Blog.css";
import axios from "../../api/axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [title, setTitle] = useState();

  axios.get(`/${title}`).then((response) => {
    console.log(response.data);
  });

  console.log(title);

  const sendTitle = (e) => {
    const titleSelect = e.target.parentNode.children[1].innerHTML;
    setTitle(titleSelect.toLowerCase());
  };

  return (
    <section className="blog" id="blog">
      <h1 className="blog--title">Blog</h1>
      <h2 className="blog--subtitle">
        Here you can find my articles about therapeutic interventions to cope
        with pshychological distress
      </h2>
      <div className="blog--articles">
        <div className="blog--article" onClick={sendTitle}>
          <img
            src="\images\blog-image.jpg"
            alt="blog"
            className="blog--image"
          />
          <h2 className="blog-article--title">CBT</h2>
          <p className="blog-article--pharagraph">
            Phasellus ultricies augue sit amet dolor aliquam, a dapibus felis
            varius.
          </p>
        </div>
        <div className="blog--article">
          <img
            src="\images\blog-image.jpg"
            alt="blog"
            className="blog--image"
          />
          <h2 className="blog-article--title">Cinematherapy</h2>
          <p className="blog-article--pharagraph">
            Phasellus ultricies augue sit amet dolor aliquam, a dapibus felis
            varius.
          </p>
        </div>
        <div className="blog--article">
          <img
            src="\images\blog-image.jpg"
            alt="blog"
            className="blog--image"
          />
          <h2 className="blog-article--title">Open dialogue</h2>
          <p className="blog-article--pharagraph">
            Phasellus ultricies augue sit amet dolor aliquam, a dapibus felis
            varius.
          </p>
        </div>
      </div>
      <Link to="/articles" className="all-articles-btn">
        Check all articles
      </Link>
    </section>
  );
}

export default Blog;
