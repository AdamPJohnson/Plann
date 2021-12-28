import React from "react";
import Button from "react-bootstrap/button";
import Event from "../Interfaces/Event";
import User from "../Interfaces/User";
import axios from "axios";
interface NearbyEventListItemProps {
  event: Event;
  user: User;
}
function NearbyEventListItem({ event, user }: NearbyEventListItemProps) {
  const followEvent = () => {
    console.log(event.id);
    axios
      .patch(`http://localhost:8080/userEvents/${user.id}/${event.id}`)
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  };

  const unfollowEvent = () => {};

  const date = new Date(parseInt(event.date)).toLocaleString();
  const followed = false;
  const actionButton = followed ? (
    <Button
      onClick={unfollowEvent}
      className="nearbyEventButton"
      variant="outline-dark"
      size="sm"
    >
      Unfollow
    </Button>
  ) : (
    <Button
      onClick={followEvent}
      className="nearbyEventButton"
      variant="outline-dark"
      size="sm"
    >
      Follow
    </Button>
  );
  return (
    <div className="nearbyEventListItem">
      <span>{event.name}</span>
      <br />
      <span className="nearbyEventDate">{date}</span>
      <br />
      <Button className="nearbyEventButton" variant="outline-dark" size="sm">
        Details
      </Button>
      {actionButton}
    </div>
  );
}

export default NearbyEventListItem;
