import React, { useState } from "react";
import useDatePicker from "./useDatePicker";
import "react-dates/lib/css/_datepicker.css";
// import { SingleDatePicker } from "react-dates";
import DatePicker from "react-datepicker";
import AddDateButton from "./AddDateButton";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker() {
  const url = "http://localhost:8080/dates";
  const user = "doug";
  const [date, setDate, submitDate] = useDatePicker(url, { user });
  const handleDateChange = (input) => {
    console.log(input);
    setDate(input);
  };

  return (
    <div>
      <h2>Pick a date to add!</h2>
      <DatePicker showTimeSelect selected={date} onChange={handleDateChange} />
      <AddDateButton submitDate={submitDate} date={date} />
    </div>
  );
}

export default MyDatePicker;
