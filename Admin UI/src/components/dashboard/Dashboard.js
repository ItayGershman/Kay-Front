import React, { useState } from 'react';
import ScenarioCard from './ScenarioCard';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ScenarioDialog from './ScenarioDialog';

const welcomingImage =
  'https://image.shutterstock.com/image-vector/welcome-sign-colour-confetti-vector-260nw-313934588.jpg';
const equipmentImage =
  'https://i.pinimg.com/originals/7f/15/e3/7f15e30f94d19e616f0f009a29a89ec8.jpg';
const positionTrainingImage =
  'https://www.fodcontrol.com/wp-content/uploads/2013/09/trainingcomputers.jpg';
const scheduleImage =
  'https://image.shutterstock.com/image-vector/people-planning-concept-entrepreneurship-calendar-260nw-1523635688.jpg';
const presentationImage =
  'https://www.galchimia.com/wp-content/uploads/2018/03/how-to-crash-your-own-presentation-1024x787.jpg';

const Dashboard = () => {
  const [scenarios, setScenarios] = useState([
    { card: <ScenarioCard title={'Welcoming'} image={welcomingImage} /> },
    { card: <ScenarioCard title={'Equipment'} image={equipmentImage} /> },
    {
      card: (
        <ScenarioCard
          title={'Position Training'}
          image={positionTrainingImage}
        />
      ),
    },
    { card: <ScenarioCard title={'Schedule'} image={scheduleImage} /> },
    { card: <ScenarioCard title={'Presentation'} image={presentationImage} /> },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClickClose = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ margin: '30px 0px 0px 100px' }}>
          <Typography variant='h4'>Scenarios</Typography>
        </div>
        <div style={{ margin: '30px 100px 0px 0px' }}>
          <Button
            variant='contained'
            color='primary'
            endIcon={<PlaylistAddIcon />}
            onClick={handleClickOpen}
          >
            Add Scenario
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: '50px',
        }}
      >
        {scenarios.map((scenario) => {
          return <div style={{ margin: '20px' }}>{scenario.card}</div>;
        })}
      </div>
      <ScenarioDialog
        openDialog={openDialog}
        handleClickClose={handleClickClose}
      />
      {/* <Dialog
        open={openDialog}
        onClose={handleClickClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            // margin='dense'
            id='title'
            label='Scenario Title'
            type='title'
            variant="outlined"
            fullWidth
          />
          <TextField
            style={{marginTop:'20px'}}
            id='description'
            label='Scenario Description'
            type='textarea'
            variant="outlined"
            fullWidth
          />
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='contained-button-file'
            multiple
            type='file'
          />
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
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClickClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClickClose} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};
export default Dashboard;
