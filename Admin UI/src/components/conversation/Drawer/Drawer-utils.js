import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    marginBottom:5
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

const LaserAction = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20,
      }}
    >
      <TextField
        style={{ marginBottom: 10 }}
        multiline={false}
        placeholder='32'
        label='Position x'
        variant='outlined'
        onChange={(e) => {
          setPosition((prevState) => ({ ...prevState, x: e.target.value }));
        }}
        defaultValue={position.x}
      />
      <TextField
        multiline={false}
        placeholder='12'
        label='Position y'
        variant='outlined'
        onChange={(e) => {
          setPosition((prevState) => ({ ...prevState, y: e.target.value }));
        }}
        value={position.y}
      />
    </div>
  );
};

const CalendarAction = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='Date picker inline'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          autoOk
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
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

export const ActionField = ({ control, name, label, options }) => {
  const [action, setAction] = useState(null);
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange }) => {
        return (
          <div>
            <Select
              styles={{
                container: (base, state) => ({
                  ...base,
                  zIndex: '999',
                }),
              }}
              placeholder='Action: Laser'
              maxMenuHeight={170}
              options={options}
              label={label}
              onChange={(value) => {
                onChange(value);
                setAction(value);
                console.log(value);
              }}
            />
            {action && action.label === 'Laser' && <LaserAction />}
            {action && action.label === 'Calendar' && <CalendarAction />}
            {action && action.label === 'Video' && <LaserAction />}
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
      style={{ backgroundColor: 'red', color: 'white', marginBottom: 10 }}
      className={classes.button}
    >
      <RemoveCircleIcon />
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
