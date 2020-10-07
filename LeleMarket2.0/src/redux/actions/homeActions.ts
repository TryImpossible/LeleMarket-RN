import { Action } from '../types';
import {
  TOP_NAV_REQUEST,
  TOP_NAV_SUCCESS,
  TOP_NAV_FAILURE,
  CHOICENESS_REQUEST,
  CHOICENESS_SUCCESS,
  CHOICENESS_FAILURE,
  TOP_NAV_INFO_REQUEST,
  TOP_NAV_INFO_SUCCESS,
  TOP_NAV_INFO_FAILURE,
} from '../actionTypes';
import { TopNavBean, ChoicenessData, RecommendGoodsBean } from 'src/models/homeModel';

const topNavReqeust = (): Action => ({ type: TOP_NAV_REQUEST });
const topNavSuccess = (payload: TopNavBean[]): Action<TopNavBean[]> => ({ type: TOP_NAV_SUCCESS, payload });
const topNavFailure = (): Action => ({ type: TOP_NAV_FAILURE, payload: [] });

const choicenessReqeust = (): Action => ({ type: CHOICENESS_REQUEST });
const choicenessSuccess = (payload: ChoicenessData): Action<ChoicenessData> => ({ type: CHOICENESS_SUCCESS, payload });
const choicenessFailure = (): Action => ({ type: CHOICENESS_FAILURE, payload: {} });

const topNavInfoReqeust = (id: number, page: number): Action<{ id: number; page: number }> => ({
  type: TOP_NAV_INFO_REQUEST,
  payload: { id, page },
});
const topNavInfoSuccess = (payload: RecommendGoodsBean[]): Action<RecommendGoodsBean[]> => ({
  type: TOP_NAV_INFO_SUCCESS,
  payload,
});
const topNavInfoFailure = (): Action => ({ type: TOP_NAV_INFO_FAILURE, payload: [] });

export {
  topNavReqeust,
  topNavSuccess,
  topNavFailure,
  choicenessReqeust,
  choicenessSuccess,
  choicenessFailure,
  topNavInfoReqeust,
  topNavInfoSuccess,
  topNavInfoFailure,
};
