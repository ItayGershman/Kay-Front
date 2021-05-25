import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import LeftDrawer from './LeftDrawer';
import RightDrawer from './RightDrawer';
import { useStoreActions } from 'react-flow-renderer';
import { LaserAction } from './Drawer-utils';
import CustomizedAccordion from './CustomAccordion';

const SideDrawer = ({
  open,
  drawerOpen,
  drawerClose,
  handleDrawerClose,
  handleDrawerOpen,
  buttons = [],
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
      {side === 'right' && (
        <RightDrawer
          node={node}
          elements={elements}
          setElements={setElements}
          drawerState={open}
          title={title}
          handleDrawerOpen={handleDrawerOpen}
        />
      )}

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
      {side === 'left' && open && (
        <div style={{ marginBottom: 60 }}>
          <div style={{ marginBottom: 20 }}>
            <Divider />
          </div>
          <CustomizedAccordion
            isDrawerOpen={open}
            setDrawer={handleDrawerOpen}
          />
          <div
            style={{
              display: 'flex',
              marginRight: 15,
              marginLeft: 15,
              marginTop: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <TrackChangesIcon color='action' />
            <p style={{ marginLeft: 30, fontSize: 16 }}>Laser</p>
          </div>

          <LaserAction />
        </div>
      )}
      {side === 'left' && !open && (
        <div>
          <CustomizedAccordion
            isDrawerOpen={open}
            setDrawer={handleDrawerOpen}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginRight: 15,
              marginTop: 15,
            }}
          >
            <TrackChangesIcon color='action' />
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default SideDrawer;
