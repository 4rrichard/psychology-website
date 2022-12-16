import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import parse from "html-react-parser";

import AuthContext from "../../../../context/AuthProvider";
import "./AllArticles.css";
import axios from "../../../../api/axios";

function AllArticles() {
  const { auth } = useContext(AuthContext);
  const [delta, setDelta] = useState([]);
  const [fullPost, setFullPost] = useState([]);

  console.log(fullPost);

  const deltaOps = delta;

  const cfg = {};

  const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

  const html = converter.convert();

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      setDelta(response.data[0].textBody.ops);
      setFullPost(response.data);
    });
  }, []);

  return (
    <section className="all-articles">
      <h1 className="all-articles--title">All Articles</h1>
      <div className="converted-view">{parse(html)}</div>
      <div className="blog--articles">
        {fullPost.map((coverData, index) => (
          <div className="blog--article" key={index}>
            <img
              src="\images\blog-image.jpg"
              alt="blog"
              className="blog--image"
            />
            <h2 className="blog-article--title">{coverData.title}</h2>
            <p className="blog-article--pharagraph">{coverData.desc}</p>
          </div>
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
