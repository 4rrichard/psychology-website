import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Appointment from "./components/Appointment/Appointment";
import AdminPage from "./components/AdminPage/AdminPage";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "./reset.css";
import AuthContext from "./context/AuthProvider";
import NotAuthenticated from "./components/NotAuthenticated/NotAuthenticated";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const { auth } = useContext(AuthContext);
  const [display, setDisplay] = useState(true);
  const [displayPage, setDisplayPage] = useState(true);

  useEffect(() => {
    if (path !== "/appointment") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
    if (path !== "/admin" && path !== "/login") {
      setDisplayPage(true);
    } else {
      setDisplayPage(false);
    }
  }, [path]);

  return (
    <>
      {displayPage && <NavBar />}
      {display && displayPage && (
        <>
          <Home />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route
          path="/login"
          element={auth.user ? <Dashboard /> : <NotAuthenticated />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {displayPage && (
        <>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
