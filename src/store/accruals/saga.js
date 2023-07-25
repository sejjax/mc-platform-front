import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchAccrualsIncome, fetchAccurals } from 'services/accrualsService';

import { FETCH_ACCRUALS, FETCH_ACCRUALS_INCOME } from './actionTypes';
import { setAccruals, setAccrualsIncome } from './actions';

function* fetchAccrualSaga({ payload }) {
  try {
    // console.log(payload, 'payload');
    const data = yield call(fetchAccurals, payload);
    yield put(setAccruals(data));
  } catch (error) {
    console.log(error);
  }
}

function* watchAccrualSaga() {
  yield takeEvery(FETCH_ACCRUALS, fetchAccrualSaga);
}

function* fetchAccrualIncomeSaga() {
  try {
    const data = yield call(fetchAccrualsIncome);
    yield put(setAccrualsIncome(data));
  } catch (error) {
    console.log(error);
  }
}

function* watchAccrualIncomeSaga() {
  yield takeEvery(FETCH_ACCRUALS_INCOME, fetchAccrualIncomeSaga);
}

function* AccrualSaga() {
  yield all([fork(watchAccrualSaga), fork(watchAccrualIncomeSaga)]);
}

export default AccrualSaga;
