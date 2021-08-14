import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import './drawer.css';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import mqtt from 'mqtt';
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import {
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Info as InfoIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from '@material-ui/icons';

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
    let defaultAction = null;
    if (action && action.value) {
      defaultAction = { value: action.value, label: action.label };
    } else {
      defaultAction = action ? { value: action, label: action } : null;
    }
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

export const LaserAction = ({
  side,
  control,
  name,
  defaultValue,
  setValue,
}) => {
  const [actionValue, setActionValue] = useState(null);
  const [x, setX] = useState(90);
  const [y, setY] = useState(0);
  const client = mqtt.connect('wss://test.mosquitto.org:8081');
  useEffect(() => {
    client.on('connect', function () {
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

  useEffect(() => {
    console.log("defaultValue:",defaultValue)
    if (side === 'right') {
      setActionValue({ label: defaultValue, value: defaultValue });
      setValue(name, defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      {side === 'left' ? (
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
              // marginTop: 10,
              width: '50%',
              padding: 10,
              border: '2px solid red',
              borderRadius: 100,
            }}
          >
            <IconButton
              style={{ top: 0 }}
              onClick={() => {
                if (y < 90) {
                  let tempY = y + 1;
                  setY(tempY);
                  client.publish('KAY/move-y', `${--tempY}`);
                }
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <div>
              <IconButton
                style={{ left: -10 }}
                onClick={() => {
                  if (x > 0) {
                    let tempX = x - 1;
                    setX(tempX);
                    client.publish('KAY/move-x', `${tempX}`);
                  }
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
                  if (x < 180) {
                    let tempX = x + 1;
                    setX(tempX);
                    client.publish('KAY/move-x', `${tempX}`);
                  }
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
              style={{ marginTop: 10, marginLeft: 20 }}
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
      ) : (
        <div style={{ margin: '20px 0px' }}>
          <h4>Choose a position you want to point at</h4>
          <div style={{ marginTop: 10 }}>
            <label>TO</label>
            <Controller
              control={control}
              name={name}
              render={({ onChange, value }) => {
                return (
                  <Select
                    value={actionValue}
                    options={[
                      { label: 'Position A', value: 'a' },
                      { label: 'Position B', value: 'b' },
                      { label: 'Position C', value: 'c' },
                    ]}
                    onChange={(value) => {
                      console.log(value)
                      
                      setActionValue(value)
                      setValue(name, defaultValue);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      )}
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
      rules={{ required: true }}
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

export const CustomCreatableDropdown = ({
  options,
  control,
  name,
  isMulti = false,
  label,
  rules,
  setValue,
  error,
  zIndex,
  type,
  defaultValue,
}) => {
  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
  const defaultOptions =
    type === 'intent'
      ? options.map((option) => createOption(option.name))
      : options;

  const [selected, setSelected] = useState({
    isLoading: false,
    options: defaultOptions,
    value: '',
  });

  const handleChange = (newValue, onChange) => {
    setSelected((prevState) => ({
      ...prevState,
      value: newValue,
    }));
    onChange(newValue);
  };
  const handleCreate = (inputValue, onChange) => {
    setSelected((prevState) => ({ ...prevState, isLoading: true }));

    setTimeout(() => {
      const newOption = createOption(inputValue);
      setSelected((prevState) => {
        return {
          isLoading: false,
          options: [...prevState.options, newOption],
          value: newOption,
        };
      });
      onChange(newOption);
    }, 1000);
  };

  useEffect(() => {
    if (
      defaultValue &&
      (selected.value === '' || selected.value.length === 0)
    ) {
      if (type === 'intent') {
        setSelected((prevState) => ({
          ...prevState,
          value: createOption(`wit_${defaultValue}`),
        }));
        setValue(name, createOption(`wit_${defaultValue}`));
      } else if (type === 'entities') {
        const values = defaultValue.map((item) => createOption(item));
        setSelected((prevState) => ({
          ...prevState,
          value: values,
        }));
      }
    } else
      setSelected((prevState) => ({ ...prevState, value: selected.value }));
  }, [defaultValue]);

  useEffect(() => {
    console.log('selected.value:', selected.value);
  }, [control]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={selected.value}
        rules={rules}
        render={({ onChange, value }) => {
          return (
            <>
              <label>{label}</label>
              <CreatableSelect
                isMulti={isMulti}
                isClearable
                isDisabled={selected.isLoading}
                isLoading={selected.isLoading}
                onChange={(newValue) => handleChange(newValue, onChange)}
                onCreateOption={(newValue) => handleCreate(newValue, onChange)}
                options={selected.options}
                value={selected.value}
                styles={{
                  container: (base, state) => ({
                    ...base,
                    opacity: state.isDisabled ? '.5' : '1',
                    backgroundColor: 'transparent',
                    zIndex,
                  }),
                }}
              />
            </>
          );
        }}
      />
      <span className='text-danger'>{error && error.message}</span>
    </>
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
  rules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
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
            value={value}
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
                width: 240,
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
              <div style={{ padding: 10, zIndex: 1000 }}>
                <Select
                  options={entitiesOptions}
                  onChange={(val) => {
                    setValue(name, `${value}${val.label}}`);
                    setCapturedEntity(0);
                  }}
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
  setValue,
  label,
  options,
  defaultValue,
  node,
}) => {
  const [action, setAction] = useState(null);
  const [prevDefaultValue, setPrevDefaultValue] = useState(null);

  useEffect(() => {
    setAction(null);
    setPrevDefaultValue(null);
    setValue(name, null);
  }, [node]);

  useEffect(() => {
    console.log('action:', action);
    setValue(name, action);
  }, [action]);

  useEffect(() => {
    //Verify if defaultValue exist on this node
    if (defaultValue) {
      if (!prevDefaultValue || defaultValue.label !== prevDefaultValue.label) {
        setAction({ label: defaultValue.label, value: defaultValue.label });
        setValue(name, defaultValue.label);
        setPrevDefaultValue({
          label: defaultValue.label,
          value: defaultValue.label,
        });
      }
    }
  }, [defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange }) => {
        return (
          <div>
            <Select
              value={action}
              styles={{
                container: (base, state) => ({
                  ...base,
                  zIndex: '999',
                }),
              }}
              maxMenuHeight={170}
              options={options}
              label={label}
              onChange={(value) => {
                onChange(value);
                setAction(value);
              }}
            />
            {action && action.label === 'Laser' && (
              <LaserAction
                side={'right'}
                control={control}
                setValue={setValue}
                name={'laser'}
                defaultValue={defaultValue ? defaultValue.value : null}
              />
            )}
            {action && action.label === 'Calendar' && <CalendarAction />}
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
      startIcon={<addCircleIcon as AddCircleIcon />}
    >
      {title}
    </Button>
  );
};
export const RemoveButton = ({ handler, index, classes, title }) => {
  return (
    <Button
      onClick={() => handler(index)}
      variant='outlined'
      style={{ color: 'red', borderColor: 'red', marginBottom: 10, height: 40 }}
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
