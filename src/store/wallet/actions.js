import {
  DEPOSIT_STATUS,
  INIT_WALLET_CONNECT,
  SEND_DEPOSIT,
  SET_DEPOSIT_LOADING,
  SET_DEPOSIT_SUCCESS,
  SET_WALLET_VALUES,
} from "./actionTypes"

export const setWalletValues = values => ({
  type: SET_WALLET_VALUES,
  payload: values,
})

export const sendDeposit = body => ({
  type: SEND_DEPOSIT,
  payload: body,
})

export const setDepositSuccess = status => ({
  type: SET_DEPOSIT_SUCCESS,
  payload: status,
})

export const setDepositLoading = loading => ({
  type: SET_DEPOSIT_LOADING,
  payload: loading,
})
// export const resetWalletValues = () => ({})
