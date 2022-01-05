import React, { JSXElementConstructor } from "react";
import { useNavigate, Routes } from "react-router-dom";
function ProtectedRoute({
  isLoggedIn,
  isOrg,
  forWhom,
  children,
}: {
  isLoggedIn: boolean;
  isOrg: boolean;
  forWhom?: string;
  children: any;
}) {
  let authorized;
  if (!forWhom) authorized = true;
  else if (forWhom === "user" && !isOrg) authorized = true;
  else if (forWhom === "org" && isOrg) authorized = true;
  else authorized = false;
  console.log(forWhom, authorized, children);
  if (isLoggedIn && authorized) return <Routes>{children}</Routes>;
  else return <div>UNAUTHORIZED</div>;
}

export default ProtectedRoute;
