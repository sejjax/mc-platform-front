import { SET_ACCRUALS } from './actionTypes';

const initState = {
  items: [],
};

const Accruals = (state = initState, action) => {
  switch (action.type) {
    case SET_ACCRUALS:
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export default Accruals;
