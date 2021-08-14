import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import { getWitEntities, ControlledTextFields } from './Drawer/Drawer-utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../generalUtils';

const CustomSearchField = ({ control, name, options, defaultValues,placeholder }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValues}
    render={({ onChange, value }) => {
      return (
        <div
          style={{
            width: '330px',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        >
          <Select
            placeholder={placeholder ? placeholder : "Select..."}
            maxMenuHeight={170}
            options={options}
            value={value}
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
  return intents.length > 0 && intents.map((intent) => ({ value: intent.name, label: intent.name }));
};



const TrainIntents = () => {
  const { allIntents } = useSelector((state) => state.intent);
  const [witEntities, setWitEntities] = useState([]);
  const defaultValues = () => ({
    intent: '',
    utterance: '',
    entity: '',
    entity_value: '',
  });
  const { handleSubmit, control, reset } = useForm({ defaultValues });

  const onSubmit = async (values, e) => {
    let start = values.utterance.indexOf(values.entity_value);
    let end = start + values.entity_value.length - 1;
    const entities = values.entity
      ? [
          {
            entity: `${values.entity.value}:${values.entity.value}`,
            body: values.entity_value,
            entities: [],
            start,
            end,
          },
        ]
      : [];
    const data = {
      text: values.utterance,
      intent: values.intent.value,
      entities: entities,
      traits: [],
    };

    try {
      const res = await axios.post(
        `https://api.wit.ai/utterances`,
        [data],
        config
      );
      if (res.status === 200) notify('Submitted!', 'success');
      else notify('Could train Kay at the moment', 'error');
    } catch (e) {
      notify(e, 'error')
    }
    reset(defaultValues());
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
          defaultValues={defaultValues().intent}
          placeholder={"Select Intent..."}
        />
        <ControlledTextFields
          control={control}
          label={null}
          name={'utterance'}
          defaultValue={""}
          isDisabled={false}
          isMultiline={true}
          placeholder={'Utterance: My name is John'}
          rules={{ required: true }}
        />
        <CustomSearchField
          control={control}
          name={'entity'}
          options={witEntities}
          defaultValues={defaultValues().entity}
          placeholder={"Select Entity..."}
        />
        <ControlledTextFields
          control={control}
          label=''
          name={'entity_value'}
          defaultValue={""}
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
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default TrainIntents;
