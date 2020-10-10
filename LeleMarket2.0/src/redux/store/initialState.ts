import IMAGES from '@resources/images';
import { MineIndexState } from '@src/models/mineModel';

export default {
  home: { topNav: [], choiceness: [], topNavInfo: [] },
  mine: {
    indexData: [
      {
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
      },
      {
        title: 'helps',
        data: [
          { icon: IMAGES.ic_mine_coupon, text: '我的礼券' },
          { icon: IMAGES.ic_mine_works, text: '我的作品' },
          { icon: IMAGES.ic_mine_friends, text: '我的好友' },
          { icon: IMAGES.ic_mine_address, text: '收货地址' },
          { icon: IMAGES.ic_mine_customer_service, text: '客服和售后' },
        ],
      },
      {
        title: 'more',
        data: [
          { icon: IMAGES.ic_mine_scan_qrcode, text: '扫乐唯码' },
          { icon: IMAGES.ic_mine_see_more, text: '更多' },
        ],
      },
    ] as MineIndexState,
  },
};
