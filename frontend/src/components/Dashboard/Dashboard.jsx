import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./Dashboard.css";

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

  const goToNewBlog = () => {
    navigate("/articles/new");
  };
  const goToAppointments = () => {
    navigate("/appointment");
  };

  return (
    <div className="login">
      <h1 className="login--title">Welcome Gizem!</h1>

      <div className="login-nav-btns">
        <button onClick={getData} className="login--gohome button">
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
