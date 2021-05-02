import axios from 'axios';
import API from '../../API/API-requests';
import {
  INTENTS_GET_REQUEST,
  INTENTS_GET_SUCCESS,
  INTENTS_GET_FAIL,
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

const witToken = process.env.REACT_APP_WIT_ACCESS_TOKEN;
const config = {
  headers: {
    Accept: 'application/vnd.wit.20160202+json',
    Authorization: `Bearer ${witToken}`,
    'Content-Type': 'audio/wav',
  },
};

const createIntent = ({ name, intent, speak, entities }, isExist) => async (
  dispatch
) => {
  dispatch({ type: INTENT_CREATE_REQUEST });
  try {
    console.log(entities);
    const { data } = await API.createIntent(name, intent, speak, entities);
    dispatch({ type: INTENT_CREATE_SUCCESS, payload: data });
    const intentName = `wit_${intent}`;
    //Check if intent already exist in Wit.ai
    if (!isExist)
      axios.post(
        `https://api.wit.ai/intents`,
        {
          name: intentName,
        },
        config
      );
  } catch (error) {
    console.log(error);
    return dispatch({ type: INTENT_CREATE_FAIL, payload: error.message });
  }
};
const updateIntent = ({ name, intent, speak, entities }, isExist) => async (
  dispatch
) => {
  console.log('update');
  dispatch({ type: INTENT_UPDATE_REQUEST }); //loading =>true
  try {
    const res = await API.updateIntent(name, intent, speak, entities);
    dispatch({ type: INTENT_UPDATE_SUCCESS, payload: res });
    const intentName = `wit_${intent}`;
    //Check if intent already exist in Wit.ai
    if (!isExist) {
      axios
        .post(
          `https://api.wit.ai/intents`,
          {
            name: intentName,
          },
          config
        )
        .then((res) => console.log(res.data));
    }
  } catch (error) {
    dispatch({ type: INTENT_UPDATE_FAIL, payload: error.message });
  }
};
const getAllIntents = () => async (dispatch) => {
  dispatch({ type: INTENTS_GET_REQUEST });
  try {
    const config = {
      headers: {
        Accept: 'application/vnd.wit.20160202+json',
        Authorization: `Bearer ${witToken}`,
        'Content-Type': 'audio/wav',
      },
    };
    const { data } = await axios.get(`https://api.wit.ai/intents`, config);
    console.log(data);
    dispatch({ type: INTENTS_GET_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: INTENTS_GET_FAIL });
  }
};

export { createIntent, updateIntent, getAllIntents };
