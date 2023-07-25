import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchInvestments, fetchInvestmentsSummary } from 'services/investmentsService';

import { FETCH_INVESTMENTS, FETCH_INVESTMENTS_SUMMARY } from './actionTypes';
import { setInvestments, setInvestmentsSummary } from './actions';

function* fetchInvestmentsSaga({ payload }) {
  try {
    const data = yield call(fetchInvestments, payload);
    yield put(setInvestments(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchInvestmentsSaga() {
  yield takeEvery(FETCH_INVESTMENTS, fetchInvestmentsSaga);
}

function* fetchInvestmentsSummarySaga() {
  try {
    const data = yield call(fetchInvestmentsSummary);
    yield put(setInvestmentsSummary(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchInvestmentsSummarySaga() {
  yield takeEvery(FETCH_INVESTMENTS_SUMMARY, fetchInvestmentsSummarySaga);
}

function* investmentsSaga() {
  yield all([fork(watchInvestmentsSaga), fork(watchInvestmentsSummarySaga)]);
}

export default investmentsSaga;
