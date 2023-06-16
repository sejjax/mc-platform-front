import { FETCH_ACCRUALS, SET_ACCRUALS } from "./actionTypes"

export const fetchAccruals = type => ({
  type: FETCH_ACCRUALS,
  payload: type,
})

export const setAccruals = data => ({
  type: SET_ACCRUALS,
  payload: data,
})
