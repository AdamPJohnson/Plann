import React, { useState, useEffect } from "react";
import "./App.css";
import "react-dates/initialize";
import axios from "axios";

import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import User from "./Interfaces/User";
import LoggedInRoutes from "./LoggedInRoutes";
import LoginSignUp from "./LoginSignup";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/session", { withCredentials: true })
      .then((result) => {
        if (result.data) {
          setUser(result.data);
          setIsLoggedIn(true);
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }, [navigate]);

  const main = isLoggedIn ? (
    <LoggedInRoutes user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
  ) : (
    <LoginSignUp
      isOrg={isOrg}
      setIsOrg={setIsOrg}
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser}
    />
  );

  return (
    <div className="App">
      <Header
        isOrg={isOrg}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user!}
      />
      <div id="mainContainer">{main}</div>
    </div>
  );
}

export default App;
