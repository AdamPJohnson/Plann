import React, { useState, useEffect } from "react";
import EventListItem from "../EventListItem";
import axios from "axios";
import NavButton from "../NavButton";

import User from "../Interfaces/User";

interface OrgHomeProps {
  user: User;
  isOrg: boolean;
  isLoggedIn: boolean;
}
function OrgHome({ user, isOrg, isLoggedIn }: OrgHomeProps) {
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

  const eventList = orgUpcomingEvents.length ? (
    orgUpcomingEvents.map((event) => {
      return (
        <EventListItem
          event={event}
          isOrg={true}
          userId={user!.id}
          getUpcomingEvents={getOrgUpcomingEvents}
        />
      );
    })
  ) : (
    <div className="emptyFollowingContainer">
      <span>You have no upcoming events. Click "Add Dates" to add some!</span>
      <br />
      <NavButton
        customVariant="outline-dark"
        path="/org/addDates"
        name="Add Dates"
      />
    </div>
  );

  return isOrg && isLoggedIn ? (
    <div id="userPage">
      <h3 id="welcome">{`Welcome back, ${user!.username}!`}</h3>
      <h6 id="userUpcomingEventsTitle">Your upcoming events:</h6>
      <div id="upcomingEventsContainer">{eventList}</div>
    </div>
  ) : (
    <div>unauthorized</div>
  );
}

export default OrgHome;
