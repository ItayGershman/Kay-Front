import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
          <Typography variant='h6'>Scenario Builder</Typography>
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
