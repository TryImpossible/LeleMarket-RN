import { get, post } from '../utils/NetUtil';

export default class ServerApi {

  /**
   * 首页模块 -> 一级页面: 热门搜索数据
   * @param {*} page 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static getRecommand(callback, pageName) {
    get('searchGoods/getRecommand.do', null, callback, pageName);
  }

  /**
   * 搜索
   * @param {*} key 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static getKeyword(key, callback, pageName) {
    let from = new FormData();
    form.append('name', key);
    post('searchGoods/getKeyword.do', form, callback, pageName);
  }

  /**
   * 首页模块，一级页面：顶部横向滚动条数据 
   * @param {*} type 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static sortHome(type, callback, pageName) {
    let params = {type: type};
    get('index/sortHome.do', params, callback, pageName);
  }

  /**
   * 首页模块，一级页面：精选 数据
   * @param {*} callback 
   * @param {*} pageName 
   */
  static homeRevision(callback, pageName) {
    post('index/homeRevision2.do', null, callback, pageName);
  }

  /**
   * 首页模块，一级页面：顶部Other选项栏 数据
   * @param {*} id 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static topNavInfo(id, callback, pageName) {
    let form = new FormData();
    form.append('id', id);
    post('index/topNavInfo.do', form, callback, pageName);
  }

  /**
   * 首页模块，一级页面：顶部Other选项栏 分页数据
   * @param {*} id 
   * @param {*} page 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static topNavInfoByPage(id, page, callback, pageName) {
    let form = new FormData();
    form.append('id', id);
    form.append('page', page);
    post('index/topNavInfoByPage.do', form, callback, pageName);
  }

  /**
   * 发现模块 -> 一级页面: 列表
   * @param {*} page 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static findList(page, callback, pageName) {
    let form = new FormData();
    form.append('page', page);
    post('commodity/findList.do', form, callback, pageName);
  }

  /**
   * 定制模块 -> 一级页面: 左侧菜单栏
   * @param {*} callback 
   * @param {*} pageName 
   */
  static menu(callback, pageName) {
    get('homeNav2/menu.do', {}, callback, pageName);
  }

  /**
   * 定制模块 -> 一级页面: 右侧商品
   * @param {*} id 
   * @param {*} page 
   * @param {*} callback 
   * @param {*} pageName 
   */
  static goods(id, page, callback, pageName) {
    let params = { id: id, page: page };
    get('homeNav2/menu/goods.do', params, callback, pageName);
  }
}
