import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import { login } from '../../store/reducers/auth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login () {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login({
      body: data,
      success: () => history.push('/home'),
    }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="username"
                autoFocus
              />
            }
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="username" />
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
            }
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="password" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
