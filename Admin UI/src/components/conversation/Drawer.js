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
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import LeftDrawer from './LeftDrawer';
// import RightDrawer from './RightDrawer';
import RightDrawer from './RightDrawerTest';
import { useStoreActions } from 'react-flow-renderer';

const SideDrawer = ({
  open,
  drawerOpen,
  drawerClose,
  handleDrawerClose,
  handleDrawerOpen,
  buttons,
  actions,
  classes,
  utils,
  side,
  node,
  elements,
  setElements,
  title,
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
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
        className={side === 'left' ? classes.toolbarLeft : classes.toolbarRight}
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
      {side === 'left' ? (
        <LeftDrawer actions={actions} utils={utils} />
      ) : (
        <RightDrawer
          node={node}
          elements={elements}
          setElements={setElements}
          drawerState={open}
          title={title}
        />
      )}
      <Divider />
      <List>
        {buttons.map((button, index) => (
          <ListItem
            button
            key={index}
            draggable={button.isDraggable}
            onClick={() => {
              button.handler(button.name);
            }}
            onDragStart={(event) => {
              onDragStart(event, button.name);
            }}
          >
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.title} />
            {button.isDraggable && <DragIndicatorIcon color='action' />}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
