import React from 'react';
import './Sidebar.css';
import { Avatar } from '@material-ui/core';

const SidebarList = () => {
  return (
    <div className='sidebarChat'>
      {/* <Avatar /> */}
      <div className='sidebarChat__info'>
          {/* Should get from redux */}
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarList;
