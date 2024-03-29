import { put, takeEvery } from 'redux-saga/effects';

import authService from 'services/authService';

import { confirmFails, confirmSuccess } from './actions';
import { CONFIRM_EMAIL } from './actionsTypes';

function* confirmEmail({ payload: { hash, history } }) {
  try {
    const response = yield authService.confirm(hash);

    if (response) {
      yield put(confirmSuccess(response));

      history.push('/login');
    }
  } catch (error) {
    yield put(confirmFails(error));
  }
}

function* confirmEmailSaga() {
  yield takeEvery(CONFIRM_EMAIL, confirmEmail);
}

export default confirmEmailSaga;
