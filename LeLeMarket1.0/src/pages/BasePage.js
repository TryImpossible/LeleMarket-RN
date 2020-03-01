import React from 'react';

import { View, Keyboard } from 'react-native';

import BaseComponent from '../containers/BaseComponent';

import BasicStyle from '../constants/BasicStyle';

import { NavigationActions } from 'react-navigation';

export default class BasePage extends BaseComponent {

  BasicStyle = BasicStyle;

  /* ---自定义Page生命周期---
   *  
   *  子类可重写
   * 
   */
  onStart() { } //Page开始创建
  onCreate() { } //Page创建完成
  onWillFocus() { } //Page即将出现
  onDidFocus() { } //Page出现 
  onWillBlur() { } //Page即将消失
  onDidBlur() { } //Page消失
  onDestroy() { } //Page销毁

  constructor(props) {
    super(props);
    console.log(this.props);
    this.initSubscriptions();
  }

  componentWillMount() {
    // console.log('componentWillMount');
    this.onStart();
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.onCreate();
  }

  componentDidCatch(error, info) {
    console.log('error', error);
    console.log('info', info);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.subscriptions && this.subscriptions.forEach((sub) => sub.remove());
    this.onDestroy();
  }

  initSubscriptions() {
    const { navigation } = this.props;
    this.subscriptions = [
      navigation.addListener( 'willFocus', payload => this.willFocus(payload)),
      navigation.addListener( 'didFocus', payload => this.didFocus(payload)),
      navigation.addListener( 'willBlur', payload => this.willBlur(payload)),
      navigation.addListener( 'didBlur', payload => this.didBlur(payload))
    ]
  }

  willFocus(payload) {
    // console.log('willFocus');
    this.onWillFocus();
  }

  didFocus(payload) { 
    // console.log('didFocus');
    this.onDidFocus();
  }

  willBlur(payload) {
    // console.log('willBlur');
    Keyboard.dismiss();
    this.onWillBlur();
  }

  didBlur(payload) {
    // console.log('didBlur');
    this.onDidBlur();
  }

  getProps() {
    const { navigation } = this.props;
    return navigation.state.params;
  }

  getPageName() {
    const { navigation } = this.props;
    return navigation.state.routeName;
  }

  push = (pageName, params = { }, actions) => {
    const { navigation } = this.props;
    navigation.push(pageName, params, actions);
  }

  replace = (pageName, params = { }, actions) => {
    const { navigation } = this.props;
    navigation.replace(pageName, params, actions);
  }

  pop = (n = 1, params = {}) => {
    const { navigation } = this.props;
    navigation.pop(n, params);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  popToTop = (params = {}) => {
    const { navigation } = this.props;
    navigation.popToTop(params);
  }

  reset() {
    
  }

  isFocused() {
    const { navigation } = this.props;
    navigation.isFocused();
  }

  showToast = (message, duration, position) => {
    const { showToast } = this.props;
    showToast && showToast(message, duration, position);
  }


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