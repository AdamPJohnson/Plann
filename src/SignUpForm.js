import React, { useState } from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material/";

function SignUpForm({ setIsLoggedIn, isOrg, setIsOrg }) {
  const [formData, onChange] = useForm({ username: "", password: "" });
  const onSubmit = (e) => {
    setIsLoggedIn(true);
  };
  const handleToggle = () => {
    console.log(isOrg);
    setIsOrg((prev) => !prev);
  };
  const switchLabel = isOrg ? "Organization" : "User";
  return (
    <form id="loginForm">
      <h2>Sign Up...</h2>
      <div>
        <ToggleButtonGroup
          color="primary"
          value={String(isOrg)}
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="false">Attendee</ToggleButton>
          <ToggleButton value="true">Organization</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <label htmlFor="username">Username</label>
      <input onChange={onChange} type="text" name="username" />
      <label htmlFor="password">Password</label>
      <input onChange={onChange} type="password" name="password" />
      <Link
        to="/"
        style={{
          textDecoration: "none",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outline-dark"
          className="mySubmitButton"
          onClick={onSubmit}
          type="submit"
        >
          Sign Up
        </Button>
      </Link>
    </form>
  );
}

export default SignUpForm;
