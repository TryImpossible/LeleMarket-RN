import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { Action } from '../Types';

// const readyStatePromise = (store) => (next) => (action) => {
//   if (!action.promise) {
//     return next(action);
//   }

//   function makeAction(ready, data) {
//     let newAction = Object.assign({}, action, { ready }, data);
//     delete newAction.promise;
//     return newAction;
//   }

//   next(makeAction(false));
//   return action.promise.then(
//     (result) => {
//       console.warn('result', result);
//       return next(makeAction(true, { result }));
//     },
//     (error) => {
//       console.warn('error', error);
//       return next(makeAction(true, { error }));
//     },
//   );
// };

// const vanillaPromise = (store) => (next) => (action) => {
//   if (typeof action.then !== 'function') {
//     return next(action);
//   }

//   return Promise.resolve(action).then(store.dispatch);
// };

// export default function deferred() {
//   const def = {};
//   def.promise = new Promise((resolve, reject) => {
//     def.resolve = resolve;
//     def.reject = reject;
//   });
//   return def;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function requestMiddleware({ dispatch, getState }: MiddlewareAPI): any {
  return (next: Dispatch) => (action: Action) => {
    Object.assign(action, { meta: { key: Math.random() } });
    console.warn(action);
    // if (!action.meta || !action.meta.request) {
    //   next(action);
    // }
    // return new Promise(function (resolve, reject) {
    //   Object.assign(action, { meta: { ...action.meta, resolve, reject } });
    //   next(action);
    // });
    next(action);
  };
}

const RequestMiddleware: Middleware = requestMiddleware;
export default RequestMiddleware;
