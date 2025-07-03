import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthenticated } from "../hooks/useAuthenticated.hook";
import { getUserLocal } from "../utils/localStorage.util";

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuthenticated();
  const user = getUserLocal();
  if (!isAuth && !user){
    return <Navigate to="/" />;
  }
  //  else if (isAuth && user.isVerify === false) {
  //   return <Navigate to="/" />;
  // } 
  else {
    return children;
  }
};

export default ProtectedRoute;