import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {localStorage.getItem('token') !== null ?
        <Component />
      :
        <Redirect to={{ pathname: "/loginCard", state: { from: location } }} />
      }
    </Route>
  );
};

export default PrivateRoute;