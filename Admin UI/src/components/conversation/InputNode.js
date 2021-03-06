import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '5px',
  },
  button: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export default memo(({ data, id }) => {
  console.log(data);
  console.log(id);
  // const [intents, setIntents] = useState([
  //   <TextField label='Intent' variant='outlined' />,
  // ]);
  // const [entity, setEntities] = useState([
  //   <TextField label='Entity' variant='outlined' />,
  // ]);
  const classes = useStyles();
  return (
    <div>
      <Handle
        type='target'
        position='left'
        style={{ backgroundColor: 'white', bottom: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      {data && data.name ? <div>Name: {data.name}</div> : <div>Scenario name</div>}
      {data && data.intent ? (
        <div>Intent: "{data.intent}"</div>
      ) : (
        <div>"Intent name"</div>
      )}
      {data && data.entity ? (
        <div>Entity: "{data.name}"</div>
      ) : (
        <div>"Entity name"</div>
      )}
      {/* <div>
        {intents.map((intent) => {
          return <div className={classes.input}>{intent}</div>;
        })}
        <Button
          onClick={() =>
            setIntents((prevState) => [
              prevState,
              <TextField label='Intent' variant='outlined' />,
            ])
          }
        >
          {intents.length > 1 && (
            <Button
              onClick={() => {
                setIntents((prevState) => {
                  return prevState.pop();
                });
              }}
            >
              <RemoveCircleIcon color='secondary' />
            </Button>
          )}
          <AddCircleIcon color='primary' />
        </Button>
      </div>

      <div>
        {entity.map((entity) => {
          return <div className={classes.input}>{entity}</div>;
        })}
        <Button
          onClick={() =>
            setEntities((prevState) => [
              prevState,
              <TextField label='Entity' variant='outlined' />,
            ])
          }
        >
          <AddCircleIcon color='primary' />
        </Button>
        {entity.length > 1 && (
          <Button
            onClick={() => {
              setEntities((prevState) => {
                return prevState.splice(prevState.length - 1, 1);
              });
            }}
          >
            <RemoveCircleIcon color='secondary' />
          </Button>
        )}
      </div> */}
      {/* <div className={classes.button}>
        <Button variant='contained' color='primary'>
          Train Kay
        </Button>
      </div>

      <div className={classes.button}>
        <Button variant='contained' color='primary'>
          Add Intent
        </Button>
      </div>
      <div className={classes.button}>
        <Button variant='contained' color='primary'>
          Add Entity
        </Button>
      </div> */}

      <Handle
        type='source'
        position='right'
        id='a'
        style={{ background: '#555' }}
      />
    </div>
  );
});
