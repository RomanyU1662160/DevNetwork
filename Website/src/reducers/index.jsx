import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";
import alertReducer from "./alertReducer";

const combinedReducers = combineReducers({
  exampleReducer,
  alertReducer
});

export default combinedReducers;
