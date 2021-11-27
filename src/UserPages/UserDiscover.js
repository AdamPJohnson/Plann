import React, { useEffect, useState } from "react";
import BottomRightButton from "../BottomRightButton";
import NearbyEventListItem from "./NearbyEventListItem";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
function UserProfile({ user }) {
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const getNearByEvents = (zip) => {
    axios
      .get(`http://localhost:8080/nearbyEvents/${zip}`)
      .then((d) => setNearbyEvents(d.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getNearByEvents(user.zip);
  }, [user]);
  const nearbyEventList = nearbyEvents.map((event) => (
    <NearbyEventListItem event={event} />
  ));
  return (
    <div id="userPage">
      {nearbyEventList}
      <BottomRightButton icon={<BsSearch />} />
    </div>
  );
}

export default UserProfile;
