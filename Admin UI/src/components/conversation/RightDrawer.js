import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

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

const RightDrawer = ({ node, elements, setElements, drawerState }) => {
  const [intentsFields, setIntentsFields] = useState(
    <TextField multiline label='Intent' variant='outlined' />
  );
  const [entityFields, setEntitiesFields] = useState([
    <TextField multiline label='Entity' variant='outlined' />,
  ]);
  const [speakFields, setSpeakFields] = useState([
    <TextField multiline label='Speak' variant='outlined' />,
  ]);
  const [intent, setIntent] = useState();
  const [entities, setEntities] = useState([]);
  const [title, setTitle] = useState('');
  const [speak, setSpeak] = useState([]);
  const classes = useStyles();
  const cleanState = () => {
    setIntentsFields([<TextField label='Intent' variant='outlined' />]);
    setEntitiesFields([<TextField label='Entity' variant='outlined' />]);
    setSpeakFields([<TextField label='Speak' variant='outlined' />]);
    setIntent();
    setEntities([]);
    setTitle('');
    setSpeak([]);
  };

  const handleOnChange = (value, i) => {
    console.log(value);
    console.log(node);
    const key = Object.keys(value);
    console.log(key);
    if (key == 'intent') {
      setIntent(value.intent);
    } else if (key == 'entity') {
      let items = [...entities];
      let item = { ...items[i] };
      item = value;
      items[i] = item.entity;
      setEntities([...items]);
    } else if (key == 'speak') {
      console.log(i)
      let items = [...speak];
      let item = { ...items[i] };
      item = value;
      items[i] = item.speak;
      setSpeak([...items]);
    } else setTitle(value);
  };
  const handleOnClick = () => {
    const newNode = { intent, entities, name: title.name, speak };
    console.log(newNode);
    cleanState();
    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      return [...prevState, elem];
    });
  };
  return (
    <div>
      {node && node.type === 'selectorInputNode' && drawerState && (
        <div className={classes.container}>
          <div className={classes.name}>
            <div onChange={(e) => handleOnChange({ name: e.target.value })}>
              <TextField multiline label='Scenario Name' variant='outlined' />
            </div>
          </div>
          <div>
            <div
              className={classes.input}
              onChange={(e) => handleOnChange({ intent: e.target.value })}
            >
              {intentsFields}
            </div>
          </div>
          <div>
            {entityFields.map((entity, i) => {
              return (
                <div
                  className={classes.input}
                  onChange={(e) =>
                    handleOnChange({ entity: e.target.value },i)
                  }
                >
                  {entity}
                </div>
              );
            })}
            <Button
              onClick={() =>
                setEntitiesFields((prevState) => [
                  prevState,
                  <TextField label='Entity' variant='outlined' />,
                ])
              }
            >
              <AddCircleIcon color='primary' />
            </Button>
            {entityFields.length > 1 && (
              <Button
                onClick={() => {
                  setEntitiesFields((prevState) => {
                    return prevState.splice(prevState.length - 1, 1);
                  });
                }}
              >
                <RemoveCircleIcon color='secondary' />
              </Button>
            )}
          </div>
          <div>
            {speakFields.map((speak, i) => {
              return (
                <div
                  className={classes.input}
                  onChange={(e) => handleOnChange({ speak: e.target.value},i)}
                >
                  {speak}
                </div>
              );
            })}
            <Button
              onClick={() =>
                setSpeakFields((prevState) => [
                  prevState,
                  <TextField label='Speak' variant='outlined' />,
                ])
              }
            >
              <AddCircleIcon color='primary' />
            </Button>
            {speakFields.length > 1 && (
              <Button
                onClick={() => {
                  setSpeakFields((prevState) => {
                    return prevState.splice(prevState.length - 1, 1);
                  });
                }}
              >
                <RemoveCircleIcon color='secondary' />
              </Button>
            )}
          </div>
          <Button variant='contained' color='primary' onClick={handleOnClick}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default RightDrawer;
