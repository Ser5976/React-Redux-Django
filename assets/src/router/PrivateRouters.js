import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { receiveDataStorage } from '../utilities/receiveDataStorage';
import { connect } from 'react-redux';

function PrivateRoute({ token, component: Component, ...rest }) {
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token, //токен
  };
};
export default connect(mapStateToProps)(PrivateRoute);
