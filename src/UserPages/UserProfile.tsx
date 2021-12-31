import React, { useState, useEffect, useCallback } from "react";
import BottomRightButton from "../BottomRightButton";
import { BsGearFill } from "react-icons/bs";
import FollowingListItem from "./FollowingListItem";
import axios from "axios";
import User from "../Interfaces/User";
import Org from "../Interfaces/Org";

interface UserProfileProps {
  user: User;
}
function UserProfile({ user }: UserProfileProps) {
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  const getOrgs = useCallback(() => {
    axios
      .get(`http://localhost:8080/orgFollows/${user.id}`)
      .then((orgs) => setFollowing(orgs.data))
      .catch((e) => console.log(e));
  }, [user]);

  useEffect(() => {
    getOrgs();
  }, [getOrgs]);

  const unfollowOrg = (org: Org) => {
    axios
      .delete(`http://localhost:8080/orgFollows/${user.id}/${org.id}`)
      .then((d) => getOrgs())
      .catch((e) => console.log(e));
  };

  const followingList = following.map((org) => {
    return <FollowingListItem org={org} unfollowOrg={unfollowOrg} />;
  });

  return (
    <div id="userPage">
      <div id="userProfile">
        <strong id="profileUserName">Username</strong>
        <br />
        <span id="profileUserName">{user!.username}</span>
        <br />
        <strong id="profileEmail">Email</strong>
        <br />
        <span id="profileEmail">{user.email}</span>
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
