import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './RegistrationStyle';

export default function Register() {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='name'
        label='Full Name'
        name='name'
        autoFocus
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
      />
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
