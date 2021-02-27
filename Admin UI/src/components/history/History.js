import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import './HistoryStyle.css';
import { Typography } from '@material-ui/core';

import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import ChatSideBar from './sidebar/ChatSideBar';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: 0,
    width: '70%',
    margin: '50px auto',
    background: 'blue',
    borderRadius: '50px',
    padding: '20px',
    backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/000/097/736/small/abstract-robot-background-vector.jpg')`,
    opacity: '0.9',

    // position: "fixed" // remove this so we can apply flex design
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex', //new added flex so we can put div at left and right side
  },
  leftBubble: {
    borderRadius: '0px 30px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    backgroundColor: '#5c6bc0',
    color: 'white',
  },
  rightBubble: {
    borderRadius: '30px 0px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    backgroundColor: '#eeeeee',
    color: 'black',
  },
  right: {
    justifyContent: 'flex-end ',
  },
  left: {
    justifyContent: 'flex-start ',
  },
  userColor: {
    color: '#283593',
  },
  kayColor: {
    color: 'black',
  },
}));

const History = () => {
  const classes = useStyles();
  const dummyData = [
    {
      name: 'Kay',
      message: 'This should be in left',
      direction: 'left',
    },
    {
      name: 'User',
      message: 'This should be in right',
      direction: 'right',
    },
    {
      name: 'Kay',
      message: 'This should be in left again',
      direction: 'left',
    },
    {
      name: 'User',
      message: 'This should be in right again',
      direction: 'right',
    },
    {
      name: 'Kay',
      message: 'This should be in left',
      direction: 'left',
    },
    {
      name: 'User',
      message: 'This should be in right',
      direction: 'right',
    },
    {
      name: 'Kay',
      message: 'This should be in left again',
      direction: 'left',
    },
    {
      name: 'User',
      message: 'This should be in right again',
      direction: 'right',
    },
  ];

  const chatBubbles = dummyData.map((obj, i = 0) => (
    <div className={`${classes.bubbleContainer} ${obj.direction}`} key={i}>
      {obj.direction === 'left' ? (
        <div key={i++} className={classes.leftBubble}>
          <div className={classes.kayColor}>{obj.name}</div>
          <div>{obj.message}</div>
        </div>
      ) : (
        <div key={i++} className={classes.rightBubble}>
          <div className={classes.userColor}>{obj.name}</div>
          <div>{obj.message}</div>
        </div>
      )}
    </div>
  ));
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Typography variant='h4' style={{ marginTop: '30px' }}>
    //     History
    //   </Typography>
    //   <div className={classes.container}>{chatBubbles}</div>
    // </div>
    <div
      style={{
        display: 'flex',
        backgroundColor: '#ededed',
        height: '95vh',
        width: '98.5vw',
        boxShadow: '-3px 4px 20px -6px rgba(0,0,0,0.75)',
      }}
    >
      <ChatSideBar />
      <div className='chat'>
        <div className='chat__header'>
          <Avatar />
          <div className='chat__headerInfo'>
            <h3>Room name</h3>
            <p>Last seen at...</p>
          </div>
          <div className='chat__headerRight'>
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className='chat__body'>
          {dummyData.map((message) =>
            message.direction === 'left' ? (
              <p className={`chat__message `}>
                <span className='chat__name'>{message.name}</span>
                {message.message}
                <span className='chat__timestamp'>message.timestamp</span>
              </p>
            ) : (
              <p className={`chat__message chat__receiver`}>
                <span className='chat__name'>{message.name}</span>
                {message.message}
                <span className='chat__timestamp'>message.timestamp</span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
