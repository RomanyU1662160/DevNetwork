import { takeEvery, take, put, call, fork } from "@redux-saga/core/effects";
import axios from "axios";
import types from "../actions/types";
import { registerSuccess } from "../actions/auth";
import { setAlert } from "../actions/alerts";

function* run() {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const RegisterData = yield take("REGISTER");
    const Body = RegisterData.payload.user;
    console.log(Body);
    const res = yield axios.post("/api/users", Body, config);
    const resData = res.data;
    console.log(resData);
    yield put(registerSuccess({ resData }));
    yield put(setAlert("registered", "success"));
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
