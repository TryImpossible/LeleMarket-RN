import { fork } from 'redux-saga/effects';
import home from './home';

function* rootSaga() {
  yield fork(home);
}

export default rootSaga;
