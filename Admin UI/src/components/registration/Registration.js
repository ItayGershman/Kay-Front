import React from 'react';
import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './RegistrationStyle';
import Copyright from './registration-utils';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Fade from 'react-reveal/Fade';

export default function RegisterInSide() {
  const classes = useStyles();
  let location = useLocation().pathname.replace('/', '');

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {location === 'login' ? 'Login' : 'Register'}
          </Typography>
          <Fade top>{location === 'login' ? <Login /> : <Register />}</Fade>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
