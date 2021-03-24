import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

const witToken = process.env.REACT_APP_WIT_ACCESS_TOKEN;
    const config = {
      headers: {
        Accept: 'application/vnd.wit.20160202+json',
        Authorization: `Bearer ${witToken}`,
        'Content-Type': 'audio/wav',
      },
    };

const intentsOptions = (intents) => {
  return intents.map((intent) => ({ value: intent.name, label: intent.name }));
};

const TrainIntents = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [capturedEntity, setCapturedEntity] = useState(false);
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const { allIntents } = useSelector((state) => state.intent);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { intent: '', utterance: '' },
  });
  const onSubmit = async (values, e) => {
    console.log(values);
    const data = {
      text:values.utterance,
      intent:values.intent.value,
      entities:[],
      traits:[]
    }
    const res = await axios.post(`https://api.wit.ai/utterances`,[data],config)
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
          render={({ onChange }) => {
            return (
              <div>
                <TextField
                  label='Utterance'
                  variant='outlined'
                  placeholder='My name is John'
                  onChange={(e) => {
                    console.log(e.target.value.length);
                    if (e.target.value[e.target.value.length - 1] === '{') {
                      setCapturedEntity(true);
                    }
                    if (e.target.value[e.target.value.length - 1] === '}') {
                      setCapturedEntity(false);
                      //set new entity
                    }
                    onChange(e.target.value + selectedEntity);
                  }}
                  defaultValue=''
                />
                {/* <select
                  hidden={!capturedEntity}
                  type='dropdown'
                  onClick={setSelectedEntity}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                </select> */}
                {/* <div
                  style={
                    capturedEntity ? { display: 'block' } : { display: 'none' }
                  }
                >
                  <Select
                    options={intentsOptions(allIntents)}
                    menuPosition={'fixed'}
                    onChange={(value) => {
                      setSelectedEntity(value);
                      onChange(value);
                    }}
                  />
                </div> */}
              </div>
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
