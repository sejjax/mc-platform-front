import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  fetchInvestments,
  fetchInvestmentsAnalysis,
  fetchInvestmentsSummary,
} from 'services/investmentsService';

import {
  FETCH_INVESTMENTS,
  FETCH_INVESTMENTS_ANALYSIS,
  FETCH_INVESTMENTS_SUMMARY,
} from './actionTypes';
import { setInvestments, setInvestmentsAnalysis, setInvestmentsSummary } from './actions';

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

export function* fetchInvestmentsAnalysisSaga() {
  try {
    const data = yield call(fetchInvestmentsAnalysis);
    yield put(setInvestmentsAnalysis(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchInvestmentsAnalysisSaga() {
  yield takeEvery(FETCH_INVESTMENTS_ANALYSIS, fetchInvestmentsAnalysisSaga);
}

function* investmentsSaga() {
  yield all([
    fork(watchInvestmentsSaga),
    fork(watchInvestmentsSummarySaga),
    fork(watchInvestmentsAnalysisSaga),
  ]);
}

export default investmentsSaga;
