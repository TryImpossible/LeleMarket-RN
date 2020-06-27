export interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
}
