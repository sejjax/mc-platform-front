import { SET_PAGINATION, SET_TOTAL_ITEMS } from './actionsTypes';

export const setPagination = (pageNumber, size, total) => ({
  type: SET_PAGINATION,
  payload: { pageNumber, size, total },
});
export const setTotalItems = (total) => ({
  type: SET_TOTAL_ITEMS,
  payload: { total },
});
