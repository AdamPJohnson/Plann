import React, { useState } from "react";
import EventListItem from "./EventListItem";
function UserHome({ user }) {
  const [userUpcomingEvents, setUserUpcomingEvents] = useState([
    {
      date: "Thu Nov 11 2021 17:56:48 GMT-0800 (Pacific Standard Time)",
      eventName: "JellyRoll Party",
    },
    {
      date: "Thu Nov 11 2021 17:56:48 GMT-0800 (Pacific Standard Time)",
      eventName: "JellyRoll Party",
    },
    {
      date: "Thu Nov 11 2021 17:56:48 GMT-0800 (Pacific Standard Time)",
      eventName: "JellyRoll Party",
    },
  ]);
  const eventList = userUpcomingEvents.map((date) => {
    return <EventListItem event={date} />;
  });

  return (
    <div id="userHome">
      <h3 id="welcome">{`Welcome back, ${user.name}!`}</h3>
      <h6 id="userUpcomingEventsTitle">Your upcoming events:</h6>
      <div id="userUpcomingEventsContainer">{eventList}</div>
    </div>
  );
}

export default UserHome;
