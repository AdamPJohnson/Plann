import React, { useState } from "react";
import useDatePicker from "./useDatePicker";
import "react-dates/lib/css/_datepicker.css";
// import { SingleDatePicker } from "react-dates";
import DatePicker from "react-datepicker";
import AddDateButton from "./AddDateButton";
import DateListItem from "./DateListItem";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker() {
  const url = "http://localhost:8080/dates";
  const user = "doug";
  const [date, setDate, submitDate] = useDatePicker(url, { user });
  const [currentDates, setCurrentDates] = useState([
    {
      date: "Thu Nov 11 2021 17:56:48 GMT-0800 (Pacific Standard Time)",
      eventName: "JellyRoll Party",
    },
  ]);
  const handleDateChange = (input) => {
    console.log(input);
    setDate(input);
  };

  const datesList = currentDates.map((date) => {
    return <DateListItem date={date} />;
  });
  return (
    <div id="datePickerPage">
      <div id="datePicker">
        <h2>Pick a date to add!</h2>
        <DatePicker
          showTimeSelect
          selected={date}
          onChange={handleDateChange}
        />
        <AddDateButton submitDate={submitDate} date={date} />
      </div>
      <div id="currentDatesContainer">
        <h2>Your Current Dates</h2>
        <div id="currentDatesList">{datesList}</div>
      </div>
    </div>
  );
}

export default MyDatePicker;
