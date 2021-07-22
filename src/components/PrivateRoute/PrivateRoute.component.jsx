import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  showAuthedComponent,
  redirectTo,
  currentUser,
  ...rest
}) => {
  return showAuthedComponent ? (
    currentUser ? (
      <Route {...rest} render={(props) => <Component {...props} />} />
    ) : (
      <Redirect to={redirectTo} />
    )
  ) : currentUser ? (
    <Redirect to={redirectTo} />
  ) : (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
};

export default PrivateRoute;
