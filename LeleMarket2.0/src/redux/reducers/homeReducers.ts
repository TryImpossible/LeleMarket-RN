import Immutable, { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { Action } from '../typings';
import { TOP_NAV_REQUEST, TOP_NAV_SUCCESS, TOP_NAV_FAILURE } from '../actionTypes';

export interface TopNavItem {
  id: number;
  name: string;
}

export type TopNavState = List<TopNavItem>;

const initialState: TopNavState = List([]);

const topNav = (state = initialState, action: Action) => {
  console.warn(state, Immutable.isImmutable(state));
  switch (action.type) {
    case TOP_NAV_REQUEST:
      return state;
    case TOP_NAV_SUCCESS:
      return state.clear().concat(action.payload);
    // return [state, ...action.payload];
    case TOP_NAV_FAILURE:
      return state;
    default:
      return state;
  }
};

export default combineReducers({ topNav });
