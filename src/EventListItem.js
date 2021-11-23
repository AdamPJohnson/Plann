import React from "react";

function EventListItem({ event }) {
  return (
    <div className="eventListItem">
      <span className="eventName">{event.eventName}</span>
      <br />
      <span className="eventDate">{event.date}</span>
    </div>
  );
}

export default EventListItem;
