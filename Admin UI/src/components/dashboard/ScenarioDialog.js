import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import { useDispatch } from 'react-redux';
import {
  createScenario,
  updateScenario,
} from '../../redux/actions/conversationActions';

const ScenarioDialog = ({
  dialogStatus,
  handleCloseDialog,
  setScenarios,
  content,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const scenario = { name, description, image };
    if (Object.keys(content).length === 0) dispatch(createScenario(scenario));
    else dispatch(updateScenario(content.title, scenario));
    handleCloseDialog();
    setScenarios((prevState) => [...prevState, scenario]);
  };
  useEffect(() => {
    console.log(content);
    if (Object.keys(content).length !== 0) {
      setName(content.title);
      setDescription(content.description);
      setImage(content.image);
    } else {
      setName('');
      setDescription('');
      setImage('');
    }
  }, [content]);
  return (
    <Dialog
      fullWidth
      open={dialogStatus}
      onClose={handleCloseDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title' onClose={() => {}}>
        New Scenario
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          id='title'
          label='Scenario Title'
          type='title'
          variant='outlined'
          fullWidth
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          style={{ marginTop: '20px' }}
          id='description'
          label='Scenario Description'
          type='text'
          variant='outlined'
          multiline
          rows={4}
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='contained-button-file'
          multiple
          type='file'
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <label htmlFor='contained-button-file'>
            <Button
              variant='contained'
              color='primary'
              component='span'
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: '20px' }}
            >
              Upload Image
            </Button>
          </label>
          <Divider orientation='vertical' flexItem />
          <TextField
            style={{ marginTop: '20px' }}
            id='description'
            margin='dense'
            label='URL'
            type='text'
            variant='outlined'
            onChange={(e) => setImage(e.target.value)}
            value={content.image}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
          <Divider />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
          color='secondary'
          variant='contained'
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScenarioDialog;
