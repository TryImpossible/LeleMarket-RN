import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MD5 } from 'crypto-js';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Logger from 'utilities/Logger';
import {
  REQUEST_BASE_URL,
  REQUEST_KEY,
  REQUEST_DUPLICATED,
  REQUEST_TIMEOUT_ERROR,
  REQUEST_SUCCESS,
  REQUEST_FAIL_TOAST,
  REQUEST_FAIL_ALERT,
  REQUEST_FAIL_TOKEN_EXPIRE,
  THIRD_PARTY_BASEURL,
} from '../Const';
import { CustomAxiosRequestConfig, ResultData } from './index';
import LoggerInterceptor from './LoggerInterceptor';
import LoaderInterceptor from './LoaderInterceptor';

function buildSignature(params: { [name: string]: any }) {
  let str = Object.keys(params)
    .sort()
    .reduce((last, cureent) => {
      // NOTE: file类型不参与签名
      if (params[cureent] && params[cureent].type === 'multipart/form-data') {
        return '';
      }
      return `${last}${cureent}=${params[cureent]}&`;
    }, '')
    .trim();
  str += `key=${REQUEST_KEY}`;
  return MD5(str).toString();
}

function buildForm(params: { [name: string]: any }) {
  const form = new FormData();
  Object.keys(params)
    .sort()
    .forEach((key) => {
      form.append(key, params[key]);
    });
  return form;
}

const defaultConfig: CustomAxiosRequestConfig = {
  baseURL: REQUEST_BASE_URL,
  timeout: 30000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    PLATFORM: Platform.OS,
    BRAND: DeviceInfo.getBrand(),
    'T-App-Version': DeviceInfo.getVersion(),
    'T-Device-System': `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
    'T-Device-IMEI': DeviceInfo.getUniqueId(),
    'T-Device-Model': DeviceInfo.getModel(),
  },
  showLoader: true,
};

const onSuccess = (response: AxiosResponse<ResultData>) => {
  const {
    config: { baseURL = '', url = '' },
    data: { code, message },
  } = response;
  if (THIRD_PARTY_BASEURL.some((item) => baseURL.includes(item))) {
    return Promise.resolve(response.data);
  }

  if (code === REQUEST_SUCCESS) {
    return Promise.resolve(response.data);
  } else {
    switch (code) {
      case REQUEST_FAIL_TOAST:
        // Toast
        if (url.includes('/game/') || url.includes('common/check-version')) {
          break;
        }
        // Toast.show(message);
        break;
      case REQUEST_FAIL_ALERT:
        // Alert
        if (url.includes('/game/')) {
          break;
        }
        // Confirm.getInstance().setContent(message).setCancel(null).show();
        break;
      case REQUEST_FAIL_TOKEN_EXPIRE:
        // relogin
        // Toast.show(message);
        // logout();
        break;
      default:
        break;
    }
    return Promise.reject(
      Object.assign({}, response.data, {
        showToast: code !== REQUEST_FAIL_ALERT && !url.includes('/game/') && !url.includes('common/check-version'),
      }),
    );
  }
};

const onFail = (error) => {
  const { code, message, showToast = true } = error;
  switch (code) {
    case REQUEST_DUPLICATED:
      return null;
    case REQUEST_TIMEOUT_ERROR:
      if (!showToast) {
        break;
      }
      // Toast.show('request timeout');
      break;
    default:
      if (!showToast) {
        break;
      }
      // Toast.show(message);
      break;
  }
  return Promise.reject(error);
};

const instance: AxiosInstance = axios.create(defaultConfig);

const request = (config: CustomAxiosRequestConfig) => {
  return instance.request(config).then(onSuccess).catch(onFail);
};

const get = (url: string, query: object = {}, config: CustomAxiosRequestConfig = {}) => {
  return request({
    url,
    method: 'get',
    params: query,
    ...config,
  });
};

const post = (url: string, body: object = {}, config: CustomAxiosRequestConfig = {}) => {
  const defaultBody = {
    nonce_str: Math.random().toString(36).substr(2),
    timestamp: new Date().getTime(),
  };
  Object.assign(body, defaultBody, global.user ? { token: global.user.token } : {});
  const sign = buildSignature(body);
  Object.assign(body, { sign });
  const form = buildForm(body);
  return request({
    url,
    method: 'post',
    data: form,
    ...config,
  });
};

// const filterUrl = [
//   'common/upload-image',
//   'social/choice',
//   'social/contact-has-update',
//   'social/contact-list',
//   'wallet/recharge',
// ];
// const pending = [];
// const removePending = (config) => {
//   pending.forEach(({ url, cancel }, index) => {
//     if (config.url === url) {
//       cancel && cancel(REQUEST_DUPLICATED);
//       pending.splice(index, 1);
//     }
//   });
// };

instance.interceptors.request.use(
  (req: CustomAxiosRequestConfig) => {
    LoggerInterceptor.request(req);
    LoaderInterceptor.request(req);
    Logger.info(req);
    // removePending(config);
    // if (!filterUrl.includes(config.url)) {
    //   Object.assign(config, {
    //     cancelToken: new axios.CancelToken((c) => {
    //       pending.push({ url: config.url, cancel: c });
    //     }),
    //   });
    // }
    return req;
    // README: 这里throw new Error()和 return Promise.reject()会被下面捕获
  },
  (error) => {
    LoggerInterceptor.error(error);
    Logger.info(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    LoggerInterceptor.response(response);
    LoaderInterceptor.response(response);
    Logger.info(response);

    const { config, data } = response;
    // removePending(response.config);
    return response;
    // README: 这里throw new Error()和 return Promise.reject()不会被下面捕获
  },
  (error) => {
    LoggerInterceptor.error(error);
    LoaderInterceptor.response(error);
    const { config, message } = error;
    Logger.info(error);
    if (message && message.includes('timeout')) {
      return Promise.reject(
        Object.assign(new Error(), {
          code: REQUEST_TIMEOUT_ERROR,
          message: REQUEST_TIMEOUT_ERROR,
          showToast: config && !config.url.includes('/game/'),
        }),
      );
    }
    if (message && message.includes(REQUEST_DUPLICATED)) {
      return Promise.reject(Object.assign(new Error(), { code: REQUEST_DUPLICATED, message: REQUEST_DUPLICATED }));
    }
    error.showToast = config && !config.url.includes('/game/');
    return Promise.reject(error);
  },
);

const HttpClient = {
  get,
  post,
};

export default HttpClient;
