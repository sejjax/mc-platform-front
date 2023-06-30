import accessToken from 'helpers/jwt-token-access/accessToken';
import { put, takeEvery } from 'redux-saga/effects';

import authService from 'services/authService';

import { resetProfileData, setProfileData } from '../profile/actions';
// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { apiError, loginSuccess } from './actions';

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield authService.login(user);
    if (user.rememberMe) {
      localStorage.setItem('authUser', JSON.stringify(response));
    } else {
      sessionStorage.setItem('authUser', JSON.stringify(response));
    }

    accessToken.reload();

    yield put(loginSuccess(response));
    yield put(setProfileData(response.user));

    history.push('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');

    accessToken.reload();

    yield put(resetProfileData());
    history.push('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
