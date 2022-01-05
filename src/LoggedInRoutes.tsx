import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserPages/UserProfile";
import UserDiscover from "./UserPages/UserDiscover";
import AddDates from "./OrgPages/AddDates";
import UserHome from "./UserPages/UserHome";
import OrgHome from "./OrgPages/OrgHome";
import User from "./Interfaces/User";
function LoggedInRoutes({
  user,
  isOrg,
  isLoggedIn,
}: {
  user: User;
  isOrg: boolean;
  isLoggedIn: boolean;
}) {
  const home = isOrg ? (
    <OrgHome user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
  ) : (
    <UserHome user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
  );

  return (
    <Routes>
      <Route path="/" element={home} />

      <Route path="/user">
        <Route
          path="/user/home"
          element={
            <UserHome user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/user/profile"
          element={
            <UserProfile user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/user/discover/*"
          element={
            <UserDiscover user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
          }
        />
      </Route>

      <Route path="/org">
        <Route
          path="/org/home"
          element={
            <OrgHome user={user!} isOrg={isOrg} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/org/addDates"
          element={
            <AddDates
              userId={user!.id}
              isOrg={isOrg}
              user={user!}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default LoggedInRoutes;
