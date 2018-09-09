
import { Platform, StatusBar, Dimensions, PixelRatio, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window');

/*         ---全局绑定---         */

// global.__DEV__ = false; //这是ReactNative定义的，不要轻易修改

global.__IOS__ = (Platform.OS === 'ios' ? true : false);

global.__ANDROID__ = (Platform.OS === 'android' ? true : false);

global.__IPhoneX__ = (__IOS__ && !Platform.isPad && !Platform.isTVOS && height == 812 && width == 375) ? true : false;

/**
 * 将size转换成375下的值，屏幕适配
 * @param {*} size 
 */
global.getSize = (size) => {
  //当size <= 1，一般用于边框或者分割线，避免不足一个像素的情况。
  if (size <= 1 && size > 0) {
    return (PixelRatio.get() == 3 ? 2 : 1) / PixelRatio.get()
  } else {
    return parseInt(width * size / 375); 
  }
}

/**
 * 原生JS实现深拷贝
 * @param {*} obj 
 */
global.deepCopy = (obj) => {
  let str;
  let newObj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); //系列化对象
    newObj = JSON.parse(str); //还原
  } else {
    for (var i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
    }
  }
  return newObj;
}

//常量
global.Const = {

  HOST: 'https://api.51app.cn/diyMall/', //Api接口地址

  REQUEST_SUCCESS: 200, //网络请求成功

  MAIN_COLOR: '#F5F5F5', //页面主颜色

  STATUSBAR_COLOR: '#FFFFFF', //状态栏背景色

  NAVBAR_COLOR: '#FFFFFF', //导航栏背景色

  LINE_WIDTH: StyleSheet.hairlineWidth, //边框宽度

  LINE_COLOR: '#D6D6D6', //边框颜色

  ACTIVE_OPACITY: 0.6, //TouchableOpacity的透明渐变

  SCREEN_WIDTH: parseInt(width), //屏幕宽度

  SCREEN_HEIGHT: parseInt(height), //屏幕高度

  STATUSBAR_HEIGHT: __IOS__ ? (__IPhoneX__ ? getSize(44) : getSize(20)) : StatusBar.currentHeight, //状态栏高度

  NAVBAR_HEIGHT: getSize(44), //导航栏高度

  PAGE_WIDTH: parseInt(width), //页面宽度

  PAGE_HEIGHT: parseInt(height) - (__IOS__ ? (__IPhoneX__ ? getSize(44) : getSize(20)) : StatusBar.currentHeight) - getSize(44) - (__IPhoneX__ ? 34 : 0), //页面高度

}