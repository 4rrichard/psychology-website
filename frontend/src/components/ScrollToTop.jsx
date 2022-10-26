import React, { useEffect, useState } from "react";
import "./ScrollToTop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="to-top">
          <FontAwesomeIcon
            icon={faSquareCaretUp}
            size="4x"
            onClick={scrollToTop}
            className="to-top-btn"
          />
          <h2 className="to-top-text">To Top</h2>
        </div>
      )}
    </>
  );
}

export default ScrollToTop;
