import { AxiosResponse } from 'axios';
import { REQUEST_FAIL_TOAST, REQUEST_FAIL_ALERT } from '../Const';

export interface ResultData {
  code: number;
  message: string;
  data: object | any[];
}

function Toast(res: AxiosResponse<ResultData>) {
  // console.log('res', res);
  const {
    data: { code, message },
  } = res;
  switch (code) {
    case REQUEST_FAIL_TOAST:
    case REQUEST_FAIL_ALERT:
      // Toast.show(message);
      break;
    default:
      break;
  }
}

export default Toast;
