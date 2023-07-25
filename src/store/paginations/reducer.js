// paginationReducer.js
import { SET_PAGINATION, SET_TOTAL_ITEMS } from './actionsTypes';

const initialState = {
  pageNumber: 1,
  size: 10,
  total: 0,
};

const PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        size: action.payload.size,
      };
    case SET_TOTAL_ITEMS:
      return {
        ...state,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default PaginationReducer;
