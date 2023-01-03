import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import "./Blog.css";

function Blog() {
  const [fullPost, setFullPost] = useState([]);

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      setFullPost(response.data);
    });
  }, []);

  return (
    <section className="blog" id="blog">
      <h1 className="blog--title">Blog</h1>
      <h2 className="blog--subtitle">
        Here you can find my articles about therapeutic interventions to cope
        with pshychological distress
      </h2>
      <div className="blog--articles">
        {fullPost.slice(-3).map((coverData, index) => (
          <Link
            to={`/articles/${coverData.title
              .toLowerCase()
              .split(" ")
              .join("-")}`}
            className="blog--article"
            key={index}
          >
            <div className="blog-img-container">
              <img src={coverData.photo} alt="blog" className="blog--image" />
            </div>
            <div className="blog-article--text">
              <h2 className="blog-article--title">{coverData.title}</h2>
              <p className="blog-article--pharagraph">{coverData.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/articles" className="all-articles-btn">
        Check all articles
      </Link>
    </section>
  );
}

export default Blog;
