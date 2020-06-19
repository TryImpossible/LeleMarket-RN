import { Meta, Action } from '../typings';
import { TOP_NAV_REQUEST, TOP_NAV_SUCCESS, TOP_NAV_FAILURE } from '../actionTypes';

const topNavReqeust = (meta: Meta): Action => ({ type: TOP_NAV_REQUEST, meta });
const topNavSuccess = (payload: []): Action => ({ type: TOP_NAV_SUCCESS, payload });
const topNavFailure = (): Action => ({ type: TOP_NAV_FAILURE, payload: [] });

export { topNavReqeust, topNavSuccess, topNavFailure };
