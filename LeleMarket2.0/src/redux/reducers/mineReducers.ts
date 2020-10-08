import { combineReducers } from 'redux';
import { Action } from '../types';
import { MINE_INDEX_DATA } from '../actionTypes';
import { MineIndexState } from '@src/models/mineModel';
import IMAGES from '@resources/images';

const indexData = (state: MineIndexState = [], action: Action): MineIndexState => {
  switch (action.type) {
    case MINE_INDEX_DATA:
      const data: MineIndexState = [];
      data.push({
        title: 'orders',
        data: [
          [
            { icon: IMAGES.ic_mine_wait_pay, text: '待付款' },
            { icon: IMAGES.ic_mine_wait_delivery, text: '待发货' },
            { icon: IMAGES.ic_mine_wait_take_delivery, text: '待收货' },
            { icon: IMAGES.ic_mine_wait_comment, text: '待评价' },
            { icon: IMAGES.ic_mine_all_order, text: '全部订单' },
          ],
        ],
      });
      data.push({
        title: 'helps',
        data: [
          { icon: IMAGES.ic_mine_coupon, text: '我的礼券' },
          { icon: IMAGES.ic_mine_works, text: '我的作品' },
          { icon: IMAGES.ic_mine_friends, text: '我的好友' },
          { icon: IMAGES.ic_mine_address, text: '收货地址' },
          { icon: IMAGES.ic_mine_customer_service, text: '客服和售后' },
        ],
      });
      data.push({
        title: 'more',
        data: [
          { icon: IMAGES.ic_mine_scan_qrcode, text: '扫乐唯码' },
          { icon: IMAGES.ic_mine_see_more, text: '更多' },
        ],
      });
      return data;
    default:
      return state;
  }
};

export default combineReducers({ indexData });
