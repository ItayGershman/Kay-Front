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
        { invalid, isTouched, isDirty }
      ) => {
        return (
          <TextField
            multiline
            label={label}
            variant='outlined'
            name={name}
            // inputRef={ref}
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

const RightDrawer = ({ node, elements, setElements, drawerState, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const setInitialValues = () => {
    
    if (node?.data) {
      console.log(node);
      const { name, intent, entities, speak } = node.data;
      const speakArray = speak.map((text) => text.speak);
      //   console.log(speakArray);
      const entitiesArray = entities.map(({ entity }) => entity);
      console.log(intent);
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
    let newNode = { name: '', intent: '', entities: [], speak: [] };
    keys.forEach((key) => (newNode[key] = data[key]));
    dispatch(createIntent(newNode));

    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      let modifiedElem = prevState.find((el) => el.id === node.id);
      modifiedElem.data = elem.data;
      return [...prevState, modifiedElem];
    });
  };

  useEffect(() => {
    reset({ intent: '', name: '', speak: [], entities: [] });
    const { entities, speak } = setInitialValues();
    speak.forEach((text) => speakAppend({ speak: text }));
    entities.forEach((entity) => speakAppend({ entity: entity }));
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
            <Controller
              control={control}
              name={'intent'}
              defaultValue={setInitialValues().intent}
              render={({ onChange, onBlur, value, name, ref }) => {
                return (
                  <TextField
                    label={'Intent name'}
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
          </div>
          <div className={classes.input}>
            <h3>Entities</h3>
            {entitiesFields.map((item, index) => {
              return (
                <div key={item.id} className={classes.input}>
                  <Controller
                    control={control}
                    name={`entities[${index}].entity`}
                    defaultValue={item.value}
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
            {speakFields.map((item, index) => {
              console.log(item);
              return (
                <div key={item.id} className={classes.input}>
                  <Controller
                    control={control}
                    name={`speak[${index}].speak`}
                    defaultValue={item.speak}
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
