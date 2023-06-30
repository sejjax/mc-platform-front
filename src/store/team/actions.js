import { GET_PARTNERS, GET_PARTNERS_INCOME, GET_TEAM_INFO } from './actionTypes';

export const getTeamInfo = () => ({
  type: GET_TEAM_INFO,
});

export const getPartners = () => ({
  type: GET_PARTNERS,
});

export const getPartnersIncome = (level, from, to) => ({
  type: GET_PARTNERS_INCOME,
  payload: { level, from, to },
});
