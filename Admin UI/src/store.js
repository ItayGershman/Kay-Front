import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import {
  userSigninReducer,
  userRegisterReducer,
} from './redux/reducers/userReducer';
import scenarioReducer from './redux/reducers/conversationReducer';
import historyReducer from './redux/reducers/historyReducer';

const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  scenario: scenarioReducer,
  history: historyReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
