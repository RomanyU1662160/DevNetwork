import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducers";
import spinnerReducer from "./spinnerReducer";

const combinedReducers = combineReducers({
  alertReducer,
  authReducer,
  spinnerReducer
});

export default combinedReducers;
