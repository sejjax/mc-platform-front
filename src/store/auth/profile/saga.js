import { takeEvery, fork, put, all } from "redux-saga/effects"

// Login Redux States
import {
  EDIT_DEFAULT_WALLET_NUMBER,
  EDIT_PROFILE,
  FETCH_PROFILE_DATA,
} from "./actionTypes"
import { profileSuccess, profileError, setProfileData } from "./actions"

import userService from "services/userService"
import updateAuthUser from "../../../helpers/UpdateAuthUser"

function* editProfile({ payload }) {
  try {
    const response = yield userService.userUpdate(payload)

    yield put(setProfileData(response))
    yield put(profileSuccess(response))
    yield put(profileError(null))
  } catch (error) {
    yield put(profileSuccess(null))

    yield put(profileError(error))
  }
}

function* setDefaultWalletNumber({ payload }) {
  try {
    const response = yield userService.updateWalletNumber(payload)
    yield updateAuthUser(response)
    yield put(setProfileData(response))
  } catch (error) {
    console.log(error)
  }
}

function* fetchProfile() {
  try {
    const data = yield userService.getProfile()
    console.log("data", data)
    yield put(setProfileData(data))
  } catch (error) {}
}

export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
  yield takeEvery(EDIT_DEFAULT_WALLET_NUMBER, setDefaultWalletNumber)
  yield takeEvery(FETCH_PROFILE_DATA, fetchProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
