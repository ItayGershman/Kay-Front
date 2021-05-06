import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
  node: {
    backgroundColor: 'white',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #777',
    backgroundColor: 'white',
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
}));

export default memo(({ data }) => {
  const [textToSpeak, setTextToSpeak] = useState([
    <TextField
      id={`outlined-textarea+_1`}
      label='Speak'
      placeholder='Placeholder'
      multiline
      variant='outlined'
    />,
  ]);
  const [scenarioName, setScenarioName] = useState('{{scenario name}}');
  const classes = useStyles();
  return (
    <div className={classes.node}>
      <Handle
        type='source'
        position='right'
        id='a'
        style={{ backgroundColor: 'white', bottom: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div>{scenarioName}</div>
      {textToSpeak.map((text) => {
        return (
          <div
            className={classes.input}
            onChange={(e) => {
              console.log(`${e.target.value} ->value of the input`);
            }}
          >
            {text}
          </div>
        );
      })}
      <Handle
        type='target'
        position='left'
        id='b'
        style={{ backgroundColor: 'white', bottom: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
    </div>
  );
});
