import { AxiosResponse } from 'axios';
import { ResponseResult } from '@src/models/commonModel';
import { REQUEST_FAIL_TOKEN_EXPIRE } from '../Const';
import { Toast } from '@components';

function tokenExpire(res: AxiosResponse<ResponseResult<any>>) {
  const {
    data: { code },
  } = res;
  if (code === REQUEST_FAIL_TOKEN_EXPIRE) {
    Toast.show('token was expired');
    // logout()
  }
}

export default tokenExpire;
