import { Dimensions, Platform, StatusBar, StyleSheet, PixelRatio } from 'react-native';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');

export const IS_IOS: boolean = Platform.OS === 'ios';
export const IS_ANDROID: boolean = Platform.OS === 'android';
export const IOS_IS_IPHONE_X: boolean = !!(IS_IOS && !Platform.isTV && height === 812 && width === 375);
export const IS_WEB = Platform.OS === 'web';

export const SCREEN_WIDTH: number = width;
export const SCREEN_HEIGHT: number = height;
export const STATUSBAR_HEIGHT: number = IS_ANDROID ? StatusBar.currentHeight || 24 : IOS_IS_IPHONE_X ? 44 : 20;
export const NAVBAR_HEIGHT: number = 44;
export const TABBAR_HEIGHT: number = 49;
export const SAFE_BOTTOM_HEIGHT: number = IOS_IS_IPHONE_X ? 34 : 0;
export const ONE_PX: number = (PixelRatio.get() === 3 ? 2 : 1) / PixelRatio.get();
export const SEPARATOR_SIZE: number = StyleSheet.hairlineWidth;

export const PRIMARY_COLOR = '#FFFFFF';

// HttpClient
export const REQUEST_BASE_URL: string = Config.API_URL;
export const REQUEST_KEY: string = '';
export const REQUEST_SUCCESS: number = 0;
export const REQUEST_FAIL: number = -1;
export const REQUEST_FAIL_TOAST: number = 1;
export const REQUEST_FAIL_ALERT: number = 2;
export const REQUEST_FAIL_TOKEN_EXPIRE: number = 3;
export const REQUEST_NETWORK_ERROR: string = 'request_network_error';
export const REQUEST_TIMEOUT_ERROR: string = 'request_timeout_error';
export const REQUEST_LOCAL_ERROR: string = 'request_local_error';
export const REQUEST_SERVER_ERROR: string = 'response_server_error';
export const REQUEST_DUPLICATED: string = 'Duplicated Request';
export const THIRD_PARTY_BASEURL: string[] = []; // 第三方服务
