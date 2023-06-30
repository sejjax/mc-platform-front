import { GET_PHOTO, GET_PHOTO_ERROR, GET_PHOTO_SUCCESS } from './actionTypes';

const initialState = {
  photo: null,
  error: null,
};

const getPhoto = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTO:
      return {
        ...state,
      };

    case GET_PHOTO_SUCCESS:
      return {
        ...state,
        photo: action.payload,
      };

    case GET_PHOTO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getPhoto;
