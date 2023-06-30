import moment from 'moment';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import { get } from '../../helpers/api_helper';
import { apiFail, apiSuccess } from '../common/actions';
// Crypto Redux States
import {
  GET_PARTNERS,
  GET_PARTNERS_INCOME,
  GET_TEAM_INFO,
  SET_PARTNERS_INCOME_RANGE,
} from './actionTypes';

function* getTeamInfo() {
  try {
    const response = yield get('/users/me/team');
    yield put(apiSuccess(GET_TEAM_INFO, response));
  } catch (error) {
    yield put(apiFail(GET_TEAM_INFO, error));
  }
}

export function* watchGetTeamInfo() {
  yield takeEvery(GET_TEAM_INFO, getTeamInfo);
}

function* getPartners() {
  try {
    const response = yield get('/users/me/team/partners');
    yield put(apiSuccess(GET_PARTNERS, response));
  } catch (error) {
    yield put(apiFail(GET_PARTNERS, error));
  }
}

export function* watchGetPartners() {
  yield takeEvery(GET_PARTNERS, getPartners);
}

function* getPartnersIncome({ payload: { level, from, to } }) {
  try {
    yield put({ type: SET_PARTNERS_INCOME_RANGE, level, from, to });
    const f = (x) => moment(x).format('yyyy-MM-DD');
    const response = yield get(`/users/me/team/income?from=${f(from)}&to=${f(to)}&level=${level}`);
    yield put(apiSuccess(GET_PARTNERS_INCOME, response, { level }));
  } catch (error) {
    yield put(apiFail(GET_PARTNERS_INCOME, error));
  }
}

export function* watchGetPartnersIncome() {
  yield takeEvery(GET_PARTNERS_INCOME, getPartnersIncome);
}

function* teamSaga() {
  yield all([fork(watchGetTeamInfo), fork(watchGetPartners), fork(watchGetPartnersIncome)]);
}

export default teamSaga;
