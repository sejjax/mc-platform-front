import { put, takeEvery, delay } from "redux-saga/effects"

import { FETCH_USERS, STATUS_MESSAGE, UPDATE_USER_RIGHTS } from "./actionTypes"
import { setStatusMessage, setUsers } from "./actions"
import { get, post } from "../../helpers/api_helper"

function* setStatusMessageSaga({ payload }) {
  try {
    yield put(setStatusMessage(payload))
    yield delay(3000)
    yield put(setStatusMessage(null))
  } catch (e) {
    console.log(e)
  }
}

function* fetchUsers({ payload }) {
  try {
    // const response = yield get("/users")
    yield put(
      setUsers([
        {
          id: 1,
          login: "stan_smith",
          email: "stan_smith@mail.ru",
          partnerId: "85123",
          regDate: "25.13.1231",
          permissions: ["Admin", "Financial Controller", "Notif Contr"],
        },
      ])
    )
  } catch (error) {
    yield put(setUsers(null))
  }
}
function* updateUserRights({ payload }) {
  try {
    const response = yield post("/notifications", payload)
  } catch (error) {
    yield put(statusMessage(false))
  }
}
function* deleteUserRights({ payload }) {
  try {
    const response = yield get("/notifications", payload)
  } catch (error) {
    yield put(statusMessage(false))
  }
}

export function* usersSaga() {
  yield takeEvery(FETCH_USERS, fetchUsers)
  yield takeEvery(STATUS_MESSAGE, setStatusMessageSaga)
  yield takeEvery(UPDATE_USER_RIGHTS, updateUserRights)
}

export default usersSaga
