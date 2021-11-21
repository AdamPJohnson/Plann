import React from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
function LoginForm({ setIsLoggedIn }) {
  const [formData, onChange] = useForm({ username: "", password: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoggedIn(true);
  };
  return (
    <div id="mainContainer">
      <form id="loginForm">
        <h2>Log In...</h2>
        <label htmlFor="username">Username</label>
        <input onChange={onChange} type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input onChange={onChange} type="password" name="password" />
        <Button variant="outline-dark" onClick={onSubmit} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
