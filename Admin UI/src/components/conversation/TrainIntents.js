import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

const intentsOptions = (intents) => {
  return intents.map((intent) => ({ value: intent.name, label: intent.name }));
};

const TrainIntents = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { allIntents } = useSelector((state) => state.intent);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { intent: '', utterance: '' },
  });
  const onSubmit = (values, e) => {
    console.log(values);
    //send result to wit
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        height: 300,
      }}
    >
      <div style={{ display: 'flex' }}>
        <Controller
          control={control}
          name='intent'
          render={({ onChange, value, name }) => {
            return (
              <div
                style={{
                  width: '230px',
                  marginBottom: '10px',
                  marginRight: '30px',
                }}
              >
                <Select
                  options={intentsOptions(allIntents)}
                  menuPosition={'fixed'}
                  onChange={(value) => {
                    setIsFixed((prevState) => !prevState);
                    onChange(value);
                  }}
                />
              </div>
            );
          }}
        />
        <Controller
          control={control}
          name='utterance'
          render={({ onChange, value, name }) => {
            return (
              <TextField
                label='Utterance'
                variant='outlined'
                placeholder='My name is John'
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                defaultValue=''
              />
            );
          }}
        />
      </div>
      <Button variant='contained' color='primary' type='submit'>
        Train Kay
      </Button>
    </form>
  );
};

export default TrainIntents;
