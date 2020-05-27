import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Loader } from 'components/common';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showLoader?: boolean;
  startTime?: number;
  endTime?: number;
}

function show(req: CustomAxiosRequestConfig) {
  const { showLoader } = req;
  showLoader && Loader.show();
}

function dismiss(res: AxiosResponse) {
  const { config } = res;
  const { showLoader } = config as CustomAxiosRequestConfig;
  showLoader && Loader.dismiss();
  Object.assign(config, { showLoader: false });
}

export default {
  show,
  dismiss,
};
