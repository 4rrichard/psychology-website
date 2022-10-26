import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .get("/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/admin");
        setAuth({});
      });
  };

  const getData = () => {
    axios
      .get("/protected", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setAuth(response.data);
        navigate("/");
        console.log(response.data);
      });
  };

  return (
    <div className="login">
      <h1>Welcome {auth.user}!</h1>
      <button onClick={getData} className="login--gohome">
        Go to the main page!
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
