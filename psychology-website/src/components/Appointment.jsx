import React from "react";
import { DateTime, Info, Interval } from "luxon";
import "./Appointment.css";

function Appointment() {
  const day = DateTime.local(2022, 9, 20, { locale: "en" }).day;

  const weekdays = Info.weekdays("long", { locale: "en" });

  const weekday = DateTime.local(2022, 9, 20, { locale: "en" }).weekdayLong;
  const month = DateTime.local(2022, 9, 20, { locale: "en" }).monthLong;
  const year = DateTime.local(2022, 9, 20, { locale: "en" }).year;

  const start = DateTime.local(2022, 9, 18, { locale: "en" });
  const end = DateTime.local(2022, 9, 25, { locale: "en" });

  const interval = Interval.fromDateTimes(start, end);

  function* days(interval) {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const dateArray = Array.from(days(interval));
  const daysOfSept = dateArray.map((dates) => dates.c).map((date) => date.day);

  const septArray = [];
  for (let i = 0; i < 7; i++) {
    septArray.push(month);
  }

  return (
    <>
      <h1 className="appointment-title">Appointment Booking</h1>
      <div className="appointment">
        <div className="appointment--fulldate">
          {septArray.map((sept) => (
            <h2 className="appointment-month">{sept}</h2>
          ))}

          {daysOfSept.map((days) => (
            <h1 className="appointment-date">{days}</h1>
          ))}
          {weekdays.map((weekday) => (
            <h2 className="appointment-day">{weekday}</h2>
          ))}
        </div>
      </div>
    </>
  );
}

export default Appointment;
