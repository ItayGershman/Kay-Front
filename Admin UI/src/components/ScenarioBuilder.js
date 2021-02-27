import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomNodeFlow from './conversationFlow/conversation';

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
    margin: '0px 0px 20px 0px',
  },
  conversation: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
  },
}));

export default function ScenarioBuilder() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.scenario}>Create conversation</Paper>
      </Grid>
      <Grid container spacing={3}>
        <CustomNodeFlow />
      </Grid>
      {/* {menu ? (
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
              className={classes.arrowRight}
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
                setToolBar(true);
                setConversationBuilderSize(conversationBuilderSize - 1);
                setToolBarSize(toolBarSize + 1);
              }}
            >
              <MenuIcon fontSize='large' />
            </Button>
          </Grid>
        )}
      </Grid> */}
    </div>
  );
}
