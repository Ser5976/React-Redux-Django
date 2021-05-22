import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddDataContainer from '../pages/AddDataContainer';
import Home from '../pages/Home';
import ListHousesContainer from '../pages/ListHousesContainer';
import LoginContainer from '../pages/LoginContainer';
import ProfileHouseContainer from '../pages/ProfileHouseContainer';
import PersonalAccountContainer from '../pages/PersonalAccountContainer';
import PrivateRoute from './PrivateRouters';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/ListHousesContainer/:page"
        component={ListHousesContainer}
      />
      <PrivateRoute path="/profile/:urlId" component={ProfileHouseContainer} />
      <Route path="/addDataContainer" component={AddDataContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/personalAccount" component={PersonalAccountContainer} />
      <Redirect to="/" />
    </Switch>
  );
}

export default MyRouter;
