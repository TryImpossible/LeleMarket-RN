import { Meta, Action } from '../Types';
import { SORT_HOME_REQUEST, SORT_HOME_SUCCESS, SORT_HOME_FAILURE } from '../actionTypes';

const sortHomeReqeust = (meta: Meta): Action => ({ type: SORT_HOME_REQUEST, meta });
const sortHomeSuccess = (payload: []): Action => ({ type: SORT_HOME_SUCCESS, payload });
const sortHomeFailure = (): Action => ({ type: SORT_HOME_FAILURE, payload: [] });

export { sortHomeReqeust, sortHomeSuccess, sortHomeFailure };
