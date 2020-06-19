import { combineReducers } from 'redux-immutable';
import homeReducers from './homeReducers';

export default combineReducers({ home: homeReducers });
