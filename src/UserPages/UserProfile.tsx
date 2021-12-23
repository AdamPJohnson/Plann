import React, { useState, useEffect } from "react";
import BottomRightButton from "../BottomRightButton";
import { BsGearFill } from "react-icons/bs";
import FollowingListItem from "./FollowingListItem";
import axios from "axios";
import User from "../Interfaces/User";

interface UserProfileProps {
  user: User | null;
}
function UserProfile({ user }: UserProfileProps) {
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const followingList = following.map((org) => {
    return <FollowingListItem org={org} />;
  });
  console.log(user);
  useEffect(() => {
    const { id } = user!;
    axios
      .get(`http://localhost:8080/orgFollows/${id}`)
      .then((orgs) => setFollowing(orgs.data))
      .catch((e) => console.log(e));
  }, [user]);

  return (
    <div id="userPage">
      <div id="userProfile">
        <strong id="profileUserName">Username</strong>
        <br />
        <span id="profileUserName">{user!.username}</span>
        <br />
        <strong id="profileEmail">Email</strong>
        <br />
        <span id="profileEmail">{user!.email}</span>
        <br />
        <strong id="profileEmail">Following</strong>
        <div id="profileFollowing">{followingList}</div>
        <br />
      </div>
      <BottomRightButton onClick={() => {}} icon={<BsGearFill />} />
    </div>
  );
}

export default UserProfile;
