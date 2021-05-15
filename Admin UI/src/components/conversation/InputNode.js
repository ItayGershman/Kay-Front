import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import {Typography,Card,CardContent,makeStyles} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import CategoryIcon from '@material-ui/icons/Category';
import GamesIcon from '@material-ui/icons/Games';

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '5px',
    margin: 5,
    boxShadow: '0 0 5px',
    width: '220px',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    minWidth: 200,
    backgroundColor: '#e8eaf6',
    borderRadius: 5,
    padding: 5,
  },
  title: { fontSize: 18 },
  name: {
    borderRadius: 5,
  },
  icon: {
    marginRight: 20,
  },
  placeholder: {
    color: 'gray',
    opacity: '0.5',
    fontSize: 24,
  },
  intentIcon: {
    color: '#0091ea',
  },
  entityIcon: {
    color: '#ffd180',
  },
  speakIcon: {
    color: '#757575',
  },
  actionIcon: {
    color: '#e84545',
  },
}));

export default memo(({ data, id }) => {
  console.log(data);
  const classes = useStyles();
  return (
    <>
      <Handle
        type='target'
        position='left'
        style={{ backgroundColor: 'white', bottom: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <Card variant='outlined' className={classes.card}>
        <CardContent className={classes.node}>
          <div className={classes.name}>
            {data && data.name ? (
              <Typography
                variant='caption'
                display='block'
                gutterBottom
                className={classes.title}
                color='textSecondary'
                multiline
              >
                {data.name}
              </Typography>
            ) : (
              <Typography variant='h5'>Scenario name</Typography>
            )}
          </div>
          <div>
            {data ? (
              <div>
                {data.intent && (
                  <div className={classes.input}>
                    <AccountCircleIcon
                      className={`${classes.icon} ${classes.intentIcon}`}
                    />
                    <Typography variant='caption'>
                      Intent: {data.intent}
                    </Typography>
                  </div>
                )}
                {data.entities &&
                  data.entities.map(({ entity }) => {
                    return (
                      <div className={classes.input}>
                        <CategoryIcon
                          className={`${classes.icon} ${classes.entityIcon}`}
                        />
                        <Typography variant='caption'>
                          Entity: {entity}
                        </Typography>
                      </div>
                    );
                  })}
                {data.speak &&
                  data.speak.map(({ speak }) => {
                    return (
                      <div className={`${classes.input}`}>
                        <ChatIcon
                          className={`${classes.icon} ${classes.speakIcon}`}
                        />
                        <Typography variant='caption'>{speak}</Typography>
                      </div>
                    );
                  })}
                {data?.action && (
                  <div className={classes.input}>
                    <GamesIcon
                      className={`${classes.icon} ${classes.actionIcon}`}
                    />
                    <Typography variant='caption'>
                      action: {data.action}
                    </Typography>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className={classes.input}>
                  <AccountCircleIcon
                    className={`${classes.icon} ${classes.intentIcon}`}
                  />
                  <Typography className={classes.placeholder}>
                    "Intent name"
                  </Typography>
                </div>
                <div className={`${classes.input}`}>
                  <CategoryIcon
                    className={`${classes.icon} ${classes.entityIcon}`}
                  />
                  <Typography className={classes.placeholder}>
                    "Entity name"
                  </Typography>
                </div>

                <div className={classes.speak}>
                  <div className={`${classes.input}`}>
                    <ChatIcon
                      className={`${classes.icon} ${classes.speakIcon}`}
                    />
                    <Typography
                      variant='caption'
                      className={classes.placeholder}
                    >
                      "Speak"
                    </Typography>
                  </div>
                  <div className={classes.input}>
                    <GamesIcon
                      className={`${classes.icon} ${classes.actionIcon}`}
                    />
                    <Typography className={classes.placeholder}>
                      "Action"
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Handle
        type='source'
        position='right'
        id='a'
        style={{ background: '#555' }}
      />
    </>
  );
});
