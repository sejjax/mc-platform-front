import { SET_INVESTMENTS } from './actionTypes';

const initState = {
  items: [],
};

const Investments = (state = initState, action) => {
  switch (action.type) {
    case SET_INVESTMENTS:
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export default Investments;
