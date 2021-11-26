import React, { useState } from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material/";
import Modal from "react-modal";
///////define modal app element
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const checkUsernameAvailability = (e) => {
    e.preventDefault();

    setModalIsOpen(true);
  };
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
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      border: "none",
      boxShadow: "1px 1px 15px rgba(0,0,0,0.3)",
    },
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
          <input
            onChange={onChange}
            type="text"
            name="orgName"
            value={formData.orgName}
          />
        </>
      )}
      <label htmlFor="username">Username</label>
      <input
        onChange={onChange}
        type="text"
        name="username"
        value={formData.username}
      />
      <Modal
        id="signUpModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        {isOrg && (
          <>
            <label htmlFor="orgName">Organization Name</label>
            <input
              onChange={onChange}
              type="text"
              name="orgName"
              value={formData.orgName}
            />
          </>
        )}
        <label htmlFor="username">Username</label>
        <input
          onChange={onChange}
          type="text"
          name="username"
          value={formData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={onChange}
          type="password"
          name="password"
          value={formData.password}
        />
        <label htmlFor="zip">Zip Code</label>
        <input
          onChange={onChange}
          type="text"
          name="zip"
          value={formData.zip}
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={onChange}
          type="text"
          name="email"
          value={formData.email}
        />
        <Button
          variant="outline-dark"
          className="mySubmitButton"
          onClick={onSubmit}
          type="submit"
        >
          Submit
        </Button>
        <div className="errorMessage">{errorMessage}</div>
      </Modal>

      <Button
        variant="outline-dark"
        className="mySubmitButton"
        onClick={checkUsernameAvailability}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
