import API from '../../API/API-requests';

// import axios from 'axios';
const {
  HISTORY_GET_ALL_REQUEST,
  HISTORY_GET_ALL_SUCCESS,
  HISTORY_GET_ALL_FAIL,
  HISTORY_GET_REQUEST,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_DELETE_FAIL,
} = require('../constants/actionTypes');

const getAllHistory = () => async (dispatch) => {
  dispatch({ type: HISTORY_GET_ALL_REQUEST });
  try {
    const {data} = await API.getHistory();
    console.log('history:',data);
    dispatch({ type: HISTORY_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HISTORY_GET_ALL_FAIL, payload: error.message });
  }
};
const getConversation = (id) => async (dispatch) => {
  dispatch({ type: HISTORY_GET_REQUEST,payload:id });
  try {
    //need to send to the server.
    dispatch({ type: HISTORY_GET_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: HISTORY_GET_FAIL, payload: error.message });
  }
};

const deleteConversation = (id) => async (dispatch) => {
  dispatch({ type: HISTORY_DELETE_REQUEST });
  try {
    //need to send to the server
    dispatch({ type: HISTORY_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: HISTORY_DELETE_FAIL, payload: error.message });
  }
};

export { getAllHistory, getConversation, deleteConversation };
