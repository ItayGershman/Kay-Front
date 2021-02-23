import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  menu: {
    maxHeight: '100vh',
    minHeight:'30vh',
    overflowY:'auto',
    overflowX:'hidden',
  },
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const [openComponents, setOpenComponents] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const components = [
    'Add Node',
    'Add Input',
    'Add Output',
    'Add Scenario Name',
    'Add Intent',
    'Add Entity',
    'Speak',
    'Train Kay',
  ];
  const actions = [
    'Calendar',
    'Laser Pointer',
    'Equipment List',
    'Video Library',
    'Location of Positions',
  ];
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          key={'Components'}
          onClick={() => setOpenComponents(!openComponents)}
        >
          <ListItemText primary={'Components'} />
          {openComponents ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComponents} timeout='auto' unmountOnExit>
          <List>
            {components.map((text, index) => {
              return (
                <ListItem
                  button
                  key={text}
                  onClick={() =>
                    console.log(
                      'send index or text to handler and add that component to conversation grid'
                    )
                  }
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <ListItem
          button
          key={'Actions'}
          onClick={() => setOpenActions(!openActions)}
        >
          <ListItemText primary={'Actions'} />
          {openActions ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openActions} timeout='auto' unmountOnExit>
          <List>
            {actions.map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() =>
                  console.log(
                    'send index or text to handler and add that component to conversation grid'
                  )
                }
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />
      <List>
        {['Save conversation', 'Exit Without Save'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() =>
              console.log(
                'send index or text to handler and add that component to conversation grid'
              )
            }
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.menu}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>Menu</Button> */}
          {/* <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          > */}
          {list(anchor)}
          {/* </Drawer> */}
        </React.Fragment>
      ))}
    </div>
  );
}
