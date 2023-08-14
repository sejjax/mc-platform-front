import { SET_INVESTMENTS, SET_INVESTMENTS_ANALYSIS, SET_INVESTMENTS_SUMMARY } from './actionTypes';

const initState = {
  items: [],
  investmentSummary: {},
  investmentAnalysis: {},
};

const Investments = (state = initState, action) => {
  switch (action.type) {
    case SET_INVESTMENTS:
      return { ...state, items: action.payload };

    case SET_INVESTMENTS_SUMMARY:
      return { ...state, investmentSummary: action.payload };

    case SET_INVESTMENTS_ANALYSIS:
      return { ...state, investmentAnalysis: action.payload };

    default:
      return state;
  }
};

export default Investments;
