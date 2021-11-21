import React from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";

function SignUpForm({ setIsLoggedIn }) {
  const [formData, onChange] = useForm({ username: "", password: "" });
  const onSubmit = (e) => {
    setIsLoggedIn(true);
  };
  return (
    <div id="mainContainer">
      <form id="loginForm">
        <h2>Sign Up...</h2>
        <label htmlFor="username">Username</label>
        <input onChange={onChange} type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input onChange={onChange} type="password" name="password" />
        <Button variant="outline-dark" onClick={onSubmit} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
