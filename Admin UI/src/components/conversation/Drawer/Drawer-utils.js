import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  IconButton,
  Typography,
} from '@material-ui/core';
import './drawer.css';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import mqtt from 'mqtt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
  if (node && node.data) {
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

export const LaserAction = () => {
  const [x, setX] = useState(90);
  const [y, setY] = useState(0);
  const client = mqtt.connect('wss://test.mosquitto.org:8081');
  useEffect(() => {
    client.on('connect', function () {
      console.log('connected');
      client.subscribe('KAY/move-x', (err) => {
        if (!err) console.log('subscribed to KAY/move-x');
      });
      client.subscribe('KAY/move-y', (err) => {
        if (!err) console.log('subscribed to KAY/move-y');
      });
      client.subscribe('KAY/submit', (err) => {
        if (!err) console.log('subscribed to KAY/submit');
      });
    });
    return () => {
      client.unsubscribe('KAY/move-x', (err) => {
        if (!err) console.log('unsubscribe from KAY/move-x');
      });
      client.unsubscribe('KAY/move-y', (err) => {
        if (!err) console.log('unsubscribe from KAY/move-y');
      });
      client.unsubscribe('KAY/submit', (err) => {
        if (!err) console.log('unsubscribe from KAY/submit');
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
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 10,
          width: '100%',
          border: '1px solid',
          borderRadius: 25,
        }}
      >
        <IconButton
          style={{ top: 0 }}
          onClick={() => {
            let tempY = y + 1;
            setY(tempY);
            client.publish('KAY/move-y', `${--tempY}`);
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <div>
          <IconButton
            style={{ left: -10 }}
            onClick={() => {
              let tempX = x - 1;
              setX(tempX);
              client.publish('KAY/move-x', `${tempX}`);
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton style={{ left: 0 }}>
            <FiberManualRecordIcon
              className='tv-pulse-btn'
              style={{ color: 'red' }}
            />
          </IconButton>
          <IconButton
            style={{ right: -10 }}
            onClick={() => {
              let tempX = x + 1;
              setX(tempX);
              client.publish('KAY/move-x', `${tempX}`);
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
        <IconButton
          style={{ bottom: 0 }}
          onClick={() => {
            if (y > 0) {
              let tempY = y - 1;
              setY(tempY);
              client.publish('KAY/move-y', `${tempY}`);
            }
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 100,
          marginTop: 10,
        }}
      >
        <span>x : {x}</span>|<span>y : {y}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 150,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          type='submit'
          style={{ marginTop: 10 }}
          onClick={() => {
            client.publish('KAY/submit', '');
            setX(90);
            setY(0);
          }}
        >
          Set Laser
        </Button>
        <Tooltip
          title='This Laser tool assist in pointing and managing equipment location at the center'
          style={{ marginTop: 15, fontSize: 16, fontWeight: 500 }}
        >
          <Typography>
            <InfoIcon />
          </Typography>
        </Tooltip>
      </div>
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
  console.log('defaultValue:', defaultValue);
  const [action, setAction] = useState(defaultValue);
  return (
    <Controller
      control={control}
      name={name}
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
