import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListCard from '../page/ListCard';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/ListCard" component={ListCard} />
    </Switch>
  );
}

export default MyRouter;
