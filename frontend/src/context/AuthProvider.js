import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  //useEffect() meghívni a protected routet, üres töm dependency
  const getData = () => {
    axios
      .get("/protected", {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://localhost:3000",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then((response) => {
        setAuth(response.data);
        // navigate("/");
        console.log(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
