import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

const logger = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  console.log('preState', store.getState());
  console.log('action', action);
  next(action);
  console.log('nextState', store.getState());
};

const LoggerMiddleware: Middleware = logger;
export default LoggerMiddleware;
