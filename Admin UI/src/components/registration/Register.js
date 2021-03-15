import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './RegistrationStyle';
import { useForm } from 'react-hook-form';
import API from '../../API/API-requests';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/userActions';

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(signUp(data));
  };
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='fName'
        label='First Name'
        name='fName'
        autoFocus
        inputRef={register({ required: true })}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='lName'
        label='Last Name'
        name='lName'
        autoFocus
        inputRef={register({ required: true })}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        inputRef={register({ required: true })}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        inputRef={register({ required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Register
      </Button>
    </form>
  );
}
