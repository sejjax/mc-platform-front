import { GET_RISKS_FAIL, GET_RISKS_SUCCESS } from './actionTypes';

const INIT_STATE = {
  risks: [],
  error: {},
};

const Risk = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_RISKS_SUCCESS:
      return {
        ...state,
        risks: action.payload,
      };

    case GET_RISKS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Risk;
