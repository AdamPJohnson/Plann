import axios from "axios";
import React, { useState, useEffect } from "react";
import EventListItem from "./EventListItem";
import BottomRightButton from "./BottomRightButton";

import { FaCalendar } from "react-icons/fa";
function UserHome({ user }) {
  const [userUpcomingEvents, setUserUpcomingEvents] = useState([]);
  const getUserUpcomingEvents = (id) => {
    axios
      .get(`http://localhost:8080/events/${id}`)
      .then((data) => {
        console.log("fetched events: ", data);
        setUserUpcomingEvents(data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUserUpcomingEvents(user.id);
  }, [user]);
  const eventList = userUpcomingEvents.length
    ? userUpcomingEvents.map((event) => {
        return <EventListItem event={event.json_agg[0]} />;
      })
    : 'You have no upcoming events. Click "Discover" to add some!';

  return (
    <div id="userPage">
      <h3 id="welcome">{`Welcome back, ${user.username}!`}</h3>
      <h6 id="userUpcomingEventsTitle">Your upcoming events:</h6>
      <div id="userUpcomingEventsContainer">{eventList}</div>
      <BottomRightButton icon={<FaCalendar />} />
    </div>
  );
}

export default UserHome;
