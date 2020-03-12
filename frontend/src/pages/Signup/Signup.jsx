import React from 'react';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccountCircle,
  Drafts,
  Lock,
  LockOpen,
  LockOutlined,
  Person,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(15),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    fontSize: '12px',
  },
  select: {
    width: '100%',
    marginTop: '4px',
    paddingLeft: '6px',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { control, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                }
                name="firstname"
                control={control}
                rules={{
                  required: 'First name is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="firstname" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    autoComplete="lname"
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                }
                name="lastname"
                control={control}
                rules={{
                  required: 'Last name is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="lastname" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="username"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <>
                    <InputLabel className={classes.label}>Role</InputLabel>
                    <Select className={classes.select} native>
                      <option value="CLIENT">Client</option>
                      <option value="Realtor">Realtor</option>
                    </Select>
                  </>
                }
                name="role"
                control={control}
                rules={{
                  required: 'Role is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="role" />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Drafts />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="email"
                  />
                }
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    name="confirm-password"
                    label="Confirm password"
                    type="password"
                    id="confirm-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpen />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                name="confirm-password"
                control={control}
                rules={{
                  validate: (value) => value === watch('password') || 'The password is not matched'
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="confirm-password" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
