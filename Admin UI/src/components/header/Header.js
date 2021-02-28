import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useStyles from './HeaderStyle';

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
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label='login switch'
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            {/* <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton> */}
            <Link to='/' className={classes.link}>
              <Typography variant='h6'>Logo</Typography>
            </Link>
          </div>
          {!userInfo ? (
            <div className={classes.nav}>
              <div className={classes.navItem}>
                <Link to='/history' className={classes.link}>
                  <Typography variant='h6'>History</Typography>
                </Link>
                <Link to='/dashboard' className={classes.link}>
                  <Typography variant='h6'>Dashboard</Typography>
                </Link>
                <Link to='/conversation' className={classes.link}>
                  <Typography variant='h6'>Conversation</Typography>
                </Link>
              </div>
              {/* </div> */}
              <div className={classes.navItem}>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>

                <Typography variant='h6'>Hi Michal</Typography>
                <Menu
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
                </Menu>
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
