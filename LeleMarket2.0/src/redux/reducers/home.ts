import { setIn, Record } from 'immutable';
import { Action } from '../Types';
import { SORT_HOME_REQUEST, SORT_HOME_SUCCESS, SORT_HOME_FAILURE } from '../actionTypes';

const sortHome = (state = [], action: Action) => {
  switch (action.type) {
    case SORT_HOME_REQUEST:
      return state;
    case SORT_HOME_SUCCESS:
      return { ...state, sortHome: action.payload };
    case SORT_HOME_FAILURE:
      return state;
    default:
      return state;
  }
};

export default sortHome;
