import {
  API_ERROR,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from './actionTypes';

const initialState = {
  error: '',
  isAuth: false,
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    case LOGOUT_USER:
      return { ...state, isAuth: false };
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
