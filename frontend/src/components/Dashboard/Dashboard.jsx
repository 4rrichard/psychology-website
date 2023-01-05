import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const { setAuth } = useContext(AuthContext);

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

  const goToHome = () => {
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
      });
  };

  const goToNewBlog = () => {
    axios
      .get("/protected", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setAuth(response.data);
        navigate("/articles/new");
      });
  };
  const goToAppointments = () => {
    axios
      .get("/protected", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setAuth(response.data);
        navigate("/appointment");
      });
  };

  return (
    <div className="login">
      <h1 className="login--title">Welcome Gizem!</h1>

      <div className="login-nav-btns">
        <button onClick={goToHome} className="login--gohome button">
          Go to the main page!
        </button>
        <button onClick={goToNewBlog} className="login--newarticle button">
          Write a new article
        </button>
        <button
          onClick={goToAppointments}
          className="login--gotoappointments button"
        >
          Check appointments
        </button>
      </div>
      <button onClick={handleLogout} className="logout-btn button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
