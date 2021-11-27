import React from "react";
import BottomRightButton from "./BottomRightButton";
import { BsSearch } from "react-icons/bs";
function UserProfile() {
  return (
    <div id="userPage">
      <BottomRightButton icon={<BsSearch />} />
    </div>
  );
}

export default UserProfile;
