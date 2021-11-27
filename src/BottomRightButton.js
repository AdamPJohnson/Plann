import React from "react";

function BottomRightButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className="bottomRightButton">
      {icon}
    </button>
  );
}

export default BottomRightButton;
