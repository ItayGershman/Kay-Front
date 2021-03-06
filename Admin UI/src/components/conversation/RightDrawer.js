import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
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
  name: {
    margin: 5,
    paddingBottom: 10,
  },
}));

const RightDrawer = ({ node, elements, setElements }) => {
  const [intents, setIntents] = useState([
    <TextField label='Intent' variant='outlined' />,
  ]);
  const [entity, setEntities] = useState([
    <TextField label='Entity' variant='outlined' />,
  ]);
  const classes = useStyles();

  const handleOnChange = (value) => {
    console.log(elements);
    console.log(value);
    console.log(node);
    setElements((prevState) => {
      console.log(prevState);
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...value };
      console.log(elem);
      return [...prevState, elem];
    });
  };
  return (
    <div>
      {node && node.type === 'selectorInputNode' ? (
        <div className={classes.container}>
          <div className={classes.name}>
            <div onChange={(e) => handleOnChange({ name: e.target.value })}>
              <TextField label='name' variant='outlined' />
            </div>
          </div>
          <div>
            {intents.map((intent) => {
              return (
                <div
                  className={classes.input}
                  onChange={(e) => handleOnChange({ intent: e.target.value })}
                >
                  {intent}
                </div>
              );
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
              return (
                <div
                  className={classes.input}
                  onChange={(e) => handleOnChange({ entity: e.target.value })}
                >
                  {entity}
                </div>
              );
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
          </div>
        </div>
      ) : (
        <div>Output</div>
      )}
    </div>
  );
};

export default RightDrawer;
