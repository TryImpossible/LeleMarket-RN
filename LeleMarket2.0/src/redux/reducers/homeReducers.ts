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
import { TopNavBean, TopNavState, ChoicenessData, ChoicenessState } from 'src/models/homeModel';

const topNav = (state: TopNavState = [], action: Action<TopNavBean[]>): TopNavState => {
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

const choiceness = (state: ChoicenessState = [], action: Action<ChoicenessData>): ChoicenessState => {
  switch (action.type) {
    case CHOICENESS_REQUEST:
      return state;
    case CHOICENESS_SUCCESS:
      const data: ChoicenessState = [];
      const payload = action.payload;
      if (payload != null) {
        data.push({ title: 'banners', data: [payload.banners] });
        data.push({ title: 'midNav', data: [payload.midNav] });
        data.push({ title: 'handpick', name: '开启定制之旅', data: [payload.handpick] });
        data.push({ title: 'customization', name: '定制推荐', data: payload.customization });
      }
      return data;
    case CHOICENESS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default combineReducers({ topNav, choiceness });
