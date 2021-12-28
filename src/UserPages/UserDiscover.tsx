import React, { ChangeEventHandler, useEffect, useState } from "react";
import BottomRightButton from "../BottomRightButton";
import NearbyEventListItem from "./NearbyEventListItem";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import User from "../Interfaces/User";
import Event from "../Interfaces/Event";

interface UserProfileProps {
  user: User;
}
function UserProfile({ user }: UserProfileProps) {
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [following, setFollowing] = useState([]);

  const getNearByEvents = (zip: string) => {
    axios
      .get(`http://localhost:8080/nearbyEvents/${zip}`)
      .then((d) => setNearbyEvents(d.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getNearByEvents(user!.zip);
    const { id } = user!;
    axios
      .get(`http://localhost:8080/userEvents/${id}`)
      .then((events) => setFollowing(events.data))
      .catch((e) => console.log(e));
  }, [user]);
  const nearbyEventList = nearbyEvents.map((event: Event) => {
    if (event.type === selectedType || selectedType === "all")
      return (
        <NearbyEventListItem
          setFollowing={setFollowing}
          following={following}
          user={user}
          event={event}
        />
      );
  });

  const handleSelect = (e: React.ChangeEvent) => {
    setSelectedType((e.target as HTMLSelectElement).value);
    console.log(selectedType);
  };
  return (
    <div id="userPage">
      <h2>Nearby Events</h2>
      <select value={selectedType} onChange={handleSelect} id="eventTypeSelect">
        <option value="all">All</option>
        <option value="food">Food</option>
        <option value="music"> Music</option>
      </select>
      <div id="nearbyEventList">{nearbyEventList}</div>
      <BottomRightButton icon={<BsSearch />} onClick={() => {}} />
    </div>
  );
}

export default UserProfile;
