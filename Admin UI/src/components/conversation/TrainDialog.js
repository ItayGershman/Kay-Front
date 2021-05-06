import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import TrainIntents from './TrainIntents';

const TrainDialog = ({ openDialog, handleClickClose }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Dialog
      style={{ height: '700px' }}
      fullWidth={'xl'}
      open={openDialog}
      onClose={handleClickClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title' onClose={() => {}}>
        Train Kay
      </DialogTitle>
      <DialogContent dividers>
        <TrainIntents />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClickClose(false)}
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

export default TrainDialog;
