import { API_FAIL, API_SUCCESS } from './actionTypes';

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
});

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
});
