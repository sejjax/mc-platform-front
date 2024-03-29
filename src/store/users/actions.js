import {
  ADD_NOTIFICATION,
  FETCH_USERS,
  SET_STATUS_MESSAGE,
  SET_USERS,
  STATUS_MESSAGE,
} from './actionTypes';

export const getStatusMessage = (status) => ({
  type: STATUS_MESSAGE,
  payload: status,
});

export const setStatusMessage = (status) => ({
  type: SET_STATUS_MESSAGE,
  payload: status,
});

export const fetchUsers = (userId) => ({
  type: FETCH_USERS,
  payload: userId,
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload: payload,
});
