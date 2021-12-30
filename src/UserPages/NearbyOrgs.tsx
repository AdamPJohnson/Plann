import React, { useState, useEffect } from "react";
import User from "../Interfaces/User";
import Org from "../Interfaces/Org";
import axios from "axios";
import NearbyOrgListItem from "./NearbyOrgListItem";
interface NearbyOrgsProps {
  user: User;
}

function NearbyOrgs({ user }: NearbyOrgsProps) {
  const [nearbyOrgs, setNearbyOrgs] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const getNearByEvents = (zip: string) => {
    axios
      .get(`http://localhost:8080/nearbyOrgs/${zip}`)
      .then((d) => setNearbyOrgs(d.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getNearByEvents(user!.zip);
    const { id } = user!;
    // axios
    //   .get(`http://localhost:8080/userEvents/${id}`)
    //   .then((events) => setFollowing(events.data))
    //   .catch((e) => console.log(e));
  }, [user]);

  const handleSelect = (e: React.ChangeEvent) => {
    setSelectedType((e.target as HTMLSelectElement).value);
  };

  const nearbyEventList = nearbyOrgs.map((org: Org) => {
    return (
      <NearbyOrgListItem
        setFollowing={setFollowing}
        following={following}
        user={user}
        org={org}
      />
    );
  });

  return (
    <>
      <h2>Nearby Organizations</h2>
      <select value={selectedType} onChange={handleSelect} id="eventTypeSelect">
        <option value="all">All</option>
        <option value="food">Food</option>
        <option value="music"> Music</option>
      </select>
      <div id="nearbyEventList">{nearbyEventList}</div>
    </>
  );
}

export default NearbyOrgs;
