import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
const LeftDrawer = ({ actions, utils }) => {
  return (
    <div>
      <List>
        {actions &&
          actions.map((action, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                action.handler(action.name);
              }}
            >
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText primary={action.title} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {utils &&
          utils.map((util, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                util.handler(util.name);
              }}
            >
              <ListItemIcon>{util.icon}</ListItemIcon>
              <ListItemText primary={util.title} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default LeftDrawer;
