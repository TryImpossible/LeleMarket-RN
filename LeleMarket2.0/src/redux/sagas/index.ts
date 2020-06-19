import { fork } from 'redux-saga/effects';
import homeSagas from './homeSagas';

function* rootSaga() {
  yield fork(homeSagas);
}

export default rootSaga;
