const {
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
} = require('../constants/actionTypes');

const initialState = {
  loading: false,
  scenarioName: '',
  intent: '',
  entities: [],
  speak: [],
};

function intentReducer(state = initialState, action) {
  switch (action.type) {
    case INTENT_GET_REQUEST:
      return { loading: true };
    case INTENT_GET_SUCCESS:
      return {
        loading: false,
      };
    case INTENT_GET_FAIL:
      return { loading: false, error: action.payload };

    case INTENT_CREATE_REQUEST:
      return { loading: true };
    case INTENT_CREATE_SUCCESS:
      const {
        scenarioConnection,
        intentName,
        outputTextIntent,
      } = action.payload;
      console.log(scenarioConnection, intentName, outputTextIntent);
      return {
        ...state,
        loading: false,
        scenarioName: scenarioConnection,
        intent: intentName,
        entities: [],
        speak: outputTextIntent,
      };
    case INTENT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case INTENT_UPDATE_REQUEST:
      return { loading: true };
    case INTENT_UPDATE_SUCCESS:
      return {
        loading: false,
      };
    case INTENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case INTENT_DELETE_REQUEST:
      return { loading: true };
    case INTENT_DELETE_SUCCESS:
      return {
        loading: false,
      };
    case INTENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
export default intentReducer;
