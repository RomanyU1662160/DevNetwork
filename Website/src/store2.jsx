import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleWare from "redux-saga";

const initState = {};
const sagaMiddleWare = createSagaMiddleWare();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleWare));

const store = createStore(combineReducers, initState, enhancer);

export default store;
