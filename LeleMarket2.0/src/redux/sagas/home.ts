import { put, takeEvery, call } from 'redux-saga/effects';
import ServerApi from 'services/http';
import { Action } from '../Types';
import { SORT_HOME_REQUEST } from '../actionTypes';
import { sortHomeSuccess, sortHomeFailure } from '../actions';

function* fetchSortHomeData(action: Action) {
  const { onSuccess, onFailure } = action.meta || {};
  try {
    const { data } = yield call(ServerApi.sortHome);
    yield put(sortHomeSuccess(data));
    onSuccess && onSuccess(data);
  } catch (error) {
    yield put(sortHomeFailure());
    onFailure && onFailure(error);
  }
}

function* home() {
  yield takeEvery(SORT_HOME_REQUEST, fetchSortHomeData);
}

export default home;
