import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import { createIntent, updateIntent } from '../../redux/actions/intentActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useWatch, useFieldArray, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';

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
    width: '100%',
  },
  button: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const setIntentField = ({
  control,
  name,
  label,
  defaultValue,
  setIntent,
  intent,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange }) => {
        return (
          <TextField
            multiline={false}
            placeholder='getName'
            label={label}
            variant='outlined'
            onChange={(e) => {
              setIntent(e.target.value);
              onChange(e.target.value);
            }}
            value={intent}
          />
        );
      }}
    />
  );
};

const setTextField = ({
  control,
  name,
  label,
  defaultValue,
  isDisabled,
  isMultiline,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value, name }) => {
        return (
          <TextField
            disabled={isDisabled}
            multiline={isMultiline}
            label={label}
            variant='outlined'
            name={name}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            defaultValue={value}
          />
        );
      }}
    />
  );
};

const SpeakTextField = ({
  control,
  name,
  label,
  defaultValue,
  isDisabled,
  isMultiline,
  setValue,
  entitiesOptions,
}) => {
  const [capturedEntity, setCapturedEntity] = useState(0);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value, name }) => {
        return (
          <div>
            <TextField
              style={{
                height: 'fit-content',
                width: '100%',
              }}
              disabled={isDisabled}
              multiline={isMultiline}
              label={label}
              variant='outlined'
              name={name}
              onChange={(e) => {
                if (e.target.value[e.target.value.length - 1] === '{') {
                  setCapturedEntity(1);
                }
                if (e.target.value[e.target.value.length - 1] === '}') {
                  setCapturedEntity(0);
                }
                onChange(e.target.value);
              }}
              value={value}
            />
            {capturedEntity === 1 && (
              <Select
                options={entitiesOptions}
                onChange={(val) => setValue(name, `${value}${val.label}}`)}
              />
            )}
          </div>
        );
      }}
    />
  );
};

const AppendButton = ({ handler, classes, title }) => {
  return (
    <Button
      onClick={() => handler({})}
      variant='contained'
      color='primary'
      className={classes.button}
      startIcon={<AddCircleIcon />}
    >
      {title}
    </Button>
  );
};
const RemoveButton = ({ handler, index, classes, title }) => {
  return (
    <Button
      onClick={() => handler(index)}
      variant='contained'
      color='secondary'
      className={classes.button}
      startIcon={<RemoveCircleIcon />}
    >
      {title}
    </Button>
  );
};

const RightDrawer = ({ node, setElements, drawerState, title }) => {
  const [intent, setIntent] = useState(null);
  const [entities, setEntities] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allIntents } = useSelector((state) => state.intent);

  const setInitialValues = () => {
    if (node?.data) {
      const { name, intent, entities, speak } = node.data;
      const speakArray = speak.map((text) => text.speak);
      const entitiesArray = entities.map(({ entity }) => entity);
      return {
        intent: intent,
        entities: entitiesArray,
        name,
        speak: speakArray,
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
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: setInitialValues(),
  });
  const {
    fields: entitiesFields,
    append: entitiesAppend,
    remove: entitiesRemove,
  } = useFieldArray({ control, name: 'entities' });
  const {
    fields: speakFields,
    append: speakAppend,
    remove: speakRemove,
  } = useFieldArray({ control, name: 'speak' });

  const onSubmit = (data) => {
    console.log(node);
    console.log(`data:${JSON.stringify(data)}`);
    const keys = Object.keys(data);
    console.log(keys);
    let newNode = { name: title, intent: '', entities: [], speak: [] };
    keys.forEach((key) => (newNode[key] = data[key]));
    newNode.name = title;
    if (newNode['intent'] === '') newNode['intent'] = intent;
    const isExist = allIntents.some(
      (intent) => intent.name === `wit_${newNode.intent}`
    );
    if (node.data === undefined) {
      dispatch(createIntent(newNode, isExist));
    } else dispatch(updateIntent(newNode));
    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      return [...prevState];
    });
  };

  useEffect(() => {
    //Clear old form
    speakRemove([...Array(speakFields.length).keys()]);
    entitiesRemove([...Array(entitiesFields.length).keys()]);
    //Set new form
    const { entities, speak, intent } = setInitialValues();
    setIntent(intent);
    speak.forEach((text) => speakAppend({ speak: text }));
    entities.forEach((entity) => entitiesAppend({ entity: entity }));
  }, [node]);
  useEffect(async () => {
    //Set entities options
    const witToken = process.env.REACT_APP_WIT_ACCESS_TOKEN;
    const { data } = await axios.get(`https://api.wit.ai/entities?v=20200513`, {
      headers: {
        Authorization: `Bearer ${witToken}`,
      },
    });
    setEntities(
      data
        .filter((entity) => {
          return !entity.name.startsWith('wit');
        })
        .map(({ name }) => ({
          value: name,
          label: name,
        }))
    );
  }, []);

  return (
    <div>
      {drawerState && node && (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
          <div className={classes.input}>
            {setTextField({
              control,
              name: 'name',
              label: 'Scenario Name',
              defaultValue: title,
              isDisabled: true,
              isMultiline: false,
            })}
          </div>
          <div className={classes.input}>
            {setIntentField({
              control,
              name: 'intent',
              label: 'Intent name',
              defaultValue: setInitialValues().intent,
              setIntent,
              intent,
            })}
          </div>
          <div className={classes.input}>
            {entitiesFields.map((item, index) => {
              return (
                <div key={item.id} className={classes.input}>
                  {setTextField({
                    control,
                    name: `entities[${index}].entity`,
                    label: 'Entity',
                    defaultValue: setInitialValues().entities[index],
                    isDisabled: false,
                    isMultiline: true,
                  })}
                  <RemoveButton
                    handler={entitiesRemove}
                    index={index}
                    title={'Remove Entity'}
                    classes={classes}
                  />
                </div>
              );
            })}
            <AppendButton
              handler={entitiesAppend}
              title={'Add Entity'}
              classes={classes}
            />
          </div>
          <div className={classes.input}>
            {speakFields.map((item, index) => {
              return (
                <div key={item.id} className={classes.input}>
                  <SpeakTextField
                    control={control}
                    name={`speak[${index}].speak`}
                    label={'Speak'}
                    defaultValue={setInitialValues().speak[index]}
                    isDisabled={false}
                    isMultiline={true}
                    index={index}
                    setValue={setValue}
                    entitiesOptions={entities}
                  />
                  <RemoveButton
                    handler={speakRemove}
                    index={index}
                    title={'Remove Speak'}
                    classes={classes}
                  />
                </div>
              );
            })}
            <AppendButton
              handler={speakAppend}
              title={'Add Speak'}
              classes={classes}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default RightDrawer;
