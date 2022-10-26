import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./AdminPage.css";

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

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:8081/refresh", {
  //       token: auth.refreshToken,
  //     });
  //     setAuth({
  //       ...auth,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // axios.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(auth.accessToken);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers["authorization"] = "Bearer" + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  // console.log(jwt_decode(auth.accessToken));
  // const decodedToken = jwt_decode(auth.accessToken);
  // console.log(decodedToken.admin);
  // console.log(auth.user);

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
      .post("/auth", JSON.stringify({ user, pwd }), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const accessToken = response?.data.accessToken;

        setUser("");
        setPwd("");
        setAuth({ user, accessToken });
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
