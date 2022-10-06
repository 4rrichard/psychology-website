import React, { useState } from "react";
import { DateTime, Interval } from "luxon";
import { Link } from "react-router-dom";
import "./Appointment.css";
import RegContact from "./RegContact";
import { useEffect } from "react";

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
  // const nowFullDateStart = DateTime.now().toFormat("MMMM dd, yyyy");
  // const nowFullDateEnd = DateTime.now()
  //   .plus({ days: 6 })
  //   .toFormat("MMMM dd, yyyy");

  //--- localstorage data delete ---
  // localStorage.clear();

  const [display, setDisplay] = useState(true);
  const [displayNextWeek, setDisplayNextWeek] = useState(false);

  const [incrementStart, setIncrementStart] = useState(0);
  const [incrementEnd, setIncrementEnd] = useState(6);

  //rename usestate
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);

  const [disableDate, setDisableDate] = useState(() =>
    JSON.parse(localStorage.getItem("bookedTime") ?? "[]")
  );

  const [sendFullDate, setSendFullDate] = useState("");

  const handleClick = (e) => {
    const selectHour = e.target.innerText;
    const selectMonth =
      e.target.parentNode.firstElementChild.nextElementSibling.innerText;
    const selectDate =
      e.target.parentNode.firstElementChild.nextElementSibling
        .nextElementSibling.innerText;
    const selectYear = e.target.parentNode.firstElementChild.innerText;

    setDisplay(false);
    setSendFullDate({
      hour: selectHour,
      date: selectDate,
      month: selectMonth,
      year: selectYear,
    });
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
    setIncrementStart((prevState) => prevState - 7);
    setIncrementEnd((prevState) => prevState - 7);
    setDisplayNextWeek(true);
  };

  // const now = DateTime.now();
  // const nowDate = DateTime.now().toFormat("dd");

  // const nowHour = DateTime.now().c.hour;
  // const yesterday = DateTime.now().plus({ day: -1 });
  // const tomorrowHour = DateTime.now().plus({ day: 1 }).c.hour;
  // const tomorrowDate = DateTime.now().plus({ day: 1 }).c.day;
  // const nowHourFormatted = DateTime.now()
  //   .plus({ hour: 1 })
  //   .toLocaleString(DateTime.TIME_SIMPLE);

  const nowMonth = DateTime.now().setLocale("en").monthLong;

  const startOfWeek = DateTime.now({ locale: "en" });
  const endOfWeek = DateTime.now().plus({ days: 6 });

  const startOfNextWeek = DateTime.now().plus({ days: incrementStart });
  const endOfNextWeek = DateTime.now().plus({ days: incrementEnd });
  const nextMonth = DateTime.now().setLocale("en").plus({ month: 1 }).monthLong;

  const fullDateStart = startOfNextWeek.toFormat("MMMM dd, yyyy");
  const fullDateEnd = endOfNextWeek.toFormat("MMMM dd, yyyy");

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

  //--- Disable previous button ---
  useEffect(() => {
    const arrayFirst = [];
    arrayFirst.push(
      "" +
        String(startOfNextWeek.c.year) +
        String(startOfNextWeek.c.month).padStart(2, "0") +
        String(startOfNextWeek.c.day).padStart(2, "0")
    );
    const arraySecond = [];
    arraySecond.push(
      "" +
        String(startOfWeek.c.year) +
        String(startOfWeek.c.month).padStart(2, "0") +
        String(startOfWeek.c.day).padStart(2, "0")
    );

    if (parseInt(arrayFirst[0]) > parseInt(arraySecond[0])) {
      setIsPreviousDisabled(false);
    } else {
      setIsPreviousDisabled(true);
    }
  }, [
    startOfNextWeek.c.year,
    startOfNextWeek.c.month,
    startOfNextWeek.c.day,
    startOfWeek.c.year,
    startOfWeek.c.day,
    startOfWeek.c.month,
  ]);

  //--- Saving state after refresh  ---

  // useEffect(() => {
  //   const data = window.localStorage.getItem("bookedTime");
  //   setDisableDate(JSON.parse(data));
  // }, []);

  useEffect(() => {
    window.localStorage.setItem("bookedTime", JSON.stringify(disableDate));
  }, [disableDate]);

  const daysOfSept = dateArray.map((dates) => dates.c).map((date) => date.day);

  const dateArrayNextWeek = Array.from(days(intervalNextWeek));

  const yearNext = dateArrayNextWeek
    .map((year) => year.c)
    .map((year) => year.year);

  const daysOfSeptNextWeek = dateArrayNextWeek
    .map((dates) => dates.c)
    .map((date) => date.day);

  const weekdaysOfSept = dateArray.map(
    (dates) => dates.setLocale("en").weekdayLong
  );

  const nextMonths = dateArrayNextWeek.map(
    (month) => month.setLocale("en").monthLong
  );

  const monthArray = [];
  for (let i = 0; i < 7; i++) {
    monthArray.push(nowMonth);
  }

  const hoursArr = [];
  for (let i = 10; i < 19; i++) {
    hoursArr.push(`${i}:${"00"}`);
  }

  // const wholeWeekArray = [];
  // monthArray.map((month, index) => {
  //   return wholeWeekArray.push({
  //     month: month,
  //     days: daysOfSept[index],
  //     weekdays: weekdaysOfSept[index],
  //   });
  // });

  const nextMonthArray = [];

  for (let i = 0; i < 7; i++) {
    nextMonthArray.push(nextMonth);
  }

  const wholeWeekArrayNextWeek = [];

  nextMonths.map((month, index) => {
    return wholeWeekArrayNextWeek.push({
      year: yearNext[index],
      month: month,
      days: daysOfSeptNextWeek[index],
      weekdays: weekdaysOfSept[index],
    });
  });

  //Get text of button : event.target.innerText
  // && nowHour >= hours.slice(0, 2)
  console.log(disableDate);
  function isAppointmentDisabled(hours, wholeMonth) {
    return (
      disableDate.find((value) => {
        if (
          value[0] === wholeMonth.year &&
          value[1] === wholeMonth.month &&
          value[2] === wholeMonth.days &&
          value[3] === hours
        ) {
          return true;
        } else {
          return false;
        }
      }) !== undefined
    );
  }
  return (
    <>
      {display ? (
        <section className="appointment">
          <h1 className="appointment--title">Appointment Booking</h1>
          <div className="appointment--change-week">
            <button
              onClick={handlePrevClick}
              disabled={isPreviousDisabled}
              className="prev-week-btn"
            >
              Previous Week
            </button>
            <h1 className="appointment--current-week-date">{`${fullDateStart} - ${fullDateEnd}`}</h1>
            <button onClick={handleNextClick} className="next-week-btn">
              Next Week
            </button>
          </div>
          <div className="appointment--container">
            {!displayNextWeek &&
              wholeWeekArrayNextWeek.map((wholeMonth, index) => (
                <div className="appointment--fulldate" key={index}>
                  <p className="year-no-display">{wholeMonth.year}</p>
                  <h2 className="appointment--month">{wholeMonth.month}</h2>
                  <h1 className="appointment--date">{wholeMonth.days}</h1>
                  <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
                  {hoursArr.map((hours) => (
                    <Link
                      className="appointment--hours"
                      value={10}
                      onClick={handleClick}
                      disabled={isAppointmentDisabled(hours, wholeMonth)}
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
                  <p className="year-no-display">{wholeMonth.year}</p>
                  <h2 className="appointment--month">{wholeMonth.month}</h2>

                  <h1 className="appointment--date">{wholeMonth.days}</h1>

                  <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
                  {hoursArr.map((hours) => (
                    <Link
                      className="appointment--hours"
                      onClick={handleClick}
                      disabled={isAppointmentDisabled(hours, wholeMonth)}
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
        <RegContact
          clickBack={clickBack}
          fullDate={sendFullDate}
          setDisableDate={setDisableDate}
        />
      )}
    </>
  );
}

export default Appointment;
