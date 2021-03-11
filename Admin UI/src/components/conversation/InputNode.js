import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';

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
  // cardcontent: {
  //   padding: 0,
  //   "&:last-child": {
  //     paddingBottom: 0
  //   }
  // }
}));

export default memo(({ data, id }) => {
  console.log(data);
  const { name, intent, entities, speak } = data;
  console.log(entities);
  console.log(speak);
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
                {name}
              </Typography>
            ) : (
              <Typography variant='h5'>Scenario name</Typography>
            )}
          </div>
          {data ? (
            <div>
              {intent && (
                <div className={classes.input}>
                  <AccountCircleIcon className={classes.icon} />
                  {intent && (
                    <Typography variant='caption'>Intent: {intent}</Typography>
                  )}
                </div>
              )}
              {console.log(entities)}
              {entities &&
                entities.map((entity) => {
                  console.log(entity);
                  return (
                    <div className={classes.input}>
                      <AccountCircleIcon className={classes.icon} />
                      <Typography variant='caption'>Entity: {entity}</Typography>
                    </div>
                  );
                })}
              <div className={classes.speak}>
                {speak &&
                  speak.map((text) => {
                    return (
                      <div className={`${classes.input}`}>
                        <ChatIcon className={classes.icon} />
                        <Typography variant='caption'>{text}</Typography>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.input}>
                <AccountCircleIcon className={classes.icon} />
                <Typography className={classes.placeholder}>
                  "Intent name"
                </Typography>
              </div>
              <div className={`${classes.input}`}>
                <AccountCircleIcon className={classes.icon} />
                <Typography className={classes.placeholder}>
                  "Entity name"
                </Typography>
              </div>
              <div className={`${classes.input}`}>
                <ChatIcon className={classes.icon} />
                <Typography variant='caption' className={classes.placeholder}>
                  "Speak"
                </Typography>
              </div>
            </div>
          )}
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
