import React from 'react';

import { View, Keyboard } from 'react-native';

import BaseComponent from '../containers/BaseComponent';

import BasicStyle from '../constants/BasicStyle';

import { NavigationActions } from 'react-navigation';

export default class BasePage extends BaseComponent {

  BasicStyle = BasicStyle;

  constructor(props) {
    super(props);
    this.initSubscriptions();
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.didBlurSubscription && this.didBlurSubscription.remove();
  }

  initSubscriptions() {
    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener( 'willFocus', payload => this.willFocus(payload));
    this.didFocusSubscription = navigation.addListener( 'didFocus', payload => this.didFocus(payload));
    this.willBlurSubscription = navigation.addListener( 'willBlur', payload => this.willBlur(payload));
    this.didBlurSubscription = navigation.addListener( 'didBlur', payload => this.didBlur(payload));
  }

  willFocus(payload) {

  }

  didFocus(payload) {

  }

  willBlur(payload) {
    Keyboard.dismiss();
  }

  didBlur(payload) {
    
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