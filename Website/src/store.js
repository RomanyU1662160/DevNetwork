import { createStore, applyMiddleware } from "redux";
import combinedReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(combinedReducers, initialState, enhancer);
//sagaMiddleware.run(combinedReducers);
export default store;
