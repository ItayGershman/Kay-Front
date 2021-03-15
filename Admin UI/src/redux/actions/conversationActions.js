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
  SCENARIOS_GET_FAIL,
  SCENARIOS_GET_REQUEST,
  SCENARIOS_GET_SUCCESS,
  SCENARIO_GET_FAIL,
  SCENARIO_GET_REQUEST,
  SCENARIO_GET_SUCCESS,
  SCENARIO_UPDATE_FAIL,
  SCENARIO_UPDATE_REQUEST,
  SCENARIO_UPDATE_SUCCESS,
} from '../constants/actionTypes';

const getConfiguration = (scenarioID) => async (dispatch) => {
  dispatch({ type: CONFIGURATION_GET_REQUEST });
  try {
    const res = await API.getConfiguration(scenarioID);
    dispatch({ type: CONFIGURATION_GET_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CONFIGURATION_GET_FAIL });
  }
};

const createConfiguration = (scenarioID, elements) => async (dispatch) => {
  dispatch({ type: CONFIGURATION_CREATE_REQUEST });
  try {
    const res = await API.createConfiguration(scenarioID, elements);
    dispatch({ type: CONFIGURATION_CREATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CONFIGURATION_CREATE_FAIL, payload: error });
  }
};

const getAllScenarios = () => async (dispatch) => {
  dispatch({ type: SCENARIOS_GET_REQUEST });
  try {
    const { data } = await API.getAllScenarios();
    console.log(data);
    dispatch({ type: SCENARIOS_GET_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: SCENARIOS_GET_FAIL, payload: error });
  }
};
const getScenario = (scenarioName) => async (dispatch) => {
  dispatch({ type: SCENARIO_GET_REQUEST });
  try {
    const { data } = await API.getScenario(scenarioName);
    console.log(data);
    dispatch({ type: SCENARIO_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SCENARIO_GET_FAIL, payload: error });
  }
};
const createScenario = ({ name, description, image }) => async (dispatch) => {
  dispatch({ type: SCENARIO_CREATE_REQUEST });
  try {
    const { data } = await API.createScenario(name, description, image);
    console.log(data);
    dispatch(getAllScenarios());
    dispatch({ type: SCENARIO_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SCENARIO_CREATE_FAIL, payload: error });
  }
};
const updateScenario = (scenarioName) => async (dispatch) => {
  dispatch({ type: SCENARIO_UPDATE_REQUEST });
  try {
    const res = await API.updateScenario(scenarioName);
    dispatch({ type: SCENARIO_UPDATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_UPDATE_FAIL, payload: error });
  }
};
const deleteScenario = (scenarioName) => async (dispatch) => {
  dispatch({ type: SCENARIO_DELETE_REQUEST });
  try {
    const res = await API.deleteScenario(scenarioName);
    dispatch({ type: SCENARIO_DELETE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SCENARIO_DELETE_FAIL, payload: error });
  }
};

export {
  getConfiguration,
  createConfiguration,
  getAllScenarios,
  getScenario,
  createScenario,
  updateScenario,
  deleteScenario,
};
