import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarList from './SidebarList';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src='https://avatars2.githubusercontent.com/u/48354712?s=460&u=fd81d31bcaccd4f0617974373f5cc72d895e4292&v=4' />
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input placeholder='Search a chat' type='text' />
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarList />
        <SidebarList />
        <SidebarList />
        <SidebarList />
        <SidebarList />
        <SidebarList />
        <SidebarList />
        <SidebarList />
      </div>
    </div>
  );
};

export default Sidebar;
