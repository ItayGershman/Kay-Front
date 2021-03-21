import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { createIntent } from '../../redux/actions/intentActions';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

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
    width: '90%',
  },
}));

const setTextField = (
  control,
  name,
  label,
  defaultValue,
  handleOnChange,
  index
) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(
        { onChange, onBlur, value, name, ref },
      ) => {
        return (
          <TextField
            multiline
            label={label}
            variant='outlined'
            name={name}
            onChange={(e) => {
              const changedData = {};
              changedData[name] = e.target.value;
              handleOnChange(changedData, index);
            }}
            value={defaultValue}
          />
        );
      }}
    />
  );
};

const RightDrawer = ({ node, elements, setElements, drawerState }) => {
  //TODO: use useForm for this values, its easier to save the values
  const [intentField, setIntentField] = useState(null);
  const [entityFields, setEntitiesFields] = useState(null);
  const [speakFields, setSpeakFields] = useState(null);
  const [intent, setIntent] = useState();
  const [entities, setEntities] = useState([]);
  const [title, setTitle] = useState('');
  const [speak, setSpeak] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();

  const setInitialValues = () => {
    if (node?.data) {
      const { name, intent, entities, speak } = node.data;
      return {
        intent: intent,
        entities: entities,
        name: name,
        speak: speak,
      };
    } else {
      return {
        intent: '',
        entities: [],
        name: '',
        speak: [],
      };
    }
  };

  const { handleSubmit, control, reset, errors } = useForm({
    defaultValues: setInitialValues(),
  });
  const clearValues = () => {
    setIntent(null);
    setTitle('');
    setEntities([]);
    setSpeak([]);
  };
  const onSubmit = (data) => {
    console.log(title,intent,entities,speak)
  };

  const handleOnChange = (value, i) => {
    const key = Object.keys(value)[0];
    if (key.includes('intent')) {
      setIntent(value.intent);
    } else if (key.includes('entity')) {
      let items = [...entities];
      items[i] = value[key];
      setEntities([...items]);
    } else if (key.includes('speak')) {
      let items = [...speak];
      items[i] = value[key];
      setSpeak([...items]);
    } else setTitle(value.name);
  };
  const handleOnClick = () => {
    const newNode = { intent, entities, name: title.name, speak };
    dispatch(createIntent(title.name, intent, speak));

    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      let modifiedElem = prevState.find((el) => el.id === node.id);
      modifiedElem.data = elem.data;
      return [...prevState, modifiedElem];
    });
  };

  useEffect(() => {
    if (node?.data) {
      const { name, intent, entities, speak } = node.data;
      setIntent(intent);
      setTitle(name);
      setEntities(entities ? entities : []);
      setSpeak(speak ? speak : []);
    }
  }, [node]);

  return (
    <div>
      {node && node.type === 'selectorInputNode' && drawerState && (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.name}>
            <div>
              {setTextField(
                control,
                'name',
                'Scenario Name',
                title,
                handleOnChange
              )}
            </div>
          </div>
          <div className={classes.input}>
            {setTextField(
              control,
              'intent',
              'Intent name',
              intent,
              handleOnChange
            )}
            <div>{intent}</div>
          </div>
          <div>
            {entities.map((entity, i) => (
              <div className={classes.input}>
                {setTextField(
                  control,
                  `entity_${i}`,
                  'Entity name',
                  entity,
                  handleOnChange,
                  i
                )}
                <div>{entity}</div>
              </div>
            ))}
            <Button
              onClick={() =>
                setEntitiesFields((prevState) => [
                  prevState,
                  <TextField multiline label='Entity' variant='outlined' />,
                ])
              }
            >
              <AddCircleIcon color='primary' />
            </Button>
            {entityFields && entityFields.length > 1 && (
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
            {speak.map((text, i) => (
              <div className={classes.input}>
                {setTextField(
                  control,
                  `speak_${i}`,
                  'Speak',
                  text,
                  handleOnChange,
                  i
                )}
              </div>
            ))}
            <Button
              onClick={() =>
                setSpeakFields((prevState) => [
                  prevState,
                  <TextField multiline label='Speak' variant='outlined' />,
                ])
              }
            >
              <AddCircleIcon color='primary' />
            </Button>
            {speakFields && speakFields.length > 1 && (
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
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default RightDrawer;
