import React from "react";
import Button from "react-bootstrap/Button";

function AddDateButton({ date, submitDate }) {
  const onClick = () => {
    /////verify date is in the future
    submitDate();
  };
  return (
    <Button variant="outline-dark" onClick={onClick} className="addDateButton">
      Add Date!
    </Button>
  );
}

export default AddDateButton;
