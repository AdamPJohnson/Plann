import React from "react";
import Button from "react-bootstrap/button";
import Event from "../Interfaces/Event";
import User from "../Interfaces/User";
import axios from "axios";
interface NearbyEventListItemProps {
  event: Event;
  user: User;
  following: Event[];
  setFollowing: React.Dispatch<React.SetStateAction<never[]>>;
}
function NearbyEventListItem({
  event,
  user,
  following,
  setFollowing,
}: NearbyEventListItemProps) {
  const getEvents = () => {
    axios
      .get(`http://localhost:8080/userEvents/${user.id}`)
      .then((d) => setFollowing(d.data));
  };
  const followEvent = () => {
    console.log(event.id);
    axios
      .patch(`http://localhost:8080/userEvents/${user.id}/${event.id}`)
      .then((d) => getEvents())
      .catch((e) => console.log(e));
  };
  const unfollowEvent = () => {
    axios
      .delete(`http://localhost:8080/userEvents/${user.id}/${event.id}`)
      .then((d) => getEvents())
      .catch((e) => console.log(e));
  };

  const date = new Date(parseInt(event.date)).toLocaleString();
  const followed = following.some((e: Event) => e.id === event.id);

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
    <div className="nearbyListItem">
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
