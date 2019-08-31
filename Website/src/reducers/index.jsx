import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

const combinedReducers = combineReducers({
  exampleReducer
});

export default combinedReducers;
