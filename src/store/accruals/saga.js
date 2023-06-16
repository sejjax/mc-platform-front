import { call, put, takeEvery } from "redux-saga/effects"
import { fetchAccurals } from "services/accrualsService"
import { setAccruals } from "./actions"
import { FETCH_ACCRUALS } from "./actionTypes"

function* fetchAccrualSaga({ payload }) {
  try {
    const data = yield call(fetchAccurals, payload)
    yield put(setAccruals(data))
  } catch (error) {
    console.log(error)
  }
}

export function* AccrualSaga() {
  yield takeEvery(FETCH_ACCRUALS, fetchAccrualSaga)
}
