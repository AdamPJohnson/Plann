import React from "react";
import Button from "react-bootstrap/button";
import Org from "../Interfaces/Org";
interface FollowingListItemProps {
  org: Org | null;
}
function FollowingListItem({ org }: FollowingListItemProps) {
  console.log(org);
  const { name, email, username, description, zip } = org!;
  return (
    <div className="followingListItem">
      <span className="followingOrgName">{name}</span>
      <br />
      <span className="followingOrgDescription">{description}</span>
      <br />

      <Button size="sm" className="followingListButton" variant="outline-dark">
        Profile
      </Button>
      <Button size="sm" className="followingListButton" variant="outline-dark">
        Unfollow
      </Button>
    </div>
  );
}

export default FollowingListItem;
