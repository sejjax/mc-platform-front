import { all, fork, put, takeEvery } from 'redux-saga/effects';

import authService from 'services/authService';

// Login Redux States
import { FORGET_PASSWORD } from './actionTypes';
import { userForgetPasswordError, userForgetPasswordSuccess } from './actions';

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { email } }) {
  try {
    const response = yield authService.forgotPassword(email);

    yield put(userForgetPasswordSuccess(response));
  } catch (error) {
    yield put(userForgetPasswordError(error));
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
