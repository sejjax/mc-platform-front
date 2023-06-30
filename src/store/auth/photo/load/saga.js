import { all, fork, put, takeEvery } from 'redux-saga/effects';

import userService from 'services/userService';

import { GET_PHOTO } from './actionTypes';
import { getPhotoError, getPhotoSuccess } from './actions';

function* getPhoto() {
  try {
    const response = yield userService.getPhoto();

    yield put(getPhotoSuccess(response));
  } catch (error) {
    yield put(getPhotoError(error));
  }
}

export function* watchGetPhoto() {
  yield takeEvery(GET_PHOTO, getPhoto);
}

function* GetPhoto() {
  yield all([fork(watchGetPhoto)]);
}

export default GetPhoto;
