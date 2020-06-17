import { AxiosResponse } from 'axios';
import { ResultData } from './Types';
import { REQUEST_FAIL_TOKEN_EXPIRE } from '../Const';
import { Toast } from 'components/common';

function tokenExpire(res: AxiosResponse<ResultData>) {
  const {
    data: { code },
  } = res;
  if (code === REQUEST_FAIL_TOKEN_EXPIRE) {
    Toast.show('token was expired');
    // logout()
  }
}

export default tokenExpire;
