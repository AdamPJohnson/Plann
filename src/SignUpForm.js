import React, { useState } from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material/";

function SignUpForm({ setIsLoggedIn, isOrg, setIsOrg, setUser }) {
  const [formData, onChange] = useForm({
    username: "",
    password: "",
    orgName: "",
    email: "",
    zip: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const userOrg = isOrg ? "org" : "user";
    axios
      .post(`http://localhost:8080/signup${userOrg}`, { ...formData })
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data.data);
        navigate(`../${userOrg}/home`);
      })
      .catch((error) => {
        setErrorMessage("Username Already Taken");
        console.log({ error });
      });
  };
  const handleToggle = () => {
    console.log(isOrg);
    setIsOrg((prev) => !prev);
  };
  return (
    <form id="loginForm">
      <h2>Sign Up...</h2>

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

      {isOrg && (
        <>
          <label htmlFor="orgName">Organization Name</label>
          <input onChange={onChange} type="text" name="orgName" />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input onChange={onChange} type="text" name="email" />
      <label htmlFor="zip">Zip Code</label>
      <input onChange={onChange} type="text" name="zip" />
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
      <div className="errorMessage">{errorMessage}</div>
    </form>
  );
}

export default SignUpForm;
