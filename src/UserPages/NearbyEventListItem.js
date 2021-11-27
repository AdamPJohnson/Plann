import React from "react";

function NearbyEventListItem({ event }) {
  console.log(event);
  return <div>{event.name}</div>;
}

export default NearbyEventListItem;
