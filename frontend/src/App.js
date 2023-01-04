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
import AllArticles from "./components/Blog/Articles/AllArticles/AllArticles";
import NewArticle from "./components/Blog/Articles/NewArticle/NewArticle";
import Article from "./components/Blog/Articles/Article/Article";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const { auth } = useContext(AuthContext);
  const [displayPage, setDisplayPage] = useState(true);

  useEffect(() => {
    if (path !== "/admin" && path !== "/login") {
      setDisplayPage(true);
    } else {
      setDisplayPage(false);
    }
  }, [path]);

  return (
    <>
      {displayPage && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route
          path="/articles/new"
          element={auth.admin ? <NewArticle /> : <NotAuthenticated />}
        />
        <Route path="/articles/:pageName" element={<Article />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<Dashboard />} />
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
