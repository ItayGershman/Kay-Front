import React from 'react';
import { Button, TextField } from '@material-ui/core';
import useStyles from './RegistrationStyle';
import { useForm } from 'react-hook-form';
import API from '../../API/API-requests';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    dispatch(signUp(data));
    history.push('/dashboard');
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
