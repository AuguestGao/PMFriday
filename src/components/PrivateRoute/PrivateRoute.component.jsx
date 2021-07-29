import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return isEmpty(user) ? (
    <Redirect to={"/signin"} />
  ) : (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
};

export default PrivateRoute;
