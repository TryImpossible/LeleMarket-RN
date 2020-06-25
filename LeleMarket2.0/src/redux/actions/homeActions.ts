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

const topNavReqeust = (): Action<never> => ({ type: TOP_NAV_REQUEST });
const topNavSuccess = (payload: TopNavBean[]): Action<TopNavBean[]> => ({ type: TOP_NAV_SUCCESS, payload });
const topNavFailure = (): Action<[]> => ({ type: TOP_NAV_FAILURE, payload: [] });

const choicenessReqeust = (): Action<never> => ({ type: CHOICENESS_REQUEST });
const choicenessSuccess = (payload: ChoicenessData): Action<ChoicenessData> => ({ type: CHOICENESS_SUCCESS, payload });
const choicenessFailure = (): Action<{}> => ({ type: CHOICENESS_FAILURE, payload: {} });

export { topNavReqeust, topNavSuccess, topNavFailure, choicenessReqeust, choicenessSuccess, choicenessFailure };
