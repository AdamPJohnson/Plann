import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

interface NavButtonProps {
  name: String;
  onClick?: () => void;
  path: string;
  customVariant?: string;
  className?: string;
}

function NavButton({
  name,
  onClick,
  path,
  customVariant,
  className,
}: NavButtonProps) {
  const variant = customVariant || "outline-light";
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
      <Button
        onClick={onClick}
        variant={variant}
        className={`myNavButton ${className}`}
      >
        {name}
      </Button>
    </Link>
  );
}

export default NavButton;
