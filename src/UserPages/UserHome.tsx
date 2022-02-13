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
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
interface UserHomeProps {
  user: User;
  isLoggedIn: boolean;
  isOrg: boolean;
}
interface EventInfo {
  timeText: string;
  event: {
    title: string;
  };
}

function UserHome({ user, isOrg, isLoggedIn }: UserHomeProps) {
  const [userUpcomingEvents, setUserUpcomingEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState({
    title: "",
    description: "",
  });
  const [overlayTarget, setOverlayTarget] = useState(null);

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

    return {
      title: event.name,
      start: startDate,
      allDay: false,
    };
  });

  const eventList = userUpcomingEvents.length ? (
    userUpcomingEvents.map((event: Event) => {
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
      width: "90%",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };
  const renderEventContent = (eventInfo: EventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
      </>
    );
  };
  const handleEventClick = (e: any) => {
    /// type not available for FullCalendar event click
    console.log(e);
    const eventDetails: Event = userUpcomingEvents.find(
      (event: Event) => event.name === e.event._def.title
    )!;
    setOverlayTarget(e.el);
    setOverlayText({
      title: eventDetails.name,
      description: eventDetails.description,
    });
    setShowOverlay(!showOverlay);
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  return !isOrg && isLoggedIn ? (
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
              left: "prev,today,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            // editable={true}
            // selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={formattedEvents} // alternatively, use the `events` setting to fetch from a feed
            // select={handleDateClick}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          />
        </div>
        <Overlay
          target={overlayTarget}
          show={showOverlay}
          onHide={handleClose}
          placement="bottom"
        >
          <Tooltip style={{ color: "white" }}>
            <div id="tooltipContents">
              <strong id="tooltipTitle">{overlayText.title}</strong>
              <div id="tooltipDetails">{overlayText.description}</div>
            </div>
          </Tooltip>
        </Overlay>
      </Modal>
    </div>
  ) : (
    <div>unauthorized</div>
  );
}

export default UserHome;
