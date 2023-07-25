import { SET_INVESTMENTS, SET_INVESTMENTS_SUMMARY } from './actionTypes';

const initState = {
  items: [],
  investmentSummary: {},
};

const Investments = (state = initState, action) => {
  switch (action.type) {
    case SET_INVESTMENTS:
      return { ...state, items: action.payload };

    case SET_INVESTMENTS_SUMMARY:
      return { ...state, investmentSummary: action.payload };

    default:
      return state;
  }
};

export default Investments;
