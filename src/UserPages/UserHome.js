import axios from "axios";
import React, { useState, useEffect } from "react";
import EventListItem from "../EventListItem";
import BottomRightButton from "../BottomRightButton";
import { FaCalendar } from "react-icons/fa";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import Modal from "react-modal";
import NavButton from "../NavButton";
const events = [
  {
    title: "All Day Event",
    start: "2021-11-01",
  },
  {
    title: "Event",
    start: "2021-11-07",
  },
];
function UserHome({ user }) {
  const [userUpcomingEvents, setUserUpcomingEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const getUserUpcomingEvents = (id) => {
    axios
      .get(`http://localhost:8080/userEvents/${id}`)
      .then((data) => {
        console.log("fetched events: ", data);
        setUserUpcomingEvents(data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUserUpcomingEvents(user.id);
  }, [user]);
  const eventList = userUpcomingEvents.length ? (
    userUpcomingEvents.map((event) => {
      return (
        <EventListItem
          event={event.json_agg[0]}
          isOrg={false}
          userId={user.id}
          getUpcomingEvents={getUserUpcomingEvents}
        />
      );
    })
  ) : (
    <>
      <span>You have no upcoming events. Click "Discover" to add some!</span>
      <br />
      <NavButton
        customVariant="outline-dark"
        path="/user/discover"
        name="Discover"
      />
    </>
  );
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      border: "none",
      boxShadow: "1px 1px 15px rgba(0,0,0,0.3)",
      width: "90%",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  return (
    <div id="userPage">
      <h3 id="welcome">{`Welcome back, ${user.username}!`}</h3>
      <h6 id="userUpcomingEventsTitle">Your upcoming events:</h6>
      <div id="upcomingEventsContainer">{eventList}</div>
      <BottomRightButton
        onClick={() => setModalIsOpen(true)}
        icon={<FaCalendar />}
      />
      <Modal
        id="calendarModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <FullCalendar
          id="eventCalendar"
          header={{
            left: "title",
            center: "prev,next today myCustomButton",
            right: "month,basicWeek",
          }}
          defaultDate={new Date()}
          navLinks={true} // can click day/week names to navigate views
          eventLimit={true} // allow "more" link when too many events
          events={events}
        />{" "}
      </Modal>
    </div>
  );
}

export default UserHome;
