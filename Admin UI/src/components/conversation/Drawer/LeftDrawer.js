import React, { useEffect } from 'react';
import mqtt from 'mqtt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Button } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { List, ListItemText, ListItemIcon, ListItem } from '@material-ui/core';

const LaserAction = () => {
  let x = 90;
  let y = 0;

  const client = mqtt.connect('wss://test.mosquitto.org:8081');
  useEffect(() => {
    client.on('connect', function () {
      console.log('connected');
      client.subscribe('KAY/move-x', (err) => {
        if (!err) console.log('subscribed to KAY/move-x');
      });
      client.subscribe('KAY/move-y', (err) => {
        if (!err) console.log('subscribed to KAY/move-y');
      });
      client.subscribe('KAY/submit', (err) => {
        if (!err) console.log('subscribed to KAY/submit');
      });
    });
    return () => {
      client.unsubscribe('KAY/move-x', (err) => {
        if (!err) console.log('unsubscribe from KAY/move-x');
      });
      client.unsubscribe('KAY/move-y', (err) => {
        if (!err) console.log('unsubscribe from KAY/move-y');
      });
      client.unsubscribe('KAY/submit', (err) => {
        if (!err) console.log('unsubscribe from KAY/submit');
      });
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20,
        border: '1px solid',
      }}
    >
      <IconButton
        style={{ top: 0 }}
        onClick={() => {
          client.publish('KAY/move-y', `${++y}`);
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <div>
        <IconButton
          style={{ left: -10 }}
          onClick={() => {
            client.publish('KAY/move-x', `${--x}`);
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          style={{ right: -10 }}
          onClick={() => {
            client.publish('KAY/move-x', `${++x}`);
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
      <IconButton
        style={{ bottom: 0 }}
        onClick={() => {
          client.publish('KAY/move-y', `${--y}`);
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      {/* <Button ti/> */}
    </div>
  );
};

const LeftDrawer = ({ actions, utils }) => {
  return (
    <>
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
              <div>HEY:EY:SFDSF</div>
            </ListItem>
          ))}
      </List>
      <LaserAction />
    </>
  );
};
export default LeftDrawer;
