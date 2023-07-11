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

function* fetchProjects({ projectSlug, locale }) {
  try {
    const response = yield call(getProjects, projectSlug, locale);
    yield put(getProjectsSuccess(response));
  } catch (error) {
    yield put(getProjectsFail(error));
  }
}

function* fetchProjectsList({ locale }) {
  try {
    const response = yield call(getProjectsList, locale);
    yield put(getProjectsListSuccess(response));
  } catch (error) {
    yield put(getProjectsListFail(error));
  }
}

function* fetchProjectDetail({ projectSlug, locale }) {
  try {
    const response = yield call(getProjectsDetails, projectSlug, locale);
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
