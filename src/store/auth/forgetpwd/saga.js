import { takeEvery, fork, put, all } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"

import authService from "services/authService"

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { email } }) {
  try {
    const response = yield authService.forgotPassword(email)

    yield put(userForgetPasswordSuccess(response))
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
