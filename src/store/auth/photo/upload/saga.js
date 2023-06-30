import updateAuthUser from 'helpers/UpdateAuthUser';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import userService from 'services/userService';

import { UPLOAD_PHOTO } from './actionTypes';
import { uploadPhotoError, uploadPhotoSuccess } from './actions';

function* uploadPhoto({ payload }) {
  try {
    const response = yield userService.uploadPhoto(payload);

    yield updateAuthUser({
      photo: response,
    });

    yield put(uploadPhotoSuccess(response));
    yield put(uploadPhotoError(null));
  } catch (error) {
    yield put(uploadPhotoSuccess(null));
    yield put(uploadPhotoError(error));
  }
}

export function* watchUploadPhoto() {
  yield takeEvery(UPLOAD_PHOTO, uploadPhoto);
}

function* UploadPhoto() {
  yield all([fork(watchUploadPhoto)]);
}

export default UploadPhoto;
