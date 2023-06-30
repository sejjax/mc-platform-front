import {
  GET_PROJECTS_FAIL,
  GET_PROJECTS_LIST_FAIL,
  GET_PROJECTS_LIST_SUCCESS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  SET_PROJECT_BUTTON_CONDITION,
} from './actionTypes';

const INIT_STATE = {
  projectsList: [],
  projects: [],
  projectDetail: {},
  error: {},
  isDepositButtonDisabledByInvestment: true,
};

const Project = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case SET_PROJECT_BUTTON_CONDITION:
      return { ...state, isDepositButtonDisabledByInvestment: action.payload };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        projectDetail: action.payload,
      };

    case GET_PROJECT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        projectsList: action.payload,
      };

    case GET_PROJECTS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Project;
