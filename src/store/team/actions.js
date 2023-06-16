import { GET_TEAM_INFO, GET_PARTNERS, GET_PARTNERS_INCOME } from "./actionTypes"

export const getTeamInfo = () => ({
  type: GET_TEAM_INFO,
})

export const getPartners = () => ({
  type: GET_PARTNERS,
})

export const getPartnersIncome = (level, from, to) => ({
  type: GET_PARTNERS_INCOME,
  payload: { level, from, to },
})
