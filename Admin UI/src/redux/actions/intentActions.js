import axios from 'axios';
import API from '../../API/API-requests';
import {
  INTENT_GET_REQUEST,
  INTENT_GET_SUCCESS,
  INTENT_GET_FAIL,
  INTENT_CREATE_REQUEST,
  INTENT_CREATE_SUCCESS,
  INTENT_CREATE_FAIL,
  INTENT_UPDATE_REQUEST,
  INTENT_UPDATE_SUCCESS,
  INTENT_UPDATE_FAIL,
  INTENT_DELETE_REQUEST,
  INTENT_DELETE_SUCCESS,
  INTENT_DELETE_FAIL,
} from '../constants/actionTypes';

const createIntent = ({ name, intent, speak, entities }) => async (
  dispatch
) => {
  console.log(name, intent, speak, entities)
  dispatch({ type: INTENT_CREATE_REQUEST }); //loading =>true
  try {
    const { data } = await API.createIntent(name, intent, speak);
    console.log(data)
    return dispatch({ type: INTENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: INTENT_CREATE_FAIL, payload: error.message });
  }
};
const updateIntent = (scenario, intentName, speak) => async (dispatch) => {
  dispatch({ type: INTENT_UPDATE_REQUEST }); //loading =>true
  try {
    const res = await API.createIntent(scenario, intentName, speak);
    dispatch({ type: INTENT_UPDATE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: INTENT_UPDATE_FAIL, payload: error.message });
  }
};

export { createIntent, updateIntent };
