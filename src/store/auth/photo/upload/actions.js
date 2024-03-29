import { UPLOAD_PHOTO, UPLOAD_PHOTO_ERROR, UPLOAD_PHOTO_SUCCESS } from './actionTypes';

export const uploadPhoto = (payload) => {
  return {
    type: UPLOAD_PHOTO,
    payload: payload,
  };
};

export const uploadPhotoSuccess = (payload) => {
  return {
    type: UPLOAD_PHOTO_SUCCESS,
    payload: payload,
  };
};

export const uploadPhotoError = (error) => {
  return {
    type: UPLOAD_PHOTO_ERROR,
    payload: error,
  };
};
