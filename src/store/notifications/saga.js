import { all, fork, put, takeEvery } from 'redux-saga/effects';

import {
  addNotificationRequest,
  deleteNotificationRequest,
  editNotificationRequest,
  getAllNotificationsRequest,
} from 'services/notificationsService';

import { get } from '../../helpers/api_helper';
import { apiFail, apiSuccess } from '../common/actions';
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS,
} from './actionTypes';

function* getNotifications() {
  try {
    const response = yield get('/notifications');
    yield put(apiSuccess(GET_NOTIFICATIONS, response));
  } catch (error) {
    yield put(apiFail(GET_NOTIFICATIONS, error));
  }
}

function* getAllNotifications() {
  try {
    const response = yield getAllNotificationsRequest();

    yield put(apiSuccess(GET_NOTIFICATIONS, response));
  } catch (error) {}
}

function* addNotification({ payload }) {
  try {
    const response = yield addNotificationRequest(payload.data);
    yield put(apiSuccess(ADD_NOTIFICATION, response.data));
    yield payload.redirectHandler();
  } catch (error) {}
}

function* editNotification({ payload }) {
  try {
    const response = yield editNotificationRequest(payload.data);
    yield put(apiSuccess(EDIT_NOTIFICATION, response.data));
    yield payload.redirectHandler();
  } catch (error) {}
}

function* deleteNotification({ payload }) {
  try {
    yield deleteNotificationRequest(payload);
    yield put(apiSuccess(DELETE_NOTIFICATION, payload.id));
  } catch (error) {}
}

export function* watchNotificaions() {
  yield takeEvery(GET_NOTIFICATIONS, getNotifications);
  yield takeEvery(GET_ALL_NOTIFICATIONS, getAllNotifications);
  yield takeEvery(ADD_NOTIFICATION, addNotification);
  yield takeEvery(EDIT_NOTIFICATION, editNotification);
  yield takeEvery(DELETE_NOTIFICATION, deleteNotification);
}

function* notificationsSaga() {
  yield all([fork(watchNotificaions)]);
}

export default notificationsSaga;
