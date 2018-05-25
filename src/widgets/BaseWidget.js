import React from 'react';

import { View } from 'react-native';

import BaseComponent from '../containers/BaseComponent';

export default class BaseWidget extends BaseComponent {

  /**
   * 1.内部使用的方法名均以_(下划线)开头的驼峰式命名，外部调用的均以普通驼峰式命名
   */



  /**
   * 獲取随机颜色，一般调试使用 
   */
  getRandomColor() {
    
    // return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6); //有坑
    // return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); //有坑 

    // let r = Math.floor(Math.random() * 256);
    // let g = Math.floor(Math.random() * 256);
    // let b = Math.floor(Math.random() * 256);
    // return `rgb(${r},${g},${b})`;

    //颜色字符串  
    var colorStr = "#";
    //字符串的每一字符的范围  
    var randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    //产生一个六位的字符串  
    for (var i = 0; i < 6; i++) {
      //15是范围上限，0是范围下限，两个函数保证产生出来的随机数是整数  
      colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
    }
    return colorStr;
  }
}
