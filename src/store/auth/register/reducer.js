import { REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESSFUL } from './actionTypes';

const initialState = {
  registrationError: null,
  registerSuccessful: false,
  loading: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      };
      break;
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        registerSuccessful: action.payload,
        registrationError: null,
      };
      break;
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        registerSuccessful: false,
        loading: false,
        registrationError: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default account;
