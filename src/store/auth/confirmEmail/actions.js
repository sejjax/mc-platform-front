import {
  CONFIRM_EMAIL,
  CONFIRM_SUCCESS,
  CONFIRM_FAILS
} from './actionsTypes';

export const confirmEmail = (hash, history) => {
  return {
    type: CONFIRM_EMAIL,
    payload: {hash, history}
  }
}

export const confirmSuccess = message => {
  return {
    type: CONFIRM_SUCCESS,
    payload: {message}
  }
}

export const confirmFails = (message) => {
  return {
    type: CONFIRM_FAILS,
    payload: message,
  }
}