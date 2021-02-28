import React from 'react';
import useStyles from '../HistoryStyle'
import { Avatar } from '@material-ui/core';

const SidebarList = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebarChat}>
      {/* <Avatar /> */}
      <div className={classes.sidebarChatInfo}>
          {/* Should get from redux */}
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarList;
