import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECTS_LIST,
  GET_PROJECTS_LIST_SUCCESS,
  GET_PROJECTS_LIST_FAIL,
  SET_PROJECT_BUTTON_CONDITION,
} from "./actionTypes"

export const getProjects = projectSlug => ({
  type: GET_PROJECTS,
  projectSlug,
})

export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects,
})

export const getProjectsFail = error => ({
  type: GET_PROJECTS_FAIL,
  payload: error,
})

export const getProjectsList = () => ({
  type: GET_PROJECTS_LIST,
})

export const getProjectsListSuccess = projectsList => ({
  type: GET_PROJECTS_LIST_SUCCESS,
  payload: projectsList,
})

export const getProjectsListFail = error => ({
  type: GET_PROJECTS_LIST_FAIL,
  payload: error,
})

export const getProjectDetail = projectSlug => ({
  type: GET_PROJECT_DETAIL,
  projectSlug,
})

export const getProjectDetailSuccess = projectDetails => ({
  type: GET_PROJECT_DETAIL_SUCCESS,
  payload: projectDetails,
})

export const getProjectDetailFail = error => ({
  type: GET_PROJECT_DETAIL_FAIL,
  payload: error,
})

export const setProjectButtonCondition = value => ({
  type: SET_PROJECT_BUTTON_CONDITION,
  payload: value,
})
