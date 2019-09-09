import authSagas from "./authSaga";
import { all } from "@redux-saga/core/effects";

function* rootSaga() {
  yield all([...authSagas]);
}

export default rootSaga;
