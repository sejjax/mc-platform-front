import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  SELECT_NOTIFICATION,
} from './actionTypes';

export const getNotifications = () => ({
  type: GET_NOTIFICATIONS,
});

export const getAllNotifications = () => ({
  type: GET_ALL_NOTIFICATIONS,
});

export const addNotification = (payload) => ({
  type: ADD_NOTIFICATION,
  payload,
});

export const editNotification = (payload) => ({
  type: EDIT_NOTIFICATION,
  payload,
});

export const deleteNotification = (notificationId) => ({
  type: DELETE_NOTIFICATION,
  payload: notificationId,
});

export const selectCurrentNotification = (notificationId) => ({
  type: SELECT_NOTIFICATION,
  payload: notificationId,
});
