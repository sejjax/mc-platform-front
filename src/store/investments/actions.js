import {
  FETCH_INVESTMENTS,
  FETCH_INVESTMENTS_SUMMARY,
  SET_INVESTMENTS,
  SET_INVESTMENTS_SUMMARY,
} from './actionTypes';

export const fetchInvestments = (payload) => ({
  type: FETCH_INVESTMENTS,
  payload,
});

export const setInvestments = (data) => ({
  type: SET_INVESTMENTS,
  payload: data,
});

export const fetchInvestmentsSummary = () => ({
  type: FETCH_INVESTMENTS_SUMMARY,
});

export const setInvestmentsSummary = (data) => ({
  type: SET_INVESTMENTS_SUMMARY,
  payload: data,
});
