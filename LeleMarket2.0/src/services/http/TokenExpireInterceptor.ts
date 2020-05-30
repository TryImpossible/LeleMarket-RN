import { AxiosResponse } from 'axios';
import { REQUEST_FAIL_TOKEN_EXPIRE } from '../Const';
import { Toast } from 'components/common';

export interface ResultData {
  code: number;
  message: string;
  data: object | any[];
}

function tokenExpire(res: AxiosResponse<ResultData>) {
  const {
    data: { code },
  } = res;
  if (code === REQUEST_FAIL_TOKEN_EXPIRE) {
    Toast.show();
    // logout()
  }
}

export default tokenExpire;
