import React from 'react';
import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './HeaderStyle'


export default function Header() {
  const classes = useStyles();


  return (
    <Grid item xs={12}>
      <Paper className={classes.header}>
        <div className={classes.headerContent}>
          <Link to='/'>
            <Typography >Kay Logo</Typography>
            {/* <Button>Kay Logo</Button> */}
          </Link>

          <div className={classes.nav}>
            {/* <Router> */}
            <Link to='/conversation'>
              <Button className={classes.button}>Conversation</Button>
            </Link>
            <Link to='/history'>
              <Button className={classes.button}>History</Button>
            </Link>
            <Link to='/dashboard'>
              <Button className={classes.button}>Dashboard</Button>
            </Link>
          </div>
        </div>
        <div>
          <Button className={classes.button}>
            <Avatar>M</Avatar>
          </Button>
          <Link to='/login'>
            <Button className={classes.button}>Hi Michal</Button>
          </Link>
        </div>
      </Paper>
    </Grid>
  );
}
