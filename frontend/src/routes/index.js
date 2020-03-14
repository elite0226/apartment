import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';

import AdminRoute from './AdminRoute';
import RealtorRoute from './RealtorRoute';

function Routes () {
  const isLoggedIn = useSelector(state => !!state.auth.user);

  return (
    <Switch>
      <Route exact path='/' render={() => {
        if (isLoggedIn) return (<Redirect to='/home' />);
        return (<Redirect to='/login' />);
      }} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      {isLoggedIn && (
        <>
          <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <AdminRoute path='/users' component={() => <h4>User Page</h4>} />
            <AdminRoute path='/user' exact component={() => <h4>User Create Page</h4>} />
            <AdminRoute path='/user/:id' component={() => <h4>User Edit Page</h4>} />
            <RealtorRoute path='/realtor' exact component={() => <h4>Realtor Create page</h4>} />
            <RealtorRoute path='/realtor/:id' component={() => <h4>Realtor Edit page</h4>} />
          </Switch>
        </>
      )}
    </Switch>
  );
};

export default Routes;
