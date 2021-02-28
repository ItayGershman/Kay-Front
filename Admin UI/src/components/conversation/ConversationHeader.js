import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const ConversationHeader = ({
  classes,
  openLeft,
  openRight,
  handleLeftDrawerOpen,
  handleRightDrawerOpen,
}) => {
  return (
    <div>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarLeftShift]: openLeft,
          [classes.appBarRightShift]: openRight,
        })}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleLeftDrawerOpen}
              edge='start'
              className={clsx(classes.menuButtonLeft, {
                [classes.hide]: openLeft,
              })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Typography variant='h6'>Create Scenario</Typography>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleRightDrawerOpen}
              edge='start'
              className={clsx(classes.menuButtonRight, {
                [classes.hide]: openRight,
              })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

export default ConversationHeader;
