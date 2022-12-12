import React from "react";
import "./Booked.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import { useState } from "react";
import { useEffect } from "react";

function Booked({ toggleModal, fullBookedData, setRefresh }) {
  // console.log(modal);
  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }
  const [deletedData, setDeletedData] = useState(false);

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
    }, 5000);
  }, [deletedData]);

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
          {fullBookedData.map((fullData, i) => (
            <div className="all-booked-data" key={i}>
              <div className="date-of-booked">
                {fullData.fullDate.year} {fullData.fullDate.month}
                {fullData.fullDate.date} {fullData.fullDate.hour}
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
