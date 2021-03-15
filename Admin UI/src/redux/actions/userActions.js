import axios from 'axios';
import Cookie from 'js-cookie';
import API from '../../API/API-requests';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from '../constants/actionTypes';

const signin = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await API.login(email, password);
    console.log(data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const signUp = ({ fName, lName, password, email }) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await API.createUser(fName, lName, password,email);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.token });
    Cookie.set('userInfo', JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export { signin, signUp };
