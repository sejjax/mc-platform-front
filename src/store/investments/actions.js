import { FETCH_INVESTMENTS, SET_INVESTMENTS } from "./actionTypes"

export const fetchInvestments = () => ({
  type: FETCH_INVESTMENTS,
})

export const setInvestments = data => ({
  type: SET_INVESTMENTS,
  payload: data,
})
