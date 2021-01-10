import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListCard from '../page/ListCard';
import ProfileCard from '../page/ProfileCard';
import AddData from '../page/AddData';
import LoginCard from '../page/LoginCard';

function MyRouter() {
  return (
    <Switch>
      <Route exact path="/ListCard" component={ListCard} />
      <Route path="/profile/:name" component={ProfileCard} />
      <Route path="/addData" component={AddData} />
      <Route path="/loginCard" component={LoginCard} />
    </Switch>
  );
}

export default MyRouter;
