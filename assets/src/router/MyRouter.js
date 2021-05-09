import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddDataContainer from '../pages/AddDataContainer';
import Home from '../pages/Home';
import ListHousesContainer from '../pages/ListHousesContainer';
import ProfileHouseContainer from '../pages/ProfileHouseContainer';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/ListHousesContainer/:page"
        component={ListHousesContainer}
      />
      <Route path="/profile/:urlId" component={ProfileHouseContainer} />
      <Route path="/addDataContainer" component={AddDataContainer} />
      <Redirect to="/" />
    </Switch>
  );
}

export default MyRouter;
