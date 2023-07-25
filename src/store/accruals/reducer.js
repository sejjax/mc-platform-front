import { SET_ACCRUALS, SET_ACCRUALS_INCOME } from './actionTypes';

const initState = {
  items: [],
  income: {},
};

const Accruals = (state = initState, action) => {
  switch (action.type) {
    case SET_ACCRUALS:
      return { ...state, items: action.payload };

    case SET_ACCRUALS_INCOME:
      return { ...state, income: action.payload };

    default:
      return state;
  }
};

export default Accruals;
