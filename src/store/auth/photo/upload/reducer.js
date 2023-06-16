import {
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_ERROR,
} from "./actionTypes"

const initialState = {
  upload: null,
  error: null,
}

const uploadPhoto = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return {
        ...state
      }

    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        upload: action.payload
      }

    case UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default uploadPhoto
