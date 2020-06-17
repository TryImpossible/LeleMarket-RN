import { createStore, applyMiddleware, compose, Store } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware, { END, Saga, Task } from 'redux-saga';
import { createLogger } from 'redux-logger';
import { Map, Record } from 'immutable';
import initialState from './initialState';
import rootReducer from '../reducers';
import { request } from '../middlewares';

// 设定logger以配合Immutable
const logger = createLogger({
  // level: 'log',
  // collapsed: false,
  stateTransformer: (v) => {
    if (!v) {
      return {};
    } else if (v.toJSON) {
      return v.toJSON();
    }
    return v;
  },
  errorTransformer: (v) => {
    if (!v) {
      return {};
    } else if (v.toJSON) {
      return v.toJSON();
    }
    return v;
  },
  // diff: false,
});

const sagaMiddleware = createSagaMiddleware();

interface MyStore extends Store {
  close: () => void;
  runSaga<S extends Saga>(saga: S, ...args: Parameters<S>): Task;
}

function configureStore(state = initialState): MyStore {
  const middlewares = [];

  // middlewares.push(thunk); // 这里不使用thunk
  if (__DEV__) {
    middlewares.push(logger);
  }
  middlewares.push(request);
  middlewares.push(sagaMiddleware);

  const store = createStore(rootReducer, state, compose(applyMiddleware(...middlewares)));

  return { ...store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END) };
}

export default configureStore;
