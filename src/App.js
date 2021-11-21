import React, { useState } from "react";
import "./App.css";
import "react-dates/initialize";
import MyDatePicker from "./MyDatePicker.js";
import NavButton from "./NavButton.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Link, Routes, Route } from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOrOrg, setUserOrOrg] = useState(null);

  const headerUserType =
    userOrOrg === "org" ? (
      <header className="App-header loggedIn">
        <NavButton name="Home" />
        <NavButton name="Profile" />
        <NavButton name="Add Dates" />
        <NavButton onClick={() => setIsLoggedIn(false)} name="Log Out" />
      </header>
    ) : (
      <header className="App-header loggedIn">
        <NavButton path="/home" name="Home" />
        <NavButton path="/profile" name="Profile" />
        <NavButton path="/discover" name="Discover" />
        <NavButton
          path="/"
          onClick={() => setIsLoggedIn(false)}
          name="Log Out"
        />
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

  const main = isLoggedIn ? (
    <>
      <Route path="/" element={<h1> home</h1>} />
      <Route path="/addDates" element={<MyDatePicker />} />
    </>
  ) : (
    <>
      <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/login"
        element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/signup"
        element={<SignUpForm setIsLoggedIn={setIsLoggedIn} />}
      />
    </>
  );

  return (
    <Router>
      <div className="App">
        {header}
        <div id="mainContainer">
          <Routes>{main}</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
