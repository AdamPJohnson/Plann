import React from "react";

function NearbyEventListItem({ event }) {
  console.log(event);
  const date = new Date(Number(event.date)).toLocaleString();
  return (
    <div className="nearbyEventListItem">
      <span>{event.name}</span>
      <br />
      <span>{date}</span>
    </div>
  );
}

export default NearbyEventListItem;
