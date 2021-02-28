const {
  SCENARIOS_GET_REQUEST,
  SCENARIOS_GET_SUCCESS,
  SCENARIOS_GET_FAIL,
  SCENARIO_GET_REQUEST,
  SCENARIO_GET_SUCCESS,
  SCENARIO_GET_FAIL,
  SCENARIO_CREATE_REQUEST,
  SCENARIO_CREATE_SUCCESS,
  SCENARIO_CREATE_FAIL,
  SCENARIO_UPDATE_REQUEST,
  SCENARIO_UPDATE_SUCCESS,
  SCENARIO_UPDATE_FAIL,
  SCENARIO_DELETE_REQUEST,
  SCENARIO_DELETE_SUCCESS,
  SCENARIO_DELETE_FAIL,
} = require('../constants/actionTypes');

const initialState = {
  loading: false,
  scenario: {},
};

function scenarioReducer(state = initialState, action) {
  switch (action.type) {
    case SCENARIOS_GET_REQUEST:
      return { loading: true };
    case SCENARIOS_GET_SUCCESS:
      return {
        loading: false,
      };
    case SCENARIOS_GET_FAIL:
      return { loading: false, error: action.payload };

    case SCENARIO_GET_REQUEST:
      return { loading: true };
    case SCENARIO_GET_SUCCESS:
      return {
        loading: false,
      };
    case SCENARIO_GET_FAIL:
      return { loading: false, error: action.payload };

    case SCENARIO_CREATE_REQUEST:
      return { loading: true };
    case SCENARIO_CREATE_SUCCESS:
      return {
        loading: false,
      };
    case SCENARIO_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case SCENARIO_UPDATE_REQUEST:
      return { loading: true };
    case SCENARIO_UPDATE_SUCCESS:
      return {
        loading: false,
      };
    case SCENARIO_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case SCENARIO_DELETE_REQUEST:
      return { loading: true };
    case SCENARIO_DELETE_SUCCESS:
      return {
        loading: false,
      };
    case SCENARIO_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
export default scenarioReducer;
