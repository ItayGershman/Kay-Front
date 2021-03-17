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

const RightDrawer = ({ node, elements, setElements, drawerState }) => {
  const { register, control, handleSubmit, watch } = useForm();
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
  const onSubmit = (data) => console.log('data', data);
  console.log('Food', watchFood);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h5>FOOD</h5>

          {entitiesFields.map((item, index) => {
            return (
              <div key={item.id}>
                {console.log(item)}
                {/* <input
                name={`food[${index}].name`}
                ref={register}
                placeholder="food name..."
                onChange={watchFood}
              /> */}
                {/* <Controller
                  control={control}
                  onChange={([selected]) => {
                    // React Select return object instead of value for selection
                    return { value: selected };
                  }}
                  name={`entities[${index}].name`}
                  defaultValue={`person`}
                /> */}
                <Controller
                  control={control}
                  name={'entity'}
                  defaultValue={'defaultValue'}
                  render={({ onChange, onBlur, value, name, ref }) => {
                    return (
                      <TextField
                        multiline
                        label={'entity'}
                        variant='outlined'
                        name={name}
                        // inputRef={ref}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        defaultValue={value}
                      />
                    );
                  }}
                />
                {/* {watchFood==='Burger'&& 'Burger'} */}

                <button type='button' onClick={() => entitiesRemove(index)}>
                  Delete
                </button>
              </div>
            );
          })}
          <button
            type='button'
            onClick={() => {
              entitiesAppend({ name: '' });
            }}
          >
            append food
          </button>
        </div>
        <ul>
          <h5>DRINKS</h5>
          {speakFields.map((item, index) => {
            return (
              <li key={item.id}>
                <input name={`speak[${index}].name`} ref={register} />
                <button type='button' onClick={() => speakRemove(index)}>
                  Delete
                </button>
              </li>
            );
          })}
          <button
            type='button'
            onClick={() => {
              speakAppend({ name: 'New speak' });
            }}
          >
            append speak
          </button>
        </ul>

        <input type='submit' />
      </form>
    </div>
  );
};

export default RightDrawer;
