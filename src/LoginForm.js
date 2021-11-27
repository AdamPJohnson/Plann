import React, { useState } from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import axios from "axios";
function LoginForm({ setIsLoggedIn, isOrg, setIsOrg, setUser }) {
  const [formData, onChange] = useForm({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const userOrg = isOrg ? "Org" : "User";
    axios
      .post(`http://localhost:8080/login${userOrg}`, { ...formData })
      .then((data) => {
        setIsLoggedIn(true);

        setUser(data.data);
        navigate(`../${userOrg}/home`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          setErrorMessage("Invalid Password");
        } else if (error.response.status === 404) {
          setErrorMessage("Invalid Username");
        }
        console.log({ error });
      });
  };
  const handleToggle = () => {
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
