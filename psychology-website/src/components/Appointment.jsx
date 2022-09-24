import React, { useState } from "react";
import { DateTime, Interval } from "luxon";
import { Link } from "react-router-dom";
import "./Appointment.css";
import RegContact from "./RegContact";

function Appointment() {
  // const day = DateTime.local(2022, 9, 20, { locale: "en" }).day;
  // const weekday = DateTime.local(2022, 9, 20, { locale: "en" }).weekdayLong;
  // const year = DateTime.local(2022, 9, 20, { locale: "en" }).year;
  // const currentWeekday = DateTime.now().setLocale("en").weekdayLong;
  // const currentWeekdayPlusSeven = DateTime.now()
  //   .setLocale("en")
  //   .plus({ days: 6 }).weekdayLong;
  // const dateLimit = DateTime.now().plus({ days: 1 }).toFormat("dd");
  // const start = DateTime.local(2022, 9, 19, { locale: "en" });
  // const end = DateTime.local(2022, 9, 26, { locale: "en" });

  // console.log(dateArray[0].setLocale("en").weekdayLong);

  // const weekdays = Info.weekdays("long", { locale: "en" });

  const [display, setDisplay] = useState(true);
  const [displayNextWeek, setDisplayNextWeek] = useState(false);
  const [displayPrevWeek, setDisplayPrevWeek] = useState(false);
  const [incrementStart, setIncrementStart] = useState(0);
  const [incrementEnd, setIncrementEnd] = useState(9);

  const handleClick = () => {
    setDisplay(false);
  };

  const clickBack = () => {
    setDisplay(true);
  };

  const handleNextClick = () => {
    setIncrementStart(incrementStart + 7);
    setIncrementEnd(incrementEnd + 7);
    setDisplayNextWeek(true);
  };
  const handlePrevClick = () => {
    setDisplayPrevWeek(true);
  };

  const nowFullDateStart = DateTime.now().toFormat("MMMM dd, yyyy");
  const nowFullDateEnd = DateTime.now()
    .plus({ days: 6 })
    .toFormat("MMMM dd, yyyy");

  const nowHour = DateTime.now().c.hour;
  const nowDate = DateTime.now().toFormat("dd");
  const nowMonth = DateTime.now().setLocale("en").monthLong;

  const startOfWeek = DateTime.now({ locale: "en" });
  const endOfWeek = DateTime.now().plus({ days: 7 });

  const startOfNextWeek = DateTime.now().plus({ days: incrementStart });
  const endOfNextWeek = DateTime.now().plus({ days: incrementEnd });
  const nextMonth = DateTime.now().setLocale("en").plus({ month: 1 }).monthLong;
  const startOfMonth = DateTime.now().setLocale("en").startOf("month");

  console.log(startOfMonth);

  // console.log(DateTime.now().setLocale("en").plus({ days: 50 }).monthLong);

  const interval = Interval.fromDateTimes(startOfWeek, endOfWeek);

  const intervalNextWeek = Interval.fromDateTimes(
    startOfNextWeek,
    endOfNextWeek
  );

  function* days(interval) {
    let cursor = interval.start.startOf("day");

    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const dateArray = Array.from(days(interval));

  const daysOfSept = dateArray.map((dates) => dates.c).map((date) => date.day);

  const dateArrayNextWeek = Array.from(days(intervalNextWeek));

  const daysOfSeptNextWeek = dateArrayNextWeek
    .map((dates) => dates.c)
    .map((date) => date.day);

  const weekdaysOfSept = dateArray.map(
    (dates) => dates.setLocale("en").weekdayLong
  );

  const monthArray = [];
  for (let i = 0; i < 7; i++) {
    monthArray.push(nowMonth);
  }

  const hoursArr = [];
  for (let i = 10; i < 19; i++) {
    hoursArr.push(`${i}:${"00"}`);
  }

  const wholeWeekArray = [];
  monthArray.map((month, index) => {
    return wholeWeekArray.push({
      month: month,
      days: daysOfSept[index],
      weekdays: weekdaysOfSept[index],
    });
  });

  const nextMonthArray = [];

  for (let i = 0; i < 7; i++) {
    nextMonthArray.push(nextMonth);
  }

  const wholeWeekArrayNextWeek = [];

  nextMonthArray.map((month, index) => {
    return wholeWeekArrayNextWeek.push({
      month: month,
      days: daysOfSeptNextWeek[index],
      weekdays: weekdaysOfSept[index],
    });
  });

  // && nowHour >= hours.slice(0, 2)
  return (
    <>
      {display ? (
        <section className="appointment">
          <h1 className="appointment--title">Appointment Booking</h1>
          <div className="appointment--change-week">
            <button className="prev-week-btn">Previous Week</button>
            <h1 className="appointment--current-week-date">{`${nowFullDateStart} - ${nowFullDateEnd}`}</h1>
            <button onClick={handleNextClick} className="next-week-btn">
              Next Week
            </button>
          </div>
          <div className="appointment--container">
            {!displayNextWeek &&
              wholeWeekArray.map((wholeMonth, index) => (
                <div className="appointment--fulldate" key={index}>
                  <h2 className="appointment--month">{wholeMonth.month}</h2>

                  <h1 className="appointment--date">{wholeMonth.days}</h1>

                  <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
                  {hoursArr.map((hours) => (
                    <Link
                      className="appointment--hours"
                      onClick={handleClick}
                      disabled={nowDate >= wholeMonth.days}
                      key={hours}
                    >
                      {hours}
                    </Link>
                  ))}
                </div>
              ))}
            {displayNextWeek &&
              wholeWeekArrayNextWeek.map((wholeMonth, index) => (
                <div className="appointment--fulldate" key={index}>
                  <h2 className="appointment--month">{wholeMonth.month}</h2>

                  <h1 className="appointment--date">{wholeMonth.days}</h1>

                  <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
                  {hoursArr.map((hours) => (
                    <Link
                      className="appointment--hours"
                      onClick={handleClick}
                      disabled={nowDate >= wholeMonth.days}
                      key={hours}
                    >
                      {hours}
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        </section>
      ) : (
        <RegContact clickBack={clickBack} />
      )}
    </>
  );
}

export default Appointment;
