import { takeEvery, fork, put, all } from "redux-saga/effects"
import updateAuthUser from "helpers/UpdateAuthUser"
import userService from "services/userService"

import { UPLOAD_PHOTO } from "./actionTypes"
import { uploadPhotoSuccess, uploadPhotoError } from "./actions"

function* uploadPhoto({ payload }) {
  try {
    const response = yield userService.uploadPhoto(payload)

    yield updateAuthUser({
      photo: response,
    })

    yield put(uploadPhotoSuccess(response))
    yield put(uploadPhotoError(null))
  } catch (error) {
    yield put(uploadPhotoSuccess(null))
    yield put(uploadPhotoError(error))
  }
}

export function* watchUploadPhoto() {
  yield takeEvery(UPLOAD_PHOTO, uploadPhoto)
}

function* UploadPhoto() {
  yield all([fork(watchUploadPhoto)])
}

export default UploadPhoto
