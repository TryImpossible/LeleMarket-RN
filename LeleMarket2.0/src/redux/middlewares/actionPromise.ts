import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { PROMISE_SUFFIX, FULFILLED_SUFFIX, REJECTED_SUFFIX } from '../actionTypes';
import { Action } from '../typings';

interface P {
  [key: string]: { resolve: (value?: any) => void; reject: (value?: any) => void };
}

const promises: P = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function requestMiddleware({ dispatch, getState }: MiddlewareAPI): any {
  return (next: Dispatch) => (action: Action) => {
    const { type } = action;
    if (type.endsWith(PROMISE_SUFFIX)) {
      return new Promise(function (resolve, reject) {
        const key = type.substr(0, type.lastIndexOf(PROMISE_SUFFIX));
        promises[key] = { resolve, reject };
        next(action);
      });
    }

    if (type.endsWith(FULFILLED_SUFFIX)) {
      const key = type.substr(0, type.lastIndexOf(FULFILLED_SUFFIX));
      const { resolve } = promises[key];
      if (resolve) {
        resolve(action.payload);
        delete promises[key];
      }
      return next(action);
    }

    if (type.endsWith(REJECTED_SUFFIX)) {
      const key = type.substr(0, type.lastIndexOf(REJECTED_SUFFIX));
      const { reject } = promises[key];
      if (reject) {
        reject(action.payload);
        delete promises[key];
      }
      return next(action);
    }
    return next(action);
  };
}

const RequestMiddleware: Middleware = requestMiddleware;
export default RequestMiddleware;
