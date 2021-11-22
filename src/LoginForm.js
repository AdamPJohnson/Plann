import React, { useState } from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import axios from "axios";
function LoginForm({ setIsLoggedIn, isOrg, setIsOrg }) {
  const [formData, onChange] = useForm({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8080/login", { ...formData })
      .then((data) => {
        setIsLoggedIn(true);
        console.log({ data });
      })
      .catch((error) => {
        setErrorMessage("Invalid Username or Password");
        console.log({ error });
      });
  };
  const handleToggle = () => {
    console.log(isOrg);
    setIsOrg((prev) => !prev);
  };
  return (
    <form id="loginForm">
      <h2>Log In...</h2>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={isOrg}
        exclusive
        onChange={handleToggle}
      >
        <ToggleButton value={false}>Attendee</ToggleButton>
        <ToggleButton value={true}>Organization</ToggleButton>
      </ToggleButtonGroup>
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
          Log In
        </Button>
      </Link>
      <div className="errorMessage">{errorMessage}</div>
    </form>
  );
}

export default LoginForm;
