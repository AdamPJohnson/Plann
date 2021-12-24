import React, { useEffect, useState } from "react";
import BottomRightButton from "../BottomRightButton";
import NearbyEventListItem from "./NearbyEventListItem";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import User from "../Interfaces/User";

interface UserProfileProps {
  user: User;
}
function UserProfile({ user }: UserProfileProps) {
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const getNearByEvents = (zip: string) => {
    axios
      .get(`http://localhost:8080/nearbyEvents/${zip}`)
      .then((d) => setNearbyEvents(d.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getNearByEvents(user!.zip);
  }, [user]);
  const nearbyEventList = nearbyEvents.map((event) => (
    <NearbyEventListItem event={event} />
  ));
  return (
    <div id="userPage">
      <h2>Nearby Events</h2>
      <div id="nearbyEventList">{nearbyEventList}</div>
      <BottomRightButton icon={<BsSearch />} onClick={() => {}} />
    </div>
  );
}

export default UserProfile;
