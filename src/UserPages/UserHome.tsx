import axios from "axios";
import React, { useState, useEffect } from "react";
import EventListItem from "../EventListItem";
import BottomRightButton from "../BottomRightButton";
import { FaCalendar } from "react-icons/fa";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import Modal from "react-modal";
import NavButton from "../NavButton";
import User from "../Interfaces/User";
import Event from "../Interfaces/Event";

interface UserHomeProps {
  user: User;
}
function UserHome({ user }: UserHomeProps) {
  const [userUpcomingEvents, setUserUpcomingEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const getUserUpcomingEvents = (id: number) => {
    axios
      .get(`http://localhost:8080/userEvents/${id}`)
      .then((data) => {
        setUserUpcomingEvents(data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUserUpcomingEvents(user.id);
  }, [user]);

  let formattedEvents = userUpcomingEvents.map((event: Event) => {
    const startDate = new Date(event.date).toISOString();

    console.log(startDate);
    return {
      title: event.name,
      start: startDate,
      allDay: false,
    };
  });

  const eventList = userUpcomingEvents.length ? (
    userUpcomingEvents.map((event: any) => {
      console.log(event);
      return (
        <EventListItem
          event={event}
          isOrg={false}
          userId={user!.id}
          getUpcomingEvents={getUserUpcomingEvents}
        />
      );
    })
  ) : (
    <div className="emptyFollowingContainer">
      <span>You have no upcoming events. Click "Discover" to add some!</span>
      <br />
      <NavButton
        customVariant="outline-dark"
        path="/user/discover"
        name="Discover"
      />
    </div>
  );
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column" as "column",
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
  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
      </>
    );
  };
  const handleEventClick = (e: any) => {
    console.log(e.event._def);
  };
  return (
    <div id="userPage">
      <h3 id="welcome">{`Welcome back, ${user!.username}!`}</h3>
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
        <div id="calendarContainer">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={formattedEvents} // alternatively, use the `events` setting to fetch from a feed
            // select={handleDateClick}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </div>
      </Modal>
    </div>
  );
}

export default UserHome;
