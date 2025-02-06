import types from '../actions/actionTypes';
import InitialState from './InitialState';

const initialState = {
  isAuthenticated: InitialState.isAuthenticated,
  loggedInUser: InitialState.loggedInUser,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
      };
    
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
      };

    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.user,
      };

    case types.LOGOUT_USER:
      return {
        isAuthenticated: false,
        loggedInUser: null,
      };

    case types.VALIDATION_ERROR:
      return { ...state, error: action.response };

    case types.FORGOT_USER:
      return { ...state, forgotPasswordResponse: action.response };

    default:
      return state;
  }
}
