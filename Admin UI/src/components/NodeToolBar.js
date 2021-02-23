import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  menu: {
    maxHeight: '100vh',
    minHeight: '30vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  list: {
    width: '190px', //should be 100%
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
  title: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });
//   const [openComponents, setOpenComponents] = useState(false);
//   const [openActions, setOpenActions] = useState(false);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

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
          key={'Intents'}
          //   onClick={() => setOpenComponents(!openComponents)}
        >
          <ListItemText primary={'Intents'} />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={'Entities'}
          //   onClick={() => setOpenComponents(!openComponents)}
        >
          <ListItemText primary={'Entities'} />
        </ListItem>
      </List>

    </div>
  );

  return (
    <div className={classes.menu}>
      {['right'].map((anchor) => (
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
