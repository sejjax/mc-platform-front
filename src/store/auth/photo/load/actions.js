import {
  GET_PHOTO,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
} from "./actionTypes"

export const getPhoto = payload => {
  return {
    type: GET_PHOTO,
    payload: payload
  }
}

export const getPhotoSuccess = payload => {
  return {
    type: GET_PHOTO_SUCCESS,
    payload: payload
  }
}

export const getPhotoError = error => {
  return {
    type: GET_PHOTO_ERROR,
    payload: error
  }
}
