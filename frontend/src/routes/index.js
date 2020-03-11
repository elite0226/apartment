import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
