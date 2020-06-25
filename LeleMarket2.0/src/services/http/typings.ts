import { AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showLoader?: boolean;
  startTime?: number;
  endTime?: number;
}
