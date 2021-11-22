import React, { useState } from "react";
import "./App.css";
import "react-dates/initialize";
import MyDatePicker from "./MyDatePicker.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";
import Header from "./Header.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrg, setIsOrg] = useState(true);

  const main = isLoggedIn ? (
    <>
      <Route path="/user">
        <Route path="/user/home" element={<h1> home</h1>} />
      </Route>
      <Route path="/org">
        <Route path="/org/addDates" element={<MyDatePicker />} />
      </Route>
    </>
  ) : (
    <>
      <Route
        path="/"
        element={
          <LoginForm
            isOrg={isOrg}
            setIsOrg={setIsOrg}
            setIsLoggedIn={setIsLoggedIn}
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
          />
        }
      />
    </>
  );

  return (
    <Router>
      <div className="App">
        <Header
          isOrg={isOrg}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div id="mainContainer">
          <Routes>{main}</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
