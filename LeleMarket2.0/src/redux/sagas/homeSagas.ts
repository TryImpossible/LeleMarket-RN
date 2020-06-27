import { put, takeEvery, call } from 'redux-saga/effects';
import ServerApi from 'services/http';
import { TOP_NAV_REQUEST, CHOICENESS_REQUEST } from '../actionTypes';
import { topNavSuccess, topNavFailure, choicenessSuccess, choicenessFailure } from '../actions';
import { TopNavResp, ChoicenessResp } from 'src/models/homeModel';

function* fetchTopNavData() {
  try {
    const {
      data: { topNav },
    }: TopNavResp = yield call(ServerApi.topNav);
    yield put(topNavSuccess(topNav));
  } catch (error) {
    yield put(topNavFailure());
  }
}

function* fetchChoicenessData() {
  try {
    const { data }: ChoicenessResp = yield call(ServerApi.choiceness);
    yield put(choicenessSuccess(data));
  } catch (error) {
    yield put(choicenessFailure());
  }
}

function* home() {
  yield takeEvery(TOP_NAV_REQUEST, fetchTopNavData);
  yield takeEvery(CHOICENESS_REQUEST, fetchChoicenessData);
}

export default home;
