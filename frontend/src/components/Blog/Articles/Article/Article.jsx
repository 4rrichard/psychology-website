import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import parse from "html-react-parser";

import axios from "../../../../api/axios";

function Article() {
  const [delta, setDelta] = useState(null);

  const { pageName } = useParams();

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      const [filtered] = response.data.filter(
        (element) =>
          element.title.toLowerCase().split(" ").join("-") === pageName
      );
      setDelta(filtered.textBody.ops);
    });
  }, [pageName]);

  return (
    <div>
      <div className="all-delta-container">
        <div className="converted-view">
          {parse(new QuillDeltaToHtmlConverter(delta).convert())}
        </div>
      </div>
    </div>
  );
}

export default Article;
