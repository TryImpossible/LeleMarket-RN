import HttpClient from './HttpClient';
const ServerApi = {
  logging: (data: object) => {
    HttpClient.get('', data, { baseURL: 'http://192.168.1.3:9090' });
  },

  testSign: () =>
    HttpClient.post('/test/sign', {
      b: 'b',
      a: 'a',
      ac: 'ac',
      ab: 'ab',
      emoji: '/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f/:P-(/:,@f',
    }),

  testGet: () => HttpClient.get('/mock/871b3e736e653b99374b7713e4011f9f/boss/user/list'),

  testPost: () => {},
};
export default ServerApi;
