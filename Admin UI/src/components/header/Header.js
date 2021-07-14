import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from './HeaderStyle';
import logo from "../../assets/logo.png"

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          
          <div className={classes.logo}>
            <Link to='/dashboard' className={classes.link}>
              <img src={logo}  style={{width:60,height:60}}/>
            </Link>
          </div>
          {userInfo ? (
            <div className={classes.nav}>
              <div className={classes.navItem}>
                <Link to='/history' className={classes.link}>
                  <Typography variant='h5'>History</Typography>
                </Link>
                <Link to='/dashboard' className={classes.link}>
                  <Typography variant='h5'>Dashboard</Typography>
                </Link>
              </div>
              <div className={classes.navItem}>
                {/* <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle style={{marginRight:10,width:30,height:30}}/>
                </IconButton> */}
                <AccountCircle style={{marginRight:10,width:30,height:30}}/>
                <Typography variant='h5'>{userInfo.firstName}</Typography>
                {/* <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu> */}
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.navItem}>
                <Link to='/login' className={classes.link}>
                  Login
                </Link>
                <Link to='/register' className={classes.link}>
                  Register
                </Link>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
