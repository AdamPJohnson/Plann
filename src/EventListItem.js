import React from "react";

function EventListItem({ event }) {
  return (
    <div className="eventListItem">
      <span className="eventName">{event.name}</span>
      <br />
      <span className="eventDate">{new Date(event.date).toString()}</span>
    </div>
  );
}

export default EventListItem;
