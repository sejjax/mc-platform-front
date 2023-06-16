import { call, put, takeEvery, all, fork } from "redux-saga/effects"

// Crypto Redux States
import { GET_CHARTS_DATA, GET_INCOME, GET_REFERRALS } from "./actionTypes"
import { apiSuccess, apiFail } from "../common/actions"
import { get } from "../../helpers/api_helper"

//Include Both Helper File with needed methods
import {
  getWeeklyData,
  getYearlyData,
  getMonthlyData,
} from "../../helpers/fakebackend_helper"

function* getChartsData({ payload: periodType }) {
  try {
    let response
    if (periodType == "monthly") {
      response = yield call(getWeeklyData, periodType)
    }
    if (periodType == "yearly") {
      response = yield call(getYearlyData, periodType)
    }
    if (periodType == "weekly") {
      response = yield call(getMonthlyData, periodType)
    }

    yield put(apiSuccess(GET_CHARTS_DATA, response))
  } catch (error) {
    yield put(apiFail(GET_CHARTS_DATA, error))
  }
}

export function* watchGetChartsData() {
  yield takeEvery(GET_CHARTS_DATA, getChartsData)
}

function* getReferrals() {
  try {
    const response = yield get("/users/me/referrals")
    yield put(apiSuccess(GET_REFERRALS, response))
  } catch (error) {
    yield put(apiFail(GET_REFERRALS, error))
  }
}

export function* watchGetReferrals() {
  yield takeEvery(GET_REFERRALS, getReferrals)
}

function* getIncome() {
  try {
    const response = yield get("/users/me/income")
    yield put(apiSuccess(GET_INCOME, response))
  } catch (error) {
    console.log(error);
    yield put(apiFail(GET_INCOME, error))
  }
}

export function* watchGetIncome() {
  yield takeEvery(GET_INCOME, getIncome)
}

function* dashboardSaga() {
  yield all([
    fork(watchGetChartsData),
    fork(watchGetReferrals),
    fork(watchGetIncome),
  ])
}

export default dashboardSaga
