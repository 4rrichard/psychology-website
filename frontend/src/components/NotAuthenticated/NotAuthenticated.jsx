import React from "react";
import { Link } from "react-router-dom";
import "./NotAuthenticated.css";

function NotAuthenticated() {
  return (
    <div className="not-authenticated">
      <h1 className="n-a--title">ERROR 403</h1>
      <h2 className="n-a--subtitle">You are not authenticated!</h2>
      <Link to="/" className="n-a--redirect">
        Go to the Main Page
      </Link>
    </div>
  );
}

export default NotAuthenticated;
