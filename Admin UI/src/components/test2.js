import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CustomNodeFlow from './conversationFlow/conversation'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarLeftShift: {
      marginLeft: (props) => props.left,
      width: (props) => `calc(100% - ${props.left}px - ${props.right}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarRightShift: {
      marginRight: (props) => props.right,
      width: (props) => {
        console.log(props);
        return `calc(100% - ${props.right}px - ${props.left}px)`;
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButtonLeft: {
      marginRight: 36,
    },
    menuButtonRight: {
      marginLeft: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: 240,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      position: 'absolute',
    },
    drawerLeftOpen: {
      top: 58,
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerLeftClose: {
      top: 58,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    drawerRightOpen: {
      right: 0,
      left: 'auto',
      top: 58,
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerRightClose: {
      right: 0,
      left: 'auto',
      top: 58,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbarLeft: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolbarRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      marginLeft: '10%',
      marginRight: '10%',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  };
});
export default function MiniDrawer() {
  const [leftDrawerWidth, setLeftDrawerWidth] = React.useState(0);
  const [rightDrawerWidth, setRightDrawerWidth] = React.useState(0);
  const classes = useStyles({ left: leftDrawerWidth, right: rightDrawerWidth });
  const theme = useTheme();
  const [openLeft, setOpenLeft] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);

  const handleLeftDrawerOpen = () => {
    setOpenLeft(true);
    setLeftDrawerWidth(240);
  };

  const handleLeftDrawerClose = () => {
    setOpenLeft(false);
    setLeftDrawerWidth(0);
  };

  const handleRightDrawerOpen = () => {
    setOpenRight(true);
    setRightDrawerWidth(240);
  };

  const handleRightDrawerClose = () => {
    setOpenRight(false);
    setRightDrawerWidth(0);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
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
              {/* <Typography variant='h6' noWrap>
                Mini variant drawer
              </Typography> */}
            </Toolbar>
            Create Scenario
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

        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerLeftOpen]: openLeft,
            [classes.drawerLeftClose]: !openLeft,
          })}
          classes={{
            paper: clsx({
              [classes.drawerLeftOpen]: openLeft,
              [classes.drawerLeftClose]: !openLeft,
            }),
          }}
        >
          <div className={classes.toolbarLeft}>
            <IconButton onClick={handleLeftDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
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

        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerRightOpen]: openRight,
            [classes.drawerRightClose]: !openRight,
          })}
          classes={{
            paper: clsx({
              [classes.drawerRightOpen]: openRight,
              [classes.drawerRightClose]: !openRight,
            }),
          }}
        >
          <div className={classes.toolbarRight}>
            <IconButton onClick={handleRightDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
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

        <main className={classes.content}>
          <div />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <CustomNodeFlow/>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </main>
      </div>
    </div>
  );
}
