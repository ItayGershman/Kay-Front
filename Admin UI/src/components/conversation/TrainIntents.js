import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import { getWitEntities, ControlledTextFields } from './Drawer/Drawer-utils';

const CustomSearchField = ({ control, name, options }) => (
  <Controller
    control={control}
    name={name}
    render={({ onChange, value, name }) => {
      return (
        <div
          style={{
            width: '330px',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        >
          <Select
            maxMenuHeight={170}
            options={options}
            onChange={(value) => {
              onChange(value);
            }}
          />
        </div>
      );
    }}
  />
);

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
  const { allIntents } = useSelector((state) => state.intent);
  const [witEntities, setWitEntities] = useState([]);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { intent: '', utterance: '' },
  });
  const onSubmit = async (values, e) => {
    let start = values.utterance.indexOf(values.entity_value);
    let end = start + values.entity_value.length - 1;
    const data = {
      text: values.utterance,
      intent: values.intent.value,
      entities: [
        {
          entity: `${values.entity.value}:${values.entity.value}`,
          body: values.entity_value,
          entities: [],
          start,
          end,
        },
      ],
      traits: [],
    };
    const res = await axios.post(
      `https://api.wit.ai/utterances`,
      [data],
      config
    );
    e.target.reset();
  };

  useEffect(async () => {
    setWitEntities(await getWitEntities());
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CustomSearchField
          control={control}
          name={'intent'}
          options={intentsOptions(allIntents)}
        />
        <ControlledTextFields
          control={control}
          label=''
          name={'utterance'}
          defaultValue=''
          isDisabled={false}
          isMultiline={true}
          placeholder={'Utterance: My name is John'}
        />
        <CustomSearchField
          control={control}
          name={'entity'}
          options={witEntities}
        />
        <ControlledTextFields
          control={control}
          label=''
          name={'entity_value'}
          defaultValue=''
          isDisabled={false}
          isMultiline={true}
          placeholder={'Entity: John'}
        />
      </div>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        style={{ marginTop: 10 }}
      >
        Train Kay
      </Button>
    </form>
  );
};

export default TrainIntents;
