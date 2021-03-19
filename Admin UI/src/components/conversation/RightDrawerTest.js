import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import _, { remove } from 'lodash';
import { createIntent } from '../../redux/actions/intentActions';
import { useDispatch } from 'react-redux';
import { useForm, useWatch, useFieldArray, Controller } from 'react-hook-form';

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

const setTextField = ({
  control,
  name,
  label,
  defaultValue,
  setIntent,
  intent,
}) => {
  console.log(intent);
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange }) => {
        return (
          <TextField
            multiline
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

const RightDrawer = ({ node, elements, setElements, drawerState, title }) => {
  console.log('Right Drawer');
  const [intent, setIntent] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

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
        intent: ' ',
        entities: [],
        name: ' ',
        speak: [],
      };
    }
  };
  const { register, control, handleSubmit, watch, reset } = useForm({
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

  const watchFood = watch('food.name');
  const onSubmit = (data) => {
    const keys = Object.keys(data);
    let newNode = { name: title, intent: '', entities: [], speak: [] };
    keys.forEach((key) => (newNode[key] = data[key]));
    newNode.name = title;
    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      let modifiedElem = prevState.find((el) => el.id === node.id);
      modifiedElem.data = elem.data;
      return [...prevState, modifiedElem];
    });
    dispatch(createIntent(newNode));
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

  return (
    <div>
      {drawerState && (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
          <div className={classes.name}>
            <Controller
              control={control}
              name={'name'}
              defaultValue={title}
              render={({ onChange, value, name }) => {
                return (
                  <TextField
                    disabled
                    label={'Scenario name'}
                    variant='outlined'
                    name={'name'}
                    onChange={(e) => {
                      const changedData = {};
                      changedData[name] = e.target.value;
                      onChange(e.target.value);
                    }}
                    defaultValue={value}
                  />
                );
              }}
            />
          </div>
          <div className={classes.input}>
            {console.log(setInitialValues().intent)}
            {setTextField({
              control,
              name: 'intent',
              label: 'Intent name',
              defaultValue: setInitialValues().intent,
              setIntent,
              intent,
            })}
            {/* <Controller
              control={control}
              name={'intent'}
              defaultValue={setInitialValues().intent}
              render={({ onChange, onBlur, value, name, ref }) => {
                const defaultValue = setInitialValues().intent;
                return (
                  <TextField
                    label={'Intent name'}
                    variant='outlined'
                    name={name}
                    onChange={(e) => {
                      console.log(e.target.value)
                      onChange(e.target.value);
                    }}
                    defaultValue={defaultValue}
                  />
                );
              }}
            /> */}
          </div>
          <div className={classes.input}>
            <h3>Entities</h3>
            {entitiesFields.map((item, index) => {
              return (
                <div key={item.id} className={classes.input}>
                  <Controller
                    control={control}
                    name={`entities[${index}].entity`}
                    defaultValue={setInitialValues().entities[index]}
                    render={({ onChange, value, name }) => {
                      return (
                        <TextField
                          multiline
                          label={'entity'}
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
                  <Button onClick={() => entitiesRemove(index)}>
                    <RemoveCircleIcon color='secondary' />
                  </Button>
                </div>
              );
            })}
            <Button onClick={() => entitiesAppend({})}>
              <AddCircleIcon color='primary' />
            </Button>
          </div>
          <div className={classes.input}>
            <h3>Speak</h3>
            {console.log(speakFields)}
            {speakFields.map((item, index) => {
              return (
                <div key={item.id} className={classes.input}>
                  <Controller
                    control={control}
                    name={`speak[${index}].speak`}
                    defaultValue={setInitialValues().speak[index]}
                    render={({ onChange, value, name }) => {
                      return (
                        <TextField
                          multiline
                          label={'Speak'}
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
                  <Button onClick={() => speakRemove(index)}>
                    <RemoveCircleIcon color='secondary' />
                  </Button>
                </div>
              );
            })}
            <Button onClick={() => speakAppend({})}>
              <AddCircleIcon color='primary' />
            </Button>
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
