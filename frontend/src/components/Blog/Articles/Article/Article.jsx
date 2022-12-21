import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import parse from "html-react-parser";

import axios from "../../../../api/axios";
import "./Article.css";

function Article() {
  const [delta, setDelta] = useState([]);

  console.log(delta);

  const [full, setFull] = useState({});

  const { pageName } = useParams();

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      const [filtered] = response.data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").join("-") === pageName
      );

      setFull(filtered);
      setDelta(filtered.textBody.ops);
    });
  }, [pageName]);

  return (
    <div className="post">
      <h1 className="title--post">{full.title}</h1>
      <h3 className="desc--post">{full.desc}</h3>
      <img src={full.photo} alt="img" className="img--post" />
      <div className="body--post">
        {parse(new QuillDeltaToHtmlConverter(delta).convert())}
      </div>
    </div>
  );
}

export default Article;
