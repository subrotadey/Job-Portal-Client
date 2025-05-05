import React, { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../pages/shared/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
//   console.log(location);

  if(loading) {
    return <Spinner></Spinner>;
  }

  if(user) {
    return children;
  }
  // If user is not authenticated, redirect to login page or show a message
  return <Navigate to="/signIn" state={location?.pathname} replace />;
};

export default PrivateRoute;
