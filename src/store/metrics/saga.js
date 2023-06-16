import { put, takeEvery } from "redux-saga/effects"

import { FETCH_METRICS, GET_NOTIFICATIONS } from "./actionTypes"
import { apiSuccess, apiFail } from "../common/actions"
import { get } from "../../helpers/api_helper"

function* fetchMetrics() {
  try {
    const response = yield get("/notifications")
    yield put(apiSuccess(GET_NOTIFICATIONS, response))
  } catch (error) {
    yield put(apiFail(GET_NOTIFICATIONS, error))
  }
}

export function* metricsSaga() {
  yield takeEvery(FETCH_METRICS, fetchMetrics)
}

export default metricsSaga
