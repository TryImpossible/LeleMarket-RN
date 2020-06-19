import { Action } from '../typings';
import { TOP_NAV_REQUEST, TOP_NAV_SUCCESS, TOP_NAV_FAILURE } from '../actionTypes';

const topNavReqeust = (): Action => ({ type: TOP_NAV_REQUEST });
const topNavSuccess = (payload: []): Action => ({ type: TOP_NAV_SUCCESS, payload });
const topNavFailure = (): Action => ({ type: TOP_NAV_FAILURE, payload: [] });

export { topNavReqeust, topNavSuccess, topNavFailure };
