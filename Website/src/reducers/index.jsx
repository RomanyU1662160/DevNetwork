import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducers";

const combinedReducers = combineReducers({
  exampleReducer,
  alertReducer,
  authReducer
});

export default combinedReducers;
