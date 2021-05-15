import React from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from '@material-ui/core';
import useStyles from './RegistrationStyle';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/actions/userActions';

export default function Login() {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.userSignin);
  console.log(userSelector);
  const onSubmit = (data) => dispatch(signin(data));

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
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
      {userSelector.error && (
        <div style={{ color: 'red' }}>Wrong username or password</div>
      )}
      <FormControlLabel
        control={<Checkbox value='remember' color='primary' />}
        label='Remember me'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Login
      </Button>

      <Grid container>
        <Grid item xs>
          <Link href='#' variant='body2'>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href='/register' variant='body2'>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
