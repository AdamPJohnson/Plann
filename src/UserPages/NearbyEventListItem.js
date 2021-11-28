import React from "react";

function NearbyEventListItem({ event }) {
  console.log(event);
  return <div className="nearbyEventListItem">{event.name}</div>;
}

export default NearbyEventListItem;
