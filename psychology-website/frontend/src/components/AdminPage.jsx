import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import "./AdminPage.css";
import Dashboard from "./Dashboard";

function AdminPage() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  // const [loginData, setLoginData] = useState({
  //   username: "",
  //   password: "",
  // });
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // const handleChange = (event) => {
  //   setLoginData({ ...loginData, [event.target.name]: event.target.value });
  // };

  // const refreshToken = axios.post("/refresh", {token: })

  const handleForm = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/auth", JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const accessToken = response?.data.accessToken;

        setUser("");
        setPwd("");
        setAuth({ user, pwd, accessToken });
        navigate("/login");
      })

      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing UserName or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });

    // if (
    //   loginData.username === REACT_APP_USERNAME &&
    //   loginData.password === REACT_APP_PASSWORD
    // ) {
    //   console.log("Hello admin!");
    //   navigate("/");
    // } else {
    //   console.log("You are not admin");
    // }
    // setLoginData({ username: "", password: "" });
  };

  return (
    <div className="admin">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleForm} className="admin-login">
        <label className="username-label">
          Username
          <input
            type="text"
            name="username"
            className="admin-username"
            ref={userRef}
            autoComplete="off"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onInvalid={(e) =>
              e.target.setCustomValidity("Please fill in the field")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
        </label>
        <label className="password-label">
          Password
          <input
            type="password"
            name="password"
            className="admin-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onInvalid={(e) =>
              e.target.setCustomValidity("Please fill in the field")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
        </label>
        <button className="admin-submit">Login</button>
      </form>
      <Routes>
        <Route path="/login" />
      </Routes>
    </div>
  );
}

export default AdminPage;
