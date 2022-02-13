import React, { useState, useEffect } from "react";
import "react-dates/lib/css/_datepicker.css";
// import { SingleDatePicker } from "react-dates";
import DatePicker from "react-datepicker";
import AddDateButton from "./AddDateButton";
import EventListItem from "../EventListItem";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import User from "../Interfaces/User";

interface AddDatesProps {
  user: User;
  userId: number;
  isOrg: boolean;
  isLoggedIn: boolean;
}

interface FormData {
  eventName: string;
  description: string;
  eventType: string;
}
function AddDates({ user, userId, isOrg, isLoggedIn }: AddDatesProps) {
  const url = "http://localhost:8080/orgEvents";

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    description: "",
    eventType: "none",
  });

  const onChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLTextAreaElement | HTMLInputElement;
    let newFormData = { ...formData };
    newFormData[target.name as keyof FormData] = target.value;
    setFormData(newFormData);
  };

  const submitDate = () => {
    const { eventName, description, eventType } = formData;
    const payload = {
      date,
      eventName,
      description,
      eventType,
      id: user?.id,
      zip: user?.zip,
    };
    axios
      .post(url, payload)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const [orgUpcomingEvents, setOrgUpcomingEvents] = useState([]);
  const getOrgUpcomingEvents = (id: Number) => {
    axios
      .get(`http://localhost:8080/orgEvents/${id}`)
      .then((data) => {
        setOrgUpcomingEvents(data.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getOrgUpcomingEvents(user!.id);
  }, [user]);
  const handleDateChange = (input: Date) => {
    setDate(input);
  };

  const datesList = orgUpcomingEvents.map((date) => {
    return (
      <EventListItem
        event={date}
        isOrg={isOrg}
        userId={userId}
        getUpcomingEvents={getOrgUpcomingEvents}
      />
    );
  });
  return isOrg && isLoggedIn ? (
    <div id="datePickerPage">
      <div id="datePicker">
        <h2>Pick a date to add!</h2>
        <DatePicker
          showTimeSelect
          selected={date}
          onChange={handleDateChange}
        />
        <label htmlFor="name">Event Name</label>
        <input
          type="text"
          onChange={onChange}
          name="eventName"
          value={formData.eventName}
        />
        <label htmlFor="description">Event Description</label>
        <textarea
          id="eventDescription"
          name="description"
          value={formData.description}
          onChange={onChange}
        />
        <label htmlFor="description">Event Type</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={onChange}
        >
          <option value="none">None</option>
          <option value="food">Food</option>
          <option value="music">Music</option>
          <option value="music">Comedy</option>
        </select>
        <AddDateButton submitDate={submitDate} date={date} />
      </div>
      <div id="currentDatesContainer">
        <h2>Your Current Dates</h2>
        <div id="currentDatesList">{datesList}</div>
      </div>
    </div>
  ) : (
    <div>unauthorized</div>
  );
}

export default AddDates;
