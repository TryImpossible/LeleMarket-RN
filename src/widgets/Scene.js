import React from 'react';

import { View, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import LoadingComponent from "../widgets/LoadingComponent";

import ErrorComponent from '../widgets/ErrorComponent';

import EmptyComponent from '../widgets/EmptyComponent';

import PropTypes from 'prop-types';

export default class Scene extends BaseWidget {

  static propTypes = {
    style: PropTypes.object, //样式
    retry: PropTypes.func,
  }

  static defaultProps = {
    style: { }, //默认样式为空
  }

  constructor(props) {
    super(props);
  }

  getInterpolate(index) {

  }

  render() {
    let { style, retry } = this.props;
    return (
      <View style={[styles.container, { ...style }]}>
        <LoadingComponent ref={ref => this.loading = ref} />
        <ErrorComponent ref={ref => this.error = ref} retry={retry} />
        <EmptyComponent ref={ref => this.empty = ref} />
      </View>
    );
  }

  /**
   * 显示Loading
   */
  showLoading() {
    this.loading && this.loading.show();
  }

  /**
   * 移除Loading
   */
  dismissLoading() {
    this.loading && this.loading.dismiss();
  }

  /**
   * 显示Error
   */
  showError() {
    this.error && this.error.show();
  }

  /**
   * 移除Error
   */
  dismissError() {
    this.error && this.error.dismiss();
  }

  /**
   * 显示Empty
   */
  showEmpty() {
    this.empty && this.empty.show();
  }

  /**
   * 移除Empty
   */
  dismissEmpty() {
    this.empty && this.empty.dismiss();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});