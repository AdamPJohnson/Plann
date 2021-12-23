import React, { useState, useEffect } from "react";
import "./App.css";
import "react-dates/initialize";
import axios from "axios";
import AddDates from "./OrgPages/AddDates";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Header from "./Header";
import UserHome from "./UserPages/UserHome";
import OrgHome from "./OrgPages/OrgHome";
import UserProfile from "./UserPages/UserProfile";
import UserDiscover from "./UserPages/UserDiscover";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Interfaces/User";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/session", { withCredentials: true })
      .then((result) => {
        console.log({ result });
        if (result.data) {
          console.log(result.data);
          console.log("result.data");
          setUser(result.data);
          setIsLoggedIn(true);
        }
      });
  }, []);
  const home = isOrg ? <OrgHome user={user} /> : <UserHome user={user} />;
  const main = isLoggedIn ? (
    <>
      <Route path="/" element={home} />

      <Route path="/user">
        <Route path="/user/home" element={<UserHome user={user} />} />
        <Route path="/user/profile" element={<UserProfile user={user} />} />
        <Route path="/user/discover" element={<UserDiscover user={user} />} />
      </Route>
      <Route path="/org">
        <Route path="/org/home" element={<OrgHome user={user} />} />
        <Route
          path="/org/addDates"
          element={<AddDates userId={user!.id} isOrg={isOrg} user={user} />}
        />
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
    </>
  );

  return (
    <Router>
      <div className="App">
        <Header
          isOrg={isOrg}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
        />
        <div id="mainContainer">
          <Routes>{main}</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
