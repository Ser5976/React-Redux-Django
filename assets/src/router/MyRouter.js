import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ListCard from '../page/ListCard';
import ProfileCard from '../page/ProfileCard';
import AddData from '../page/AddData';
import Login from '../page/Login';
import PersonalAccount from '../page/PersonalAccount';

import PrivateRoute from './PrivateRouters';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/ListCard" component={ListCard} />
      <PrivateRoute path="/profile/:name" component={ProfileCard} />
      <PrivateRoute path="/addData" component={AddData} />
      <Route path="/login" component={Login} />
      <Route path="/personalaccount" component={PersonalAccount} />
      <Redirect to="/" />
    </Switch>
  );
}

export default MyRouter;
