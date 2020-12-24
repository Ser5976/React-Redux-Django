import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListCard from '../page/ListCard';
import ProfileCard from '../page/ProfileCard';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/ListCard" component={ListCard} />
      <Route path="/profile/:name" component={ProfileCard} />
    </Switch>
  );
}

export default MyRouter;
