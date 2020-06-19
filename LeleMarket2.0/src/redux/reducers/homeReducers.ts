import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { Action } from '../typings';
import { TOP_NAV_REQUEST, TOP_NAV_SUCCESS, TOP_NAV_FAILURE } from '../actionTypes';

interface TopNavState {
  id: number;
  name: string;
}

const initialState: List<TopNavState> = List();

const topNav = (state = initialState, action: Action) => {
  switch (action.type) {
    case TOP_NAV_REQUEST:
      return state;
    case TOP_NAV_SUCCESS:
      return state.clear().concat(action.payload);
    case TOP_NAV_FAILURE:
      return state;
    default:
      return state;
  }
};

export default combineReducers({ topNav });
