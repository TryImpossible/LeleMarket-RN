import { AxiosResponse } from 'axios';
import { ResponseResult } from '@src/models/commonModel';
import { REQUEST_FAIL_TOAST, REQUEST_FAIL_ALERT } from '../Const';
import { Toast } from '@components';

function toast(res: AxiosResponse<ResponseResult<any>>) {
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
