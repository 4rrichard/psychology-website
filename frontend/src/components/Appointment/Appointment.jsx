import React, { useState } from "react";
import { DateTime, Interval } from "luxon";
import { Link } from "react-router-dom";
import "./Appointment.css";
import RegContact from "../RegContact/RegContact";
import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useRef } from "react";

function Appointment() {
  //--- HELP FOR THE CALENDAR ---

  // const nowDate = DateTime.now().toFormat("dd");

  // const nowHour = DateTime.now().c.hour;
  // const yesterday = DateTime.now().plus({ day: -1 });
  // const tomorrowHour = DateTime.now().plus({ day: 1 }).c.hour;
  // const hourss = DateTime.now().plus({ day: 1 }).plus({ hour: -1 });
  // const nowHourFormatted = DateTime.now()
  //   .plus({ hour: 1 })
  //   .toLocaleString(DateTime.TIME_SIMPLE);
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

  // const weekdays = Info.weekdays("long", { locale: "en" });
  // const nowFullDateStart = DateTime.now().toFormat("MMMM dd, yyyy");
  // const nowFullDateEnd = DateTime.now()
  //   .plus({ days: 6 })
  //   .toFormat("MMMM dd, yyyy");

  class MyDate {
    constructor(parts) {
      this.data = parts;
    }

    equalsTo(other) {
      return (
        this.data[0] === other.data[0] &&
        this.data[1] === other.data[1] &&
        this.data[2] === other.data[2] &&
        this.data[3] === other.data[3]
      );
    }

    toString() {
      return `MyDate {${this.data[0]}, ${this.data[1]}, ${this.data[2]}, ${this.data[3]}}`;
    }
  }

  class SelectedValues {
    constructor(values) {
      this.values = values;
    }

    toggle(value) {
      const index = this.values.findIndex((element) => element.equalsTo(value));

      let newSelectedValues = [];

      if (index === -1) {
        // not found
        newSelectedValues = [value, ...this.values];
      } else {
        newSelectedValues = [
          ...this.values.slice(0, index),
          ...this.values.slice(index + 1),
        ];
      }

      return new SelectedValues(newSelectedValues);
    }
  }

  // --- STATES ---

  const { auth } = useContext(AuthContext);
  const admin = auth.admin;
  const buttons = useRef(new Set([]));
  buttons.current.delete(null);

  for (const button of buttons.current.values()) {
    if (button.classList.value.includes("admin-disable")) {
      console.log(button);
    }
  }

  const [display, setDisplay] = useState(true);
  const [displayNextWeek, setDisplayNextWeek] = useState(false);

  const [incrementStart, setIncrementStart] = useState(0);
  const [incrementEnd, setIncrementEnd] = useState(6);

  const [sendFullDate, setSendFullDate] = useState("");

  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);

  const [disableDate, setDisableDate] = useState(() =>
    JSON.parse(localStorage.getItem("bookedTime") ?? "[]")
  );

  const [adminDisable, setAdminDisable] = useState(
    () => new SelectedValues([])
  );

  //--- DATA FOR THE CALENDAR ---

  const tomorrow = DateTime.now().plus({ day: 1 });

  const hoursArray = [];
  for (let i = tomorrow.c.hour; i >= 10; i--) {
    hoursArray.push(`${i}:${"00"}`);
  }

  const now = DateTime.now();

  const nowMonth = DateTime.now().setLocale("en").monthLong;
  const tomorrowMonth = DateTime.now()
    .plus({ day: 1 })
    .setLocale("en").monthLong;

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

  //--- CLICK HANDLERS ---

  const handleClickOnTime = (hours, fullDay) => {
    if (!admin) {
      setDisplay(false);
    }

    setSendFullDate({
      year: fullDay.year,
      month: fullDay.month,
      date: fullDay.days,
      hour: hours,
    });

    setAdminDisable((oldSelectedValues) =>
      oldSelectedValues.toggle(
        new MyDate([fullDay.year, fullDay.month, fullDay.days, hours])
      )
    );
  };

  const clickBack = () => {
    setDisplay(true);
  };

  const handleNextClick = () => {
    setIncrementStart(incrementStart + 7);
    setIncrementEnd(incrementEnd + 7);
    setDisplayNextWeek(true);
  };

  //--- DISABLE PREVIOUS BUTTON ---
  const handlePrevClick = () => {
    setIncrementStart((prevState) => prevState - 7);
    setIncrementEnd((prevState) => prevState - 7);
    setDisplayNextWeek(true);
  };

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

  //--- SAVING DATA IN LOCAL STORAGE  ---

  useEffect(() => {
    window.localStorage.setItem("bookedTime", JSON.stringify(disableDate));
  }, [disableDate]);

  //--- DISABLE APPOINTMENT DATES ---

  function isAppointmentDisabled(hours, wholeMonth) {
    if (
      wholeMonth.year === tomorrow.c.year &&
      wholeMonth.month === tomorrowMonth &&
      wholeMonth.days === tomorrow.c.day &&
      hours.slice(0, 2) <= hoursArray.map((hour) => parseInt(hour.slice(0, 2)))
    ) {
      return true;
    }
    if (
      wholeMonth.year === now.c.year &&
      wholeMonth.month === nowMonth &&
      wholeMonth.days === now.c.day
    ) {
      return true;
    }

    // if (document.getElementsByClassName("admin-disable") === ) {
    //   return true;
    // }

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

  const isBooked = (time, fullDay) => {
    const wholeDayArr = Array.from([
      fullDay.year,
      fullDay.month,
      fullDay.days,
      time,
    ]);

    const data = adminDisable.values.map((e) => {
      return e.data;
    });

    const checkedData = data.find((val) =>
      val.every((v, i) => v === wholeDayArr[i])
    );

    if (checkedData) {
      return true;
    } else {
      return false;
    }
  };

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
                  <h2 className="appointment--month">{wholeMonth.month}</h2>
                  <h1 className="appointment--date">{wholeMonth.days}</h1>
                  <h2 className="appointment--day">{wholeMonth.weekdays}</h2>
                  {hoursArr.map((hours, i) => (
                    <Link
                      className={`appointment--hours ${
                        isBooked(hours, wholeMonth) && "admin-disable"
                      }`}
                      ref={(element) => buttons.current.add(element)}
                      value={10}
                      onClick={() => handleClickOnTime(hours, wholeMonth)}
                      disabled={isAppointmentDisabled(hours, wholeMonth)}
                      key={i}
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
                      onClick={handleClickOnTime}
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
