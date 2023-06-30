import { API_FAIL, API_SUCCESS } from '../common/actionTypes';
import { GET_CHARTS_DATA, GET_INCOME, GET_REFERRALS } from './actionTypes';

const INIT_STATE = {
  referrals: undefined,
};

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsData: action.payload.data,
          };
        case GET_REFERRALS:
          return {
            ...state,
            referrals: action.payload.data,
          };
        case GET_INCOME:
          return {
            ...state,
            income: action.payload.data,
          };
        default:
          return state;
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsDataError: action.payload.error,
          };
        case GET_REFERRALS:
          return {
            ...state,
            referralsError: action.payload.error,
          };
        case GET_INCOME:
          return {
            ...state,
            incomeError: action.payload.error,
          };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default Dashboard;
