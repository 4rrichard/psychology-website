import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./AdminPage.css";

function AdminPage() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

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
                    setErrMsg("Invalid username or password");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Login Failed");
                }
                errRef.current.focus();
            });
    };

    return (
        <div className="admin">
            <form onSubmit={handleForm} className="admin-login">
                <div
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </div>
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
                            e.target.setCustomValidity(
                                "Please fill in the field"
                            )
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
                            e.target.setCustomValidity(
                                "Please fill in the field"
                            )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                    />
                </label>
                <button className="admin-submit">Login</button>
            </form>
        </div>
    );
}

export default AdminPage;
