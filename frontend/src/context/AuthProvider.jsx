import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("/protected", {
                    withCredentials: true,
                });
                setAuth(response.data);
            } catch (err) {
                if (err.response?.status === 403) {
                    console.warn("Session expired or unauthorized");
                    setAuth(null);
                }
            }
        };

        getData();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
