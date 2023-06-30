import { FETCH_METRICS, SET_METRICS } from './actionTypes';

export const fetchMetrics = () => ({
  type: FETCH_METRICS,
});

export const setMetrics = (data) => ({
  type: SET_METRICS,
  payload: data,
});
