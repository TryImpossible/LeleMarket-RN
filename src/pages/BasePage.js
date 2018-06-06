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

}