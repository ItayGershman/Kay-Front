import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Menu from './Menu';
import NodeToolBar from './NodeToolBar';
import PersistentDrawerLeft from './test';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import CustomNodeFlow from './conversationFlow/conversation';
import MenuIcon from '@material-ui/icons/Menu';
import SignIn from './registration/SignIn'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sidebar: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: '#ffffff',
    border: '1px solid grey',
  },
  scenario: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#FAB95B',
    margin: '20px 0px',
  },
  conversation: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
  },
  arrowLeft: {
    position: 'relative',
    bottom: '15px',
    right: '15px',
  },
  arrowRight: {
    position: 'relative',
    bottom: '15px',
    left: '15px',
  },
  menuControl: {
    alignItems: 'baseline',
    display: 'flex',
  },
  arrows: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toolBarControl: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
}));

export default function AutoGrid({ page }) {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const [toolBar, setToolBar] = useState(false);
  const [conversationBuilderSize, setConversationBuilderSize] = useState(10);
  const [toolBarSize, setToolBarSize] = useState(1);
  const [menuSize, setMenuSize] = useState(1);
  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.scenario}>{page}</Paper>
      </Grid>
      {page === 'conversation' && (
        <Grid container spacing={3}>
          {menu ? (
            <Grid item xs={menuSize} className={classes.menuControl}>
              <Paper className={classes.sidebar}>
                <Menu />
              </Paper>
              <Button
                className={classes.arrowLeft}
                onClick={() => {
                  setMenu(false);
                  setConversationBuilderSize(conversationBuilderSize + 1);
                  setMenuSize(menuSize - 1);
                }}
              >
                <ChevronLeftIcon className={classes.arrows} />
              </Button>
            </Grid>
          ) : (
            <Grid item xs={menuSize}>
              <Button
                onClick={() => {
                  setMenu(true);
                  setConversationBuilderSize(conversationBuilderSize - 1);
                  setMenuSize(menuSize + 1);
                }}
              >
                <MenuIcon fontSize='large' />
              </Button>
            </Grid>
          )}
          <Grid item xs={conversationBuilderSize}>
            <Grid item>
              <Paper className={classes.conversation}>
                <CustomNodeFlow />
              </Paper>
            </Grid>
          </Grid>
          {toolBar ? (
            <Grid item xs={toolBarSize} className={classes.toolBarControl}>
              <Button
                className={classes.arrowRight}
                onClick={() => {
                  console.log('toolbar -1');
                  setToolBar(false);
                  setConversationBuilderSize(conversationBuilderSize + 1);
                  setToolBarSize(toolBarSize - 1);
                }}
              >
                <ChevronRightIcon className={classes.arrows} />
              </Button>
              <Paper className={classes.sidebar}>
                <NodeToolBar />
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={toolBarSize}>
              <Button
                className={classes.arrowRight}
                onClick={() => {
                  console.log('toolbar +1');
                  setToolBar(true);
                  setConversationBuilderSize(conversationBuilderSize - 1);
                  setToolBarSize(toolBarSize + 1);
                }}
              >
                <MenuIcon fontSize='large' />
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      {
          page === 'dashboard' && <div>Dashboard</div>
      }
      {
          page === 'login' && <SignIn />
      }
    </div>
  );
}
