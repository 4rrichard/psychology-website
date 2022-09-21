import React from "react";
import { DateTime, Info, Interval } from "luxon";
import "./Appointment.css";

function Appointment() {
  // const day = DateTime.local(2022, 9, 20, { locale: "en" }).day;
  // const weekday = DateTime.local(2022, 9, 20, { locale: "en" }).weekdayLong;
  // const year = DateTime.local(2022, 9, 20, { locale: "en" }).year;
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

  const wholeWeekArray = [];
  septArray.map((sept, index) => {
    return wholeWeekArray.push({
      month: sept,
      days: daysOfSept[index],
      weekdays: weekdays[index],
    });
  });

  console.log(wholeWeekArray);

  return (
    <>
      <h1 className="appointment--title">Appointment Booking</h1>
      <div className="appointment">
        {wholeWeekArray.map((wholeMonth) => (
          <div className="appointment--fulldate">
            <h2 className="appointment--month">{wholeMonth.month}</h2>

            <h1 className="appointment--date">{wholeMonth.days}</h1>

            <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Appointment;
