import { call, put, takeEvery } from "redux-saga/effects"
import { fetchInvestments } from "services/investmentsService"
import { setInvestments } from "./actions"
import { FETCH_INVESTMENTS } from "./actionTypes"

function* fetchInvestmentsSaga() {
  try {
    const data = yield call(fetchInvestments)
    yield put(setInvestments(data))
  } catch (error) {
    console.log(error)
  }
}

export function* watchInvestmentsSaga() {
  yield takeEvery(FETCH_INVESTMENTS, fetchInvestmentsSaga)
}
