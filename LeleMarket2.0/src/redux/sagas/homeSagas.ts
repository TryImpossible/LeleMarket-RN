import { put, takeEvery, call } from 'redux-saga/effects';
import ServerApi from '@services/http';
import { TOP_NAV_REQUEST, CHOICENESS_REQUEST, TOP_NAV_INFO_REQUEST } from '../actionTypes';
import {
  topNavSuccess,
  topNavFailure,
  choicenessSuccess,
  choicenessFailure,
  topNavInfoSuccess,
  topNavInfoFailure,
} from '../actions';
import { Action } from '../types';
import { TopNavResp, ChoicenessResp, TopNavInfoResp } from '@src/models/homeModel';

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

function* fetchTopNavInfoData({ payload }: Action<{ id: number; page: number }>) {
  try {
    if (!payload) {
      return;
    }
    const { id, page } = payload;
    const { data }: TopNavInfoResp = yield call(ServerApi.topNavInfoByPage, id, page);
    yield put(topNavInfoSuccess(data));
  } catch (error) {
    yield put(topNavInfoFailure());
  }
}

function* home() {
  yield takeEvery(TOP_NAV_REQUEST, fetchTopNavData);
  yield takeEvery(CHOICENESS_REQUEST, fetchChoicenessData);
  yield takeEvery(TOP_NAV_INFO_REQUEST, fetchTopNavInfoData);
}

export default home;
