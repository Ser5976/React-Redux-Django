import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import ListHousesContainer from '../pages/ListHousesContainer';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/ListHousesContainer/:name"
        component={ListHousesContainer}
      />
      <Redirect to="/" />
    </Switch>
  );
}

export default MyRouter;
