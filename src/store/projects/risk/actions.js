import {
  GET_RISKS,
  GET_RISKS_FAIL,
  GET_RISKS_SUCCESS,
} from "./actionTypes"

export const getRisks = () => ({
  type: GET_RISKS,
})

export const getRisksSuccess = risks => ({
  type: GET_RISKS_SUCCESS,
  payload: risks,
})

export const getRisksFail = error => ({
  type: GET_RISKS_FAIL,
  payload: error,
})
