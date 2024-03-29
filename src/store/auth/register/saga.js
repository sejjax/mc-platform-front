import { all, fork, put, takeEvery } from 'redux-saga/effects';

//Include Both Helper File with needed methods
import AuthService from 'services/authService';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import { registerUserFailed, registerUserSuccessful } from './actions';

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    const response = yield AuthService.register(user);

    yield put(registerUserSuccessful(response));

    // history.push("/login")
  } catch (error) {
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
