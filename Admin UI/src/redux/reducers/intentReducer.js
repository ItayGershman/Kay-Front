const {
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
} = require('../constants/actionTypes');

const initialState = {
  loading: false,
  scenarioName: '',
  intent: '',
  entities: [],
  speak: [],
  allIntents: [],
};

function intentReducer(state = initialState, action) {
  switch (action.type) {
    case INTENTS_GET_REQUEST:
      return { loading: true };
    case INTENTS_GET_SUCCESS:
      return {
        loading: false,
        allIntents: action.payload,
        ...state
      };
    case INTENTS_GET_FAIL:
      return { loading: false, error: action.payload,...state };

    case INTENT_GET_REQUEST:
      return { loading: true, allIntents: state.allIntents };
    case INTENT_GET_SUCCESS:
      return {
        loading: false,
         ...state
      };
    case INTENT_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
         ...state
      };

    case INTENT_CREATE_REQUEST:
      return { loading: true, ...state };
    case INTENT_CREATE_SUCCESS:
      const {
        scenarioConnection,
        intentName,
        outputTextIntent,
      } = action.payload;
      return {
        loading: false,
        scenarioName: scenarioConnection,
        intent: intentName,
        entities: [],
        speak: outputTextIntent,
         ...state
      };
    case INTENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
         ...state
      };

    case INTENT_UPDATE_REQUEST:
      return { loading: true, ...state };
    case INTENT_UPDATE_SUCCESS:
      return {
        loading: false,
         ...state
      };
    case INTENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
         ...state
      };

    case INTENT_DELETE_REQUEST:
      return { loading: true, ...state };
    case INTENT_DELETE_SUCCESS:
      return {
        loading: false,
         ...state
      };
    case INTENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
         ...state
      };

    default:
      return state;
  }
}
export default intentReducer;
