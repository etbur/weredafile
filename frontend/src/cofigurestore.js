import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";  // Import redux-thunk
import authReducer from "./reducers/authReducer";  // Import auth reducer

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
