import {
  FETCH_ACCRUALS,
  FETCH_ACCRUALS_INCOME,
  SET_ACCRUALS,
  SET_ACCRUALS_INCOME,
} from './actionTypes';

export const fetchAccruals = (payload) => ({
  type: FETCH_ACCRUALS,
  payload: payload,
});

export const setAccruals = (data) => ({
  type: SET_ACCRUALS,
  payload: data,
});

export const fetchAccrualsIncome = () => ({
  type: FETCH_ACCRUALS_INCOME,
});

export const setAccrualsIncome = (data) => ({
  type: SET_ACCRUALS_INCOME,
  payload: data,
});
