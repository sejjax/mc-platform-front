import { FORGET_PASSWORD, FORGET_PASSWORD_ERROR, FORGET_PASSWORD_SUCCESS } from './actionTypes';

export const userForgetPassword = (email, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { email, history },
  };
};

export const userForgetPasswordSuccess = (message) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userForgetPasswordError = (message) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  };
};
