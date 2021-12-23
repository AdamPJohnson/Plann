import React from "react";
import Button from "react-bootstrap/button";
import Event from "../Interfaces/Event";
interface NearbyEventListItemProps {
  event: Event;
}
function NearbyEventListItem({ event }: NearbyEventListItemProps) {
  const date = new Date(parseInt(event.date)).toLocaleString();
  const followed = false;
  const actionButton = followed ? (
    <Button className="nearbyEventButton" variant="outline-dark" size="sm">
      Unfollow
    </Button>
  ) : (
    <Button className="nearbyEventButton" variant="outline-dark" size="sm">
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
