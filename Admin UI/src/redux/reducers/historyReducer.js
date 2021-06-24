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

const initialState = {
  conversations: [],
  conversation: null,
  error: '',
};

function historyReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORY_GET_ALL_REQUEST:
      return { ...state, loading: true };
    case HISTORY_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: action.payload,
        conversation: action.payload[action.payload.length - 1],
      };
    case HISTORY_GET_ALL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case HISTORY_GET_REQUEST:
      return { ...state, loading: true };
    case HISTORY_GET_SUCCESS:
      let conversation = state.conversations.find(
        (con) => con._id === action.payload
      );
      if (!conversation) {
        if (state.conversations.length > 0)
          conversation = state.conversations[0];
      }
      return {
        ...state,
        loading: false,
        conversation,
      };
    case HISTORY_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    case HISTORY_DELETE_REQUEST:
      return { ...state, loading: true };
    case HISTORY_DELETE_SUCCESS:
      const conversations = state.conversations.filter(
        (con) => con.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        conversations,
      };
    case HISTORY_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default historyReducer;
