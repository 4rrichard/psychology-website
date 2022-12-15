import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";

function AllArticles() {
  const { auth } = useContext(AuthContext);

  return (
    <section className="all-articles">
      <h1 className="all-articles--title">All Articles</h1>
      {auth.admin && (
        <Link to="/articles/new" className="new-article-btn">
          Create new Article
        </Link>
      )}
    </section>
  );
}

export default AllArticles;
