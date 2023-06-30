import { put, takeEvery } from 'redux-saga/effects';

import { sendDeposit } from 'services/depositService';

import { SEND_DEPOSIT } from './actionTypes';
import { setDepositSuccess } from './actions';

function* sendDepositToApi({ payload }) {
  try {
    yield sendDeposit(payload);
  } catch (error) {
    console.log(error);
    yield put(setDepositSuccess(false));
  }
}

export function* watchWallet() {
  yield takeEvery(SEND_DEPOSIT, sendDepositToApi);
}
