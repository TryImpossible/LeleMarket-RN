import { AxiosResponse } from 'axios';
import { CustomAxiosRequestConfig } from './typings';

function show(req: CustomAxiosRequestConfig) {
  const { showLoader } = req;
  showLoader && Loader.current?.show();
}

function dismiss(res: AxiosResponse) {
  const { config } = res;
  const { showLoader } = config as CustomAxiosRequestConfig;
  showLoader && Loader.current?.dismiss();
  Object.assign(config, { showLoader: false });
}

export default {
  show,
  dismiss,
};
