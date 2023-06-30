import { API_FAIL, API_SUCCESS } from '../common/actionTypes';
import {
  GET_PARTNERS,
  GET_PARTNERS_INCOME,
  GET_TEAM_INFO,
  SET_PARTNERS_INCOME_RANGE,
} from './actionTypes';

const INIT_STATE = {
  teamInfo: {
    partnerId: '',
    totalReferrals: 0,
    teamIncome: 0,
    referralsIncome: 0,
    firstDeposit: 0,
    firstReferrals: 0,
    firstReferralsIncome: 0,
    teamDeposit: 0,
  },
  partnersIncome: Array.from({ length: 6 }, (_, key) => [
    key,
    {
      referred: 0,
      income: 0,
      dateFrom: new Date(2022, 0, 1),
      dateTo: new Date(2022, 11, 31),
    },
  ]).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {}),
  partners: [],
};

const Team = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_PARTNERS_INCOME_RANGE:
      return {
        ...state,
        partnersIncome: {
          ...state.partnersIncome,
          [action.level]: {
            ...state.partnersIncome[action.level],
            dateFrom: action.from,
            dateTo: action.to,
          },
        },
      };
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TEAM_INFO:
          return {
            ...state,
            teamInfo: action.payload.data,
          };
        case GET_PARTNERS_INCOME:
          return {
            ...state,
            partnersIncome: {
              ...state.partnersIncome,
              [action.payload.level]: {
                ...state.partnersIncome[action.payload.level],
                ...action.payload.data,
              },
            },
          };
        case GET_PARTNERS:
          return {
            ...state,
            partners: action.payload.data,
          };
        default:
          return state;
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_TEAM_INFO:
          return {
            ...state,
            teamInfoError: action.payload.error,
          };
        case GET_PARTNERS:
          return {
            ...state,
            partnersError: action.payload.error,
          };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default Team;

export const getTeamInfoSelector = (state) => state.Team.teamInfo;
