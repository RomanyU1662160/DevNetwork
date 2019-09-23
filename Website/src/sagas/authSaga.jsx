import { takeEvery, put, fork, delay } from "@redux-saga/core/effects";
import axios from "axios";
import types from "../actions/types";
import { registerSuccess } from "../actions/auth";
import { setAlert, hideAlert } from "../actions/alerts";
import SpinnerContextProvider, {
  spinnerContext
} from "../contexts/SpinnerContext";

//import { viewSpinner, hideSpinner } from "../actions/spinner";

function* run(RegisterData) {
  //const RegisterData = yield take("REGISTER");
  const Body = yield RegisterData.payload.user;
  console.log(Body);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = yield axios.post("/api/users", Body, config);
    const resData = res.data; //return the Token from the backend
    console.log(resData);
    // yield put(viewSpinner());
    yield delay(5000);
    yield put(registerSuccess(resData));
    yield put(setAlert("registered", "success"));
    // yield put(hideSpinner());
    yield delay(4000);
    yield put(hideAlert());
    yield localStorage.setItem("token", res.data);
  } catch (error) {
    console.log("Error :: " + error.message);
  }
}

function* watchRegister() {
  yield takeEvery(types.REGISTER, run);
}

const authSagas = [fork(watchRegister)];

export default authSagas;
