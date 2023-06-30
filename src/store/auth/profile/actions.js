import {
  EDIT_DEFAULT_WALLET_NUMBER,
  EDIT_PROFILE,
  FETCH_PROFILE_DATA,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  RESET_PROFILE_DATA,
  RESET_PROFILE_FLAG,
  SET_AGREEMENT,
  SET_PROFILE_DATA,
} from './actionTypes';

export const editProfile = (payload) => {
  return {
    type: EDIT_PROFILE,
    payload: payload,
  };
};

export const profileSuccess = (msg) => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  };
};

export const profileError = (error) => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  };
};

export const resetProfileFlag = (error) => {
  return {
    type: RESET_PROFILE_FLAG,
  };
};

export const setProfileData = (data) => ({
  type: SET_PROFILE_DATA,
  payload: data,
});

export const resetProfileData = () => ({
  type: RESET_PROFILE_DATA,
});

export const editDefaultWalletNumber = (walletNumber) => ({
  type: EDIT_DEFAULT_WALLET_NUMBER,
  payload: walletNumber,
});

export const fetchProfileData = () => ({
  type: FETCH_PROFILE_DATA,
});

export const setAgreement = (agreement) => ({
  type: SET_AGREEMENT,
  payload: agreement,
});
