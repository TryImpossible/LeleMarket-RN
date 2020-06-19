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

import * as Redux from 'redux';

export interface FSA {
  type: any;
  payload?: any;
  error?: boolean;
  meta?: any;
}

function isPromise(val: any): boolean {
  return val && typeof val.then === 'function';
}

function reduxActionsPromise({ dispatch, getState }: Redux.MiddlewareAPI): any {
  return (next: Redux.Dispatch) => (action: FSA) => {
    if (typeof action.payload === 'function') {
      const res = action.payload(dispatch, getState);
      if (isPromise(res)) {
        res.then(
          (result: any) => {
            dispatch({
              ...action,
              payload: result,
            });
          },
          (error: Error) => {
            dispatch({
              ...action,
              payload: error,
              error: true,
            });
          },
        );
      } else {
        dispatch({
          ...action,
          payload: res,
        });
      }
    } else {
      next(action);
    }
  };
}

const ReduxActionsPromise: Redux.Middleware = reduxActionsPromise;
export default ReduxActionsPromise;
