import { call, put, takeEvery } from 'redux-saga/effects';

//Include Both Helper File with needed methods
import { getRisks } from 'services/projectService';

// Crypto Redux States
import { GET_RISKS } from './actionTypes';
import { getRisksFail, getRisksSuccess } from './actions';

function* fetchRisks({ projectSlug }) {
  try {
    const response = yield call(getRisks, projectSlug);
    yield put(getRisksSuccess(response));
  } catch (error) {
    yield put(getRisksFail(error));
  }
}

function* risksSaga() {
  yield takeEvery(GET_RISKS, fetchRisks);
}

export default risksSaga;
