import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios'

export const useStyles = makeStyles((theme) => ({
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

export const setInitialValues = (node) => {
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

export const IntentField = ({
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

export const ControlledTextFields = ({
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
            label={label}
            multiline={isMultiline}
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

export const SpeakTextField = ({
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
                height: '100%',
                width: '100%',
              }}
              disabled={isDisabled}
              multiline={isMultiline}
              rowsMax={6}
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

export const AppendButton = ({ handler, classes, title }) => {
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
export const RemoveButton = ({ handler, index, classes, title }) => {
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

export const getWitEntities = async () => {
  const witToken = process.env.REACT_APP_WIT_ACCESS_TOKEN;
  const { data } = await axios.get(`https://api.wit.ai/entities?v=20200513`, {
    headers: {
      Authorization: `Bearer ${witToken}`,
    },
  });
  return data
    .filter((entity) => {
      return !entity.name.startsWith('wit');
    })
    .map(({ name }) => ({
      value: name,
      label: name,
    }));
};
