import { put, takeEvery, call } from 'redux-saga/effects';
import ServerApi from 'services/http';
import { TOP_NAV_REQUEST } from '../actionTypes';
import { topNavSuccess, topNavFailure } from '../actions';

function* fetchTopNavData() {
  try {
    const { data } = yield call(ServerApi.topNav);
    yield put(topNavSuccess(data));
  } catch (error) {
    yield put(topNavFailure());
  }
}

function* home() {
  yield takeEvery(TOP_NAV_REQUEST, fetchTopNavData);
}

export default home;
