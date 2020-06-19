import { AxiosResponse } from 'axios';
import { ResultData } from './typings';
import { REQUEST_FAIL_TOAST, REQUEST_FAIL_ALERT } from '../Const';
import { Toast } from 'components/common';

function toast(res: AxiosResponse<ResultData>) {
  // console.log('res', res);
  const {
    data: { code, message },
  } = res;
  switch (code) {
    case REQUEST_FAIL_TOAST:
    case REQUEST_FAIL_ALERT:
      Toast.show(message);
      break;
    default:
      break;
  }
}

export default toast;
