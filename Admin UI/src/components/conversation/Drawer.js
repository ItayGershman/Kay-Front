import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const SideDrawer = ({
  open,
  drawerOpen,
  drawerClose,
  handleDrawerClose,
  handleDrawerOpen,
  buttons,
  actions,
  classes,
  side,
}) => {
  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [drawerOpen]: open,
        [drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [drawerOpen]: open,
          [drawerClose]: !open,
        }),
      }}
    >
      <div
        className={side === 'left' ? classes.toolbarLeft : classes.toolRight}
      >
        {open ? (
          <IconButton onClick={handleDrawerClose}>
            {side === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerOpen}>
            {side === 'left' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
