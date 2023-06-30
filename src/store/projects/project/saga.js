import { call, put, takeEvery } from 'redux-saga/effects';

//Include Both Helper File with needed methods
import { getProjects, getProjectsDetails, getProjectsList } from 'services/projectService';

// Crypto Redux States
import { GET_PROJECTS, GET_PROJECTS_LIST, GET_PROJECT_DETAIL } from './actionTypes';
import {
  getProjectDetailFail,
  getProjectDetailSuccess,
  getProjectsFail,
  getProjectsListFail,
  getProjectsListSuccess,
  getProjectsSuccess,
} from './actions';

function* fetchProjects({ projectSlug }) {
  try {
    const response = yield call(getProjects, projectSlug);
    yield put(getProjectsSuccess(response));
  } catch (error) {
    yield put(getProjectsFail(error));
  }
}

function* fetchProjectsList() {
  try {
    const response = yield call(getProjectsList);
    yield put(getProjectsListSuccess(response));
  } catch (error) {
    yield put(getProjectsListFail(error));
  }
}

function* fetchProjectDetail({ projectSlug }) {
  try {
    const response = yield call(getProjectsDetails, projectSlug);
    yield put(getProjectDetailSuccess(response));
  } catch (error) {
    yield put(getProjectDetailFail(error));
  }
}

function* projectsSaga() {
  yield takeEvery(GET_PROJECTS, fetchProjects);
  yield takeEvery(GET_PROJECTS_LIST, fetchProjectsList);
  yield takeEvery(GET_PROJECT_DETAIL, fetchProjectDetail);
}

export default projectsSaga;
