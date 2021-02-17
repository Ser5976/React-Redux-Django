import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
import { receiveDataStorage } from '../utilities/receiveDataStorage';

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(RegistrationContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        token || receiveDataStorage('token') ? (
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
