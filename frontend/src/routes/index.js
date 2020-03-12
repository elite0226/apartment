import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';

function Routes () {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/home' component={HomePage} />
    </Switch>
  );
};

export default Routes;
