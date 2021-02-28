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

function historyReducer(state = {}, action) {
  switch (action.type) {
    case HISTORY_GET_ALL_REQUEST:
      return { loading: true };
    case HISTORY_GET_ALL_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case HISTORY_GET_ALL_FAIL:
      return { loading: false, error: action.payload };

    case HISTORY_GET_REQUEST:
      return { loading: true };
    case HISTORY_GET_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case HISTORY_GET_FAIL:
      return { loading: false, error: action.payload };

    case HISTORY_DELETE_REQUEST:
      return { loading: true };
    case HISTORY_DELETE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export default historyReducer