import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserPages/UserProfile";
import UserDiscover from "./UserPages/UserDiscover";
import AddDates from "./OrgPages/AddDates";
import UserHome from "./UserPages/UserHome";
import OrgHome from "./OrgPages/OrgHome";
import User from "./Interfaces/User";
import ProtectedRoute from "./ProtectedRoute";
function LoggedInRoutes({
  user,
  isOrg,
  isLoggedIn,
}: {
  user: User;
  isOrg: boolean;
  isLoggedIn: boolean;
}) {
  const home = isOrg ? <OrgHome user={user!} /> : <UserHome user={user!} />;

  return (
    <>
      <ProtectedRoute isLoggedIn={isLoggedIn} isOrg={isOrg}>
        <Route path="/" element={home} />
      </ProtectedRoute>

      <ProtectedRoute isLoggedIn={isLoggedIn} isOrg={isOrg} forWhom="user">
        <Route path="/user">
          <Route path="/user/home" element={<UserHome user={user!} />} />
          <Route path="/user/profile" element={<UserProfile user={user!} />} />
          <Route
            path="/user/discover/*"
            element={<UserDiscover user={user!} />}
          />
        </Route>
      </ProtectedRoute>
      <ProtectedRoute isLoggedIn={isLoggedIn} isOrg={isOrg} forWhom="org">
        <Route path="/org">
          <Route path="/org/home" element={<OrgHome user={user!} />} />
          <Route
            path="/org/addDates"
            element={<AddDates userId={user!.id} isOrg={isOrg} user={user!} />}
          />
        </Route>
      </ProtectedRoute>
    </>
  );
}

export default LoggedInRoutes;
