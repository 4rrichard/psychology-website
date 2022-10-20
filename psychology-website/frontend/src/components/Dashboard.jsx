import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Dashboard() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="login">
      <h1>Welcome {auth.user}!</h1>
      <Link to="/" className="login--gohome">
        Go to the main page!
      </Link>
    </div>
  );
}

export default Dashboard;
