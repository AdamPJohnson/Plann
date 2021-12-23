import React from "react";
import NavButton from "./NavButton";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import User from "./Interfaces/User";

interface HeaderProps {
  isOrg: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
  user: User | null;
}
function Header({ isOrg, isLoggedIn, setIsLoggedIn, user }: HeaderProps) {
  const logOut = () => {
    setIsLoggedIn(false);
    axios.patch(
      `http://localhost:8080/logout/`,
      { id: user?.id },
      {
        withCredentials: true,
      }
    );
  };
  const headerUserType = isOrg ? (
    <header className="App-header loggedIn">
      <NavButton path="/org/home" name="Home" />
      <NavButton path="/org/profile" name="Profile" />
      <NavButton path="/org/addDates" name="Add Dates" />
      <NavButton
        path="/"
        onClick={() => setIsLoggedIn(false)}
        name="Log Out"
      />{" "}
    </header>
  ) : (
    <header className="App-header loggedIn">
      <NavButton path="/user/home" name="Home" />
      <NavButton path="/user/profile" name="Profile" />
      <NavButton path="/user/discover" name="Discover" />
      <NavButton path="/" onClick={logOut} name="Log Out" />
    </header>
  );

  const header = isLoggedIn ? (
    headerUserType
  ) : (
    <header className="App-header loggedOut">
      {/* FIX REPEATED CODE FOR TWO PATHS */}
      <Routes>
        <Route
          path="/"
          element={
            <NavButton
              path="/signup"
              // onClick={() => setIsLoggedIn(true)}
              name="Sign Up"
            />
          }
        />
        <Route
          path="/login"
          element={
            <NavButton
              path="/signup"
              // onClick={() => setIsLoggedIn(true)}
              name="Sign Up"
            />
          }
        />
        <Route
          path="/signup"
          element={
            <NavButton
              path="/login"
              // onClick={() => setIsLoggedIn(true)}
              name="Log In"
            />
          }
        />
      </Routes>
    </header>
  );

  return <div>{header}</div>;
}

export default Header;
