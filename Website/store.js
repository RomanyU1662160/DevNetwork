import { creatStore, applyMiddleware } from "redux";
import rootreducer from "./src/reducers";
import composeWithDevTools from "redux-devtools-extension";

const init = {};
const enhancer = composeWithDevTools(applyMiddleware());
const store = createStore(rootreducer, init, enhancer);

export default store;
