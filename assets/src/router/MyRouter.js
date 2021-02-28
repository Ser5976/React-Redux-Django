import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ListCard from '../page/ListCard';
import ProfileCardContainer from '../page/ProfileCardContainer';
import AddData from '../page/AddData';
import LoginContainer from '../page/LoginContainer';
import PersonalAccountContainer from '../page/PersonalAccountContainer';
import Home from '../page/Home';

import PrivateRoute from './PrivateRouters';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ListCard" component={ListCard} />
      <PrivateRoute path="/profile/:name" component={ProfileCardContainer} />
      <PrivateRoute path="/addData" component={AddData} />
      <Route path="/login" component={LoginContainer} />
      <PrivateRoute
        path="/personalAccount"
        component={PersonalAccountContainer}
      />
      <Redirect to="/" />
    </Switch>
  );
}

export default MyRouter;
