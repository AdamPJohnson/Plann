import React, { useState, useEffect } from "react";
import EventListItem from "../EventListItem";
import axios from "axios";
function OrgHome({ user }) {
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

  const eventList = orgUpcomingEvents.length
    ? orgUpcomingEvents.map((event) => {
        return (
          <EventListItem
            event={event}
            isOrg={true}
            userId={user.id}
            getUpcomingEvents={getOrgUpcomingEvents}
          />
        );
      })
    : 'You have no upcoming events. Click "Add Dates" to add some!';
  console.log(user);
  return (
    <div id="userPage">
      <h3 id="welcome">{`Welcome back, ${user.username}!`}</h3>
      <h6 id="userUpcomingEventsTitle">Your upcoming events:</h6>
      <div id="userUpcomingEventsContainer">{eventList}</div>
    </div>
  );
}

export default OrgHome;
