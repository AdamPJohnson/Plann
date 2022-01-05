import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Route, Routes } from "react-router-dom";
import User from "./Interfaces/User";

interface LoginiSignupProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isOrg: boolean;
  setIsOrg: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function LoginSignUp({
  setIsLoggedIn,
  isOrg,
  setIsOrg,
  setUser,
}: LoginiSignupProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginForm
            isOrg={isOrg}
            setIsOrg={setIsOrg}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginForm
            isOrg={isOrg}
            setIsOrg={setIsOrg}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignUpForm
            isOrg={isOrg}
            setIsOrg={setIsOrg}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        }
      />
    </Routes>
  );
}

export default LoginSignUp;
