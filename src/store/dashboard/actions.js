import { GET_CHARTS_DATA, GET_REFERRALS, GET_INCOME } from "./actionTypes"

// charts data
export const getChartsData = periodType => ({
  type: GET_CHARTS_DATA,
  payload: periodType,
})

export const getReferrals = () => ({
  type: GET_REFERRALS,
})

export const getIncome = () => ({
  type: GET_INCOME,
})
