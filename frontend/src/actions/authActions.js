import types from './actionTypes';
import axios from 'axios';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

// export const login = (credentials) => async (dispatch) => {
//   try {
//     const response = await axios.post('/api/auth/login', credentials);
//     dispatch({ type: types.SET_CURRENT_USER, user: response.data });
//   } catch (error) {
//     dispatch({ type: types.VALIDATION_ERROR, response: error.response.data });
//   }
// };


export const login = (credentials) => (dispatch) => {
  const storedUser = { email: "hareg@gmail.com", password: "Hareg@12" }; // Use an object instead of an array

  if (
    storedUser &&
    credentials.email === storedUser.email &&
    credentials.password === storedUser.password
  ) {
    dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
  } else {
    alert("Invalid credentials. Please try again.");
  }
};


// export const signup = (userData) => async (dispatch) => {
//   try {
//     const response = await axios.post('/api/auth/signup', userData);
//     dispatch({ type: types.SIGNUP_USER, response: response.data });
//   } catch (error) {
//     dispatch({ type: types.VALIDATION_ERROR, response: error.response.data });
//   }
// };


// export const signup = (userData) => (dispatch) => {
//   // Simulate saving the user locally
//   localStorage.setItem("user", JSON.stringify(userData));

//   dispatch({ type: "SIGNUP_SUCCESS", payload: userData });
// };



// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     const response = cdawait axios.post('/api/auth/forgot-password', { email });
//     dispatch({ type: types.FORGOT_USER, response: response.data });
//   } catch (error) {
//     dispatch({ type: types.VALIDATION_ERROR, response: error.response.data });
//   }
// };
export const forgotPassword = (email) => (dispatch) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && email === storedUser.email) {
    const resetToken = Math.random().toString(36).substr(2); // Generate a simple token
    localStorage.setItem("resetToken", resetToken);
    dispatch({ type: types.FORGOT_USER, response: { message: "Reset link has been sent to your email." } });
  } else {
    dispatch({ type: types.VALIDATION_ERROR, response: { message: "Email not found." } });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user'); // Remove user from local storage
  dispatch({ type: types.LOGOUT_USER });
};