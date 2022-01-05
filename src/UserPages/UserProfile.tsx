import React, { useState, useEffect, useCallback } from "react";
import BottomRightButton from "../BottomRightButton";
import { BsGearFill } from "react-icons/bs";
import FollowingListItem from "./FollowingListItem";
import axios from "axios";
import User from "../Interfaces/User";
import Org from "../Interfaces/Org";
import NavButton from "../NavButton";

interface UserProfileProps {
  user: User;
  isOrg: boolean;
  isLoggedIn: boolean;
}

function UserProfile({ user, isLoggedIn, isOrg }: UserProfileProps) {
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

  const followingList = following.length ? (
    following.map((org) => {
      return <FollowingListItem org={org} unfollowOrg={unfollowOrg} />;
    })
  ) : (
    <div className="emptyFollowingContainer">
      <span>
        You don't follow any organizations. Click "Discover" to add some!
      </span>
      <br />
      <NavButton
        customVariant="outline-dark"
        path="/user/discover/orgs"
        name="Discover"
      />
    </div>
  );

  return !isOrg && isLoggedIn ? (
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
  ) : (
    <div>unauthorized</div>
  );
}

export default UserProfile;
