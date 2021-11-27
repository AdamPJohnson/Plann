import React from "react";
import BottomRightButton from "./BottomRightButton";
import { BsGearFill } from "react-icons/bs";
function UserProfile() {
  return (
    <div id="userPage">
      <BottomRightButton icon={<BsGearFill />} />
    </div>
  );
}

export default UserProfile;
