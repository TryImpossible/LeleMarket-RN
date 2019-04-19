import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const __IOS__ = Platform.OS === 'ios';

const __ANDROID__ = Platform.OS === 'android';

const __IPHONEX__ = !!(__IOS__ && !Platform.isPad && !Platform.isTVOS && height === 812 && width === 375);

/**
 * 原生JS实现深拷贝
 * @param {*} obj
 */
// const deepCopy = obj => {
//   let str;
//   let newObj = obj.constructor === Array ? [] : {};
//   if (typeof obj !== 'object') {
//     return;
//   }
//   if (global.JSON) {
//     str = JSON.stringify(obj); // 系列化对象
//     newObj = JSON.parse(str); // 还原
//   } else {
//     for (const i in obj) {
//       newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
//     }
//   }
//   return newObj;
// };

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6
 
 以IPhone6为基准
 若以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可
*/
const defaultWidth = 375;
const defalutHeight = 667;

const scaleWidthRatio = width / defaultWidth;
const scaleHeightRatio = height / defalutHeight;

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
const getWidthSize = size => {
  // 边框、分割线或者小于1像素，直接取设备最小宽度
  if (size <= 1 && size > 0) {
    return StyleSheet.hairlineWidth;
  }
  return Math.round(size * scaleWidthRatio);
};

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
const getHeightSize = size => {
  // 边框、分割线或者小于1像素，直接取设备最小宽度
  if (size <= 1 && size > 0) {
    return StyleSheet.hairlineWidth;
  }
  return Math.round(size * scaleHeightRatio);
};

const fontScale = PixelRatio.getFontScale();
/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp ,会随系统缩放比例改变，如不需要请去掉 * fontScale
 */
const getFontSize = size => {
  const scale = Math.min(scaleWidthRatio, scaleHeightRatio);
  return size * scale * fontScale;
};

export { __IOS__, __ANDROID__, __IPHONEX__, getWidthSize as getSize, getWidthSize, getHeightSize, getFontSize };
export * from './DateUtil';
