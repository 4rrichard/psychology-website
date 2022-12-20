import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../../context/AuthProvider";
import axios from "../../../../api/axios";
import "./AllArticles.css";

function AllArticles() {
  const { auth } = useContext(AuthContext);
  const [fullPost, setFullPost] = useState([]);

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      setFullPost(response.data);
    });
  }, []);

  return (
    <section className="all-articles">
      <h1 className="all-articles--title">All Articles</h1>

      <div className="blog--articles">
        {fullPost.map((coverData, index) => (
          <Link
            to={`/articles/${coverData.title
              .toLowerCase()
              .split(" ")
              .join("-")}`}
            className="blog--article"
            key={index}
          >
            <img src={coverData.photo} alt="blog" className="blog--image" />
            <h2 className="blog-article--title">{coverData.title}</h2>
            <p className="blog-article--pharagraph">{coverData.desc}</p>
          </Link>
        ))}
      </div>
      {auth.admin && (
        <Link to="/articles/new" className="new-article-btn">
          Create new Article
        </Link>
      )}
    </section>
  );
}

export default AllArticles;
