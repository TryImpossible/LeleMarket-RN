// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import homeReducers from './homeReducers';
import mineReducers from './mineReducers';

export default combineReducers({ home: homeReducers, mine: mineReducers });
