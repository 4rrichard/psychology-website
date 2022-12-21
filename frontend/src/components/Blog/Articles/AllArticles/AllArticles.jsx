import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import AuthContext from "../../../../context/AuthProvider";
import axios from "../../../../api/axios";
import "./AllArticles.css";

function AllArticles() {
  const { auth } = useContext(AuthContext);
  const [fullPost, setFullPost] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const articlesPerPage = 6;
  const pagesVisited = pageNumber * articlesPerPage;

  useEffect(() => {
    axios.get("/api/getpost").then((response) => {
      setFullPost(response.data);
    });
  }, []);

  const pageCount = Math.ceil(fullPost.length / articlesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section className="all-articles">
      <h1 className="all-articles--title">All Articles</h1>

      <div className="blog--articles">
        {fullPost
          .slice(pagesVisited, pagesVisited + articlesPerPage)
          .map((coverData, index) => (
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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        pageClassName={"pagination-page-btn"}
        pageLinkClassName={"pagination-link"}
        containerClassName={"pagination-btns"}
        previousLinkClassName={"prev-btn"}
        nextLinkClassName={"next-btn"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      />
      {auth.admin && (
        <Link to="/articles/new" className="new-article-btn">
          Create new Article
        </Link>
      )}
    </section>
  );
}

export default AllArticles;
