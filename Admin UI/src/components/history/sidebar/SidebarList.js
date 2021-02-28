import React, { useState } from 'react';
import useStyles from '../HistoryStyle';
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

import { getConversation,deleteConversation } from '../../../redux/actions/historyActions';

const SidebarList = ({ conversation }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      style={{ position: 'relative' }}
      className={classes.sidebarChat}
      onClick={() => dispatch(getConversation(conversation.id))}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* <Avatar /> */}
      <div className={classes.sidebarChatInfo}>
        {/* Should get from redux */}
        <h2>{conversation.title}</h2>
        {/* {conversation.text[strlen(text)].message} */}
        <p>{conversation.text[conversation.text.length - 1].message}</p>
        {isHovered && (
          <div className={classes.trashIcon} onClick={()=>{dispatch(deleteConversation(conversation.id))}}>
            <DeleteIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarList;
