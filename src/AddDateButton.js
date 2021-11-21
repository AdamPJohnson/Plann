import React from "react";
import Button from "react-bootstrap/Button";

function AddDateButton({ date, submitDate }) {
  const onClick = () => {
    console.log(date);
    submitDate();
  };
  return (
    <Button variant="outline-dark" onClick={onClick} className="addDateButton">
      Add Date!
    </Button>
  );
}

export default AddDateButton;
