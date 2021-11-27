import axios from "axios";
import React from "react";

function EventListItem({ event, isOrg, userId, getUpcomingEvents }) {
  const onDelete = () => {
    const userOrg = isOrg ? "org" : "user";
    axios
      .delete(`http://localhost:8080/${userOrg}Events/${userId}/${event.id}`)
      .then(() => getUpcomingEvents(userId))
      .catch((e) => console.log(e));
  };

  return (
    <div className="eventListItem">
      <span className="eventName">{event.name}</span>
      <br />
      <span className="eventDescription">{event.description}</span>
      <br />
      <span className="eventDate">
        {new Date(Number(event.date)).toLocaleString()}
      </span>
      <button onClick={onDelete} className="removeEventButton">
        x
      </button>
    </div>
  );
}

export default EventListItem;
