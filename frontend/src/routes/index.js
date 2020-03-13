import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';

function Routes () {
  const isLoggedIn = useSelector(state => !!state.auth.user);

  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      {isLoggedIn && (
        <>
          <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
          </Switch>
        </>
      )}
    </Switch>
  );
};

export default Routes;
