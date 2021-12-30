import React, { ChangeEventHandler, useEffect, useState } from "react";
import BottomRightButton from "../BottomRightButton";
import User from "../Interfaces/User";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import UserNearbyEvents from "./UserNearbyEvents";
import NearbyOrgs from "./NearbyOrgs";
import Button from "react-bootstrap/Button";
interface UserDiscoverProps {
  user: User;
}
function UserDiscover({ user }: UserDiscoverProps) {
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div id="userPage">
      <div id="discoverSelectButtons">
        <Button
          onClick={() => onNavigate("")}
          variant="outline-dark"
          id="nearbyEventsButton"
        >
          Events
        </Button>
        <Button
          onClick={() => onNavigate("orgs")}
          variant="outline-dark"
          id="nearbyOrgsButton"
        >
          Organizations
        </Button>
      </div>

      <Routes>
        <Route path="/" element={<UserNearbyEvents user={user} />} />
        <Route path="orgs" element={<NearbyOrgs user={user} />} />
      </Routes>
      <BottomRightButton icon={<BsSearch />} onClick={() => {}} />
    </div>
  );
}

export default UserDiscover;
