import API from '../../API/API-requests';
import {
  CONFIGURATION_CREATE_FAIL,
  CONFIGURATION_CREATE_REQUEST,
  CONFIGURATION_CREATE_SUCCESS,
  CONFIGURATION_GET_FAIL,
  CONFIGURATION_GET_REQUEST,
  CONFIGURATION_GET_SUCCESS,
  SCENARIO_CREATE_FAIL,
  SCENARIO_CREATE_REQUEST,
  SCENARIO_CREATE_SUCCESS,
  SCENARIO_DELETE_REQUEST,
  SCENARIO_DELETE_SUCCESS,
  SCENARIO_DELETE_FAIL,
  SCENARIO_GET_FAIL,
  SCENARIO_GET_REQUEST,
  SCENARIO_GET_SUCCESS,
  SCENARIO_UPDATE_FAIL,
  SCENARIO_UPDATE_REQUEST,
  SCENARIO_UPDATE_SUCCESS,
} from '../constants/actionTypes';

const getConfiguration = (scenarioID) => (dispatch) => {
  dispatch({ type: CONFIGURATION_GET_REQUEST });
  try {
    const res = API.getConfiguration(scenarioID);
    dispatch({ type: CONFIGURATION_GET_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CONFIGURATION_GET_FAIL });
  }
};

const createConfiguration = (scenarioID, elements) => (dispatch) => {
  dispatch({ type: CONFIGURATION_CREATE_REQUEST });
  try {
    const res = API.createConfiguration(scenarioID, elements);
    dispatch({ type: CONFIGURATION_CREATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CONFIGURATION_CREATE_FAIL, payload: error });
  }
};

const getScenario = (scenarioName) => (dispatch) => {
  dispatch({ type: SCENARIO_GET_REQUEST });
  try {
    const res = API.getScenario(scenarioName);
    dispatch({ type: SCENARIO_GET_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_GET_FAIL, payload: error });
  }
};
const createScenario = (scenarioName) => (dispatch) => {
  dispatch({ type: SCENARIO_CREATE_REQUEST });
  try {
    const res = API.createScenario(scenarioName);
    dispatch({ type: SCENARIO_CREATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_CREATE_FAIL, payload: error });
  }
};
const updateScenario = (scenarioName) => (dispatch) => {
  dispatch({ type: SCENARIO_UPDATE_REQUEST });
  try {
    const res = API.updateScenario(scenarioName);
    dispatch({ type: SCENARIO_UPDATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_UPDATE_FAIL, payload: error });
  }
};
const deleteScenario = (scenarioName) => (dispatch) => {
  dispatch({ type: SCENARIO_DELETE_REQUEST });
  try {
    const res = API.deleteScenario(scenarioName);
    dispatch({ type: SCENARIO_DELETE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_DELETE_FAIL, payload: error });
  }
};

export {
  getConfiguration,
  createConfiguration,
  getScenario,
  createScenario,
  updateScenario,
  deleteScenario,
};
