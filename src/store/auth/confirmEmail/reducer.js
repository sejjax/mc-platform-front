import { CONFIRM_EMAIL, CONFIRM_FAILS, CONFIRM_SUCCESS } from './actionsTypes';

const initialState = {
  confirmSuccess: null,
  confirmFails: null,
};

const confirmEmail = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_EMAIL:
      state = {
        ...state,
        confirmSuccess: null,
        confirmFails: null,
      };
      break;
    case CONFIRM_SUCCESS:
      state = {
        ...state,
        confirmSuccess: action.payload,
      };
      break;
    case CONFIRM_FAILS:
      state = {
        ...state,
        confirmFails: action.payload,
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export default confirmEmail;
