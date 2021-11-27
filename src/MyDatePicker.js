import React, { useState, useEffect } from "react";
import "react-dates/lib/css/_datepicker.css";
// import { SingleDatePicker } from "react-dates";
import DatePicker from "react-datepicker";
import AddDateButton from "./AddDateButton";
import EventListItem from "./EventListItem";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function MyDatePicker({ user }) {
  const url = "http://localhost:8080/orgEvents";

  const [date, setDate] = useState(new Date());
  const submitDate = () => {
    const payload = { date, ...user };
    axios
      .post(url, payload)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const [orgUpcomingEvents, setOrgUpcomingEvents] = useState([]);
  const getOrgUpcomingEvents = (id) => {
    axios
      .get(`http://localhost:8080/orgEvents/${id}`)
      .then((data) => {
        console.log("fetched events: ", data);
        setOrgUpcomingEvents(data.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getOrgUpcomingEvents(user.id);
  }, [user]);
  const handleDateChange = (input) => {
    setDate(input);
  };

  const datesList = orgUpcomingEvents.map((date) => {
    return <EventListItem event={date} />;
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
