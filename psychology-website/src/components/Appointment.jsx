import React from "react";
import { DateTime } from "luxon";

function Appointment() {
  const month = DateTime.now().toFormat("MMMM");
  const day = DateTime.now().toFormat("dd");

  return (
    <>
      <h1 className="appointment-title">Appointment Booking</h1>
      <div className="appointment">
        <div className="appointment--fulldate">
          <h2 className="appointment-month">{month}</h2>
          <h1 className="appointment-date">{day}</h1>
          <h2 className="appointment-day">Tuesday</h2>
        </div>
      </div>
    </>
  );
}

export default Appointment;
