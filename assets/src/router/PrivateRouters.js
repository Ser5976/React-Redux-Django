import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
//localStorage.getItem('token') !== null

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(RegistrationContext);
  // console.log(token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
