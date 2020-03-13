import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: '8px',
  },
  logo: {
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
  },
  link: {
    marginRight: '16px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  activeLink: {
    color: 'orange',
  },
}));

function Header (){
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink className={classes.logo} to="/">Apartment Rentals</NavLink>
        <div className={classes.flexGrow} />
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to='/home'
          exact={true}
        >
          <Button color="inherit">HomePage</Button>
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to='/user'
          exact={true}
        >
          <Button color="inherit">Users</Button>
        </NavLink>
        <IconButton aria-label="logout" color="inherit">
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
