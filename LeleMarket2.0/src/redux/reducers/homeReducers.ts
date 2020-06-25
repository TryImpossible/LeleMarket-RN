// import Immutable, { List, Map } from 'immutable';
// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import { Action } from '../typings';
import {
  TOP_NAV_REQUEST,
  TOP_NAV_SUCCESS,
  TOP_NAV_FAILURE,
  CHOICENESS_REQUEST,
  CHOICENESS_SUCCESS,
  CHOICENESS_FAILURE,
} from '../actionTypes';
import { TopNavBean, ChoicenessData } from 'src/model/homeModel';

const topNav = (state = [], action: Action<TopNavBean[]>) => {
  switch (action.type) {
    case TOP_NAV_REQUEST:
      return state;
    case TOP_NAV_SUCCESS:
      return (action.payload || []).map(({ id, name }) => ({ key: String(id), title: name }));
    case TOP_NAV_FAILURE:
      return state;
    default:
      return state;
  }
};

// const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

const choiceness = (state = {}, action: Action<ChoicenessData & { [key: string]: any }>) => {
  switch (action.type) {
    case CHOICENESS_REQUEST:
      return state;
    case CHOICENESS_SUCCESS:
      // const data = [];
      // const payload = action.payload || {};
      // Object.keys(payload)
      //   .filter((key) => key !== 'topNav')
      //   .forEach((key) => {
      //     data.push({ title: key, data: payload });
      //   });
      // return data;
      return state;
    case CHOICENESS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default combineReducers({ topNav, choiceness });
