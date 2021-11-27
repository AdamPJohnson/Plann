import { buttonBaseClasses } from "@mui/material";
import React from "react";
import Button from "react-bootstrap/Button";
function BottomRightButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className="bottomRightButton">
      {icon}
    </button>
  );
}

export default BottomRightButton;
