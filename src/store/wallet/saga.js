import { put, takeEvery } from "redux-saga/effects"
import { sendDeposit } from "services/depositService"
import { setDepositSuccess } from "./actions"
import { SEND_DEPOSIT } from "./actionTypes"

function* sendDepositToApi({ payload }) {
  try {
    yield sendDeposit(payload)
  } catch (error) {
    console.log(error)
    yield put(setDepositSuccess(false))
  }
}

export function* watchWallet() {
  yield takeEvery(SEND_DEPOSIT, sendDepositToApi)
}
