
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = (user, history) => {
  return {
    type: REGISTER_USER,
    payload: { user, history },
  }
}

export const registerUserSuccessful = messages => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: messages,
  }
}

export const registerUserFailed = messages => {
  return {
    type: REGISTER_USER_FAILED,
    payload: messages,
  }
}
