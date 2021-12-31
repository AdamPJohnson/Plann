import React from "react";
import User from "../Interfaces/User";
import Org from "../Interfaces/Org";
import Button from "react-bootstrap/Button";
import axios from "axios";
interface NearbyOrgListItemProps {
  user: User;
  org: Org;
  following: Org[];
  setFollowing: React.Dispatch<React.SetStateAction<never[]>>;
}
function NearbyOrgListItem({
  user,
  org,
  following,
  setFollowing,
}: NearbyOrgListItemProps) {
  const followed = following.some((o: Org) => o.id === org.id);
  console.log(following);
  const getOrgs = () => {
    axios
      .get(`http://localhost:8080/orgFollows/${user.id}`)
      .then((d) => setFollowing(d.data))
      .catch((e) => console.log(e));
  };
  const followOrg = () => {
    axios
      .patch(`http://localhost:8080/orgFollows/${user.id}/${org.id}`)
      .then((d) => getOrgs())
      .catch((e) => console.log(e));
  };
  const unfollowOrg = () => {
    axios
      .delete(`http://localhost:8080/orgFollows/${user.id}/${org.id}`)
      .then((d) => getOrgs())
      .catch((e) => console.log(e));
  };
  console.log(followed);
  const actionButton = followed ? (
    <Button
      onClick={unfollowOrg}
      className="nearbyEventButton"
      variant="dark"
      size="sm"
    >
      Unfollow
    </Button>
  ) : (
    <Button
      onClick={followOrg}
      className="nearbyEventButton"
      variant="outline-dark"
      size="sm"
    >
      Follow
    </Button>
  );

  return (
    <div className="nearbyListItem nearbyOrg">
      <strong>{org.name}</strong>
      <br />
      <span className="nearbyOrgDescription">{org.description}</span>
      <br />
      <div>
        <Button className="nearbyEventButton" variant="outline-dark" size="sm">
          Details
        </Button>
        {actionButton}
      </div>
    </div>
  );
}

export default NearbyOrgListItem;
