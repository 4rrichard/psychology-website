import React from "react";
import "./Booked.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Info } from "luxon";

function Booked({ toggleModal, fullBookedData, setRefresh, now, yesterday }) {
  // console.log(modal);
  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }

  // console.log(fullBookedData);

  const allMonths = Info.months("long", { locale: "en" });

  // const todayYear = now.c.year;
  // const todayMonth = now.setLocale("en").monthLong;

  // const todayDay = now.c.day;

  const [deletedData, setDeletedData] = useState(false);
  const [showDates, setShowDates] = useState([]);

  const removeDate = (fullData) => {
    axios
      .post("/api/removedata", {
        fullDate: fullData.fullDate,
      })
      .then((response) => {
        console.log(response.data);
        setDeletedData(true);
        setRefresh((prev) => !prev);
      });
  };

  useEffect(() => {
    setTimeout(function () {
      setDeletedData(false);
    }, 3000);
  }, [deletedData]);

  useEffect(() => {
    const array = [];
    setShowDates(array);
    fullBookedData.map((date) => {
      const first =
        "" +
        String(date.fullDate.year) +
        String(allMonths.indexOf(date.fullDate.month) + 1).padStart(2, "0") +
        String(date.fullDate.date).padStart(2, "0");
      const second =
        "" +
        String(now.c.year) +
        String(now.c.month).padStart(2, "0") +
        String(now.c.day).padStart(2, "0");

      if (first >= second) {
        array.push(date);
      }
    });
  }, []);

  return (
    <div className="booked-appointments-container">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="booked-appointments">
        <FontAwesomeIcon
          onClick={toggleModal}
          icon={faXmark}
          size="2x"
          className="close-modal"
        />

        <h1 className="booked-appointments--title">Booked Appointments</h1>
        <div className="booked-appointments--data-container">
          {showDates.map((fullData, i) => (
            <div className="all-booked-data" key={i}>
              <div className="date-of-booked">
                {`
                ${fullData.fullDate.year} ${fullData.fullDate.month}
                ${fullData.fullDate.date} ${fullData.fullDate.hour}`}
              </div>
              <div className="name-of-booked">{fullData.name}</div>
              <button
                className="delete-appointment"
                onClick={() => removeDate(fullData)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {deletedData && <div className="deleted-msg">Successfully deleted</div>}
      </div>
    </div>
  );
}

export default Booked;
