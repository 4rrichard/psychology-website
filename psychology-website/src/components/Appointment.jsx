import React, { useState } from "react";
import { DateTime, Info, Interval } from "luxon";
import { Link, Route, Routes } from "react-router-dom";
import "./Appointment.css";
import RegContact from "./RegContact";

function Appointment() {
  // const day = DateTime.local(2022, 9, 20, { locale: "en" }).day;
  // const weekday = DateTime.local(2022, 9, 20, { locale: "en" }).weekdayLong;
  // const year = DateTime.local(2022, 9, 20, { locale: "en" }).year;

  const now = DateTime.now().toFormat("dd");
  const nowHour = DateTime.now().c.hour;
  const dateLimit = DateTime.now().plus({ days: 1 }).toFormat("dd");

  const month = DateTime.local(2022, 9, 20, { locale: "en" }).monthLong;

  const start = DateTime.local(2022, 9, 19, { locale: "en" });
  const end = DateTime.local(2022, 9, 26, { locale: "en" });

  const interval = Interval.fromDateTimes(start, end);

  function* days(interval) {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const dateArray = Array.from(days(interval));

  const weekdays = Info.weekdays("long", { locale: "en" });

  const daysOfSept = dateArray.map((dates) => dates.c).map((date) => date.day);

  const septArray = [];
  for (let i = 0; i < 7; i++) {
    septArray.push(month);
  }

  const hoursArr = [];
  for (let i = 10; i < 19; i++) {
    hoursArr.push(`${i}:${"00"}`);
  }

  const wholeWeekArray = [];
  septArray.map((sept, index) => {
    return wholeWeekArray.push({
      month: sept,
      days: daysOfSept[index],
      weekdays: weekdays[index],
    });
  });

  // && nowHour >= hours.slice(0, 2)
  return (
    <section className="appointment">
      <h1 className="appointment--title">Appointment Booking</h1>
      <div className="appointment--container">
        {wholeWeekArray.map((wholeMonth) => (
          <div className="appointment--fulldate">
            <h2 className="appointment--month">{wholeMonth.month}</h2>

            <h1 className="appointment--date">{wholeMonth.days}</h1>

            <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
            {hoursArr.map((hours) => (
              <Link
                to="/contact"
                className="appointment--hours"
                disabled={now >= wholeMonth.days}
              >
                {hours}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Routes>
        <Route path="/contact" element={<RegContact />} />
      </Routes>
    </section>
  );
}

export default Appointment;
