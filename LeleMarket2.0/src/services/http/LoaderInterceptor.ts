import { AxiosResponse } from 'axios';
import { CustomAxiosRequestConfig } from './index';
import { Loader } from 'components/common';

function request(req: CustomAxiosRequestConfig) {
  const { showLoader } = req;
  showLoader && Loader.show();
}

function response(res: AxiosResponse) {
  const { config } = res;
  const { showLoader } = config as CustomAxiosRequestConfig;
  showLoader && Loader.hide();
  Object.assign(config, { showLoader: false });
}

export default {
  request,
  response,
};
