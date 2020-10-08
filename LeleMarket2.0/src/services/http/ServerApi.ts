import HttpClient from './HttpClient';

const ServerApi = {
  // logging: (data: object) => {
  //   HttpClient.get('', data, { baseURL: 'http://192.168.1.3:9090' });
  // },

  testSign: () =>
    HttpClient.post('/test/sign', {
      b: 'b',
      a: 'a',
      ac: 'ac',
      ab: 'ab',
      emoji: '/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f',
    }),

  testGet: () => HttpClient.get('/diyMall/index/sortHome.do?type=topNav'),

  testPost: () => HttpClient.post('/diyMall/index/homeRevision2.do'),

  /**
   * 首页滚动导航栏标签
   */
  topNav: () => HttpClient.get('/diyMall/index/sortHome.do?type=topNav'),

  /**
   * 顶部导航，精选Tab
   */
  choiceness: () => HttpClient.get('/diyMall/index/homeRevision2.do'),

  /**
   * 顶部导航，其它Tab栏，第一页数据
   */
  topNavInfo: (id: number) => HttpClient.post('/diyMall/index/topNavInfo.do', undefined, { params: { id } }),

  /**
   * 顶部导航，其它Tab栏，分页接口
   */
  topNavInfoByPage: (id: number, page: number) =>
    HttpClient.get('/diyMall/index/topNavInfoByPage.do', undefined, { params: { id, page }, showLoader: false }),
};
export default ServerApi;
