// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer } from 'react-redux-sweetalert';

const rootReducer = combineReducers({
  auth: authReducer,
  sweetalert: reducer
});

export default rootReducer;
