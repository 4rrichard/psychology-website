import React from "react";
import { useState } from "react";
import "./AdminPage.css";
import { Routes, Route, useNavigate } from "react-router-dom";

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;

console.log(REACT_APP_USERNAME, REACT_APP_PASSWORD);

function AdminPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleForm = (event) => {
    event.preventDefault();
    if (
      loginData.username === REACT_APP_USERNAME &&
      loginData.password === REACT_APP_PASSWORD
    ) {
      console.log("Hello admin!");
      navigate("/");
    } else {
      console.log("You are not admin");
    }
    setLoginData({ username: "", password: "" });
  };

  return (
    <div className="admin">
      <form onSubmit={handleForm} className="admin-login">
        <label className="username-label">
          Username
          <input
            type="text"
            name="username"
            className="admin-username"
            value={loginData.username}
            onChange={handleChange}
          />
        </label>
        <label className="password-label">
          Password
          <input
            type="password"
            name="password"
            className="admin-password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <button className="admin-submit">Login</button>
      </form>
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default AdminPage;
