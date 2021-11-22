import React from "react";

function DateListItem({ date }) {
  return (
    <div className="dateListItem">
      <span className="eventName">{date.eventName}</span>
      <br />
      <span className="eventDate">{date.date}</span>
    </div>
  );
}

export default DateListItem;
