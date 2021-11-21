import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function NavButton({ name, onClick, path }) {
  return (
    <Link
      to={`${path}`}
      style={{
        textDecoration: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button onClick={onClick} variant="outline-light" className="myNavButton">
        {name}
      </Button>
    </Link>
  );
}

export default NavButton;
