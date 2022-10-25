import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  //useEffect() meghívni a protected routet, üres töm dependency
  const getData = () => {
    axios
      .get("http://localhost:8081/protected", {
        headers: { "Content-Type": "application/json" },
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
