import React from "react";

function FollowingListItem({ org }) {
  console.log(org);
  const { name, email, username, description, zip } = org;
  return (
    <div className="followingListItem">
      <span className="followingOrgName">{name}</span>
      <br />
      <span className="followingOrgDescription">{description}</span>
    </div>
  );
}

export default FollowingListItem;
