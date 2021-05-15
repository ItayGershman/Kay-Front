import React, { useState, useEffect } from 'react';
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
import { IconButton } from '@material-ui/core';
import mqtt from 'mqtt';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
    marginBottom: 5,
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
    console.log('node.data:', node.data);
    const { name, intent, entities, speak, action } = node.data;
    const speakArray = speak.map((text) => text.speak);
    const entitiesArray = entities.map(({ entity }) => entity);
    const defaultAction = action ? { value: action, label: action } : null;
    return {
      intent: intent,
      entities: entitiesArray,
      name,
      speak: speakArray,
      action: defaultAction,
    };
  } else {
    return {
      intent: '',
      entities: [],
      name: '',
      speak: [],
      action: null,
    };
  }
};

const LaserAction = () => {
  let x = 0;
  let y = 0;

  const client = mqtt.connect('wss://test.mosquitto.org:8081');
  useEffect(() => {
    client.on('connect', function () {
      console.log('connected');
      client.subscribe('CoreElectronics/move-x', (err) => {
        if (!err) console.log('subscribed to CoreElectronics/move-x');
      });
      client.subscribe('CoreElectronics/move-y', (err) => {
        if (!err) console.log('subscribed to CoreElectronics/move-y');
      });
    });
    return () => {
      client.unsubscribe('CoreElectronics/move-y', (err) => {
        if (!err) console.log('unsubscribe from CoreElectronics/move-x');
      });
      client.unsubscribe('CoreElectronics/move-x', (err) => {
        if (!err) console.log('unsubscribe from CoreElectronics/move-y');
      });
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20,
        border: '1px solid',
      }}
    >
      <IconButton
        style={{ top: 0 }}
        onClick={() => {
          client.publish('CoreElectronics/move-y', `${++y}`);
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <div>
        <IconButton
          style={{ left: -10 }}
          onClick={() => {
            client.publish('CoreElectronics/move-x', `${--x}`);
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          style={{ right: -10 }}
          onClick={() => {
            client.subscribe('CoreElectronics/move-x', function (err) {
              if (!err) {
                client.publish('CoreElectronics/move-x', `${++x}`);
              }
            });
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
      <IconButton
        style={{ bottom: 0 }}
        onClick={() => {
          client.subscribe('CoreElectronics/move-x', function (err) {
            if (!err) {
              client.publish('CoreElectronics/move-y', `${--y}`);
            }
          });
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

      {/* <TextField
        style={{ marginBottom: 10 }}
        multiline={false}
        placeholder='32'
        label='Position x'
        variant='outlined'
        onChange={(e) => {
          //useDebounce
          client.subscribe('CoreElectronics/move-x', function (err) {
            if (!err) {
              client.publish('CoreElectronics/move-x', e.target.value);
            }
          });
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
          client.subscribe('CoreElectronics/move-y', function (err) {
            if (!err) {
              client.publish('CoreElectronics/move-y', e.target.value);
            }
          });
          setPosition((prevState) => ({ ...prevState, y: e.target.value }));
        }}
        value={position.y}
      /> */}
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
  placeholder,
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
            placeholder={placeholder}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              <div style={{ padding: 10 }}>
                {console.log(entitiesOptions)}
                <Select
                  options={entitiesOptions}
                  onChange={(val) => setValue(name, `${value}${val.label}}`)}
                />
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export const ActionField = ({
  control,
  name,
  label,
  options,
  defaultValue,
}) => {
  const [action, setAction] = useState(defaultValue);
  return (
    <Controller
      control={control}
      name={name}
      // defaultValue={action}
      render={({ onChange }) => {
        return (
          <div>
            <Select
              value={defaultValue}
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
            {/* {action && action.label === 'Video' && <LaserAction />} */}
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
  const { data } = await axios.get(`https://api.wit.ai/entities`, {
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
