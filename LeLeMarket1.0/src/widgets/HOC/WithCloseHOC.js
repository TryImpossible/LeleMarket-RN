
import React from 'react';

import { View, Animated, Easing, StyleSheet, TextInput } from "react-native";

import BaseComponent from "../../containers/BaseComponent";

export default WrappedComponent => class WithCloseHOC extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
    this.path = new Animated.Value(0);
  }

  proc(wrappedComponentInstance) {
    wrappedComponentInstance.method();
  }

  /**
   * get WrappedComponent name
   * @param {} WrappedComponent 
   */
  getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    let props = {};
    if (this.getDisplayName(WrappedComponent) === 'TextInput') {
      props = Object.assign({}, this.props, { value: this.state.value, onChangeText: this._onChangeText });
    } else {
      props = Object.assign({}, this.props);
    }

    const right = this.path.interpolate({ inputRange: [0, 1], outputRange: [-getSize(12), 0] });
    const CloseIcon = (
      <Animated.View
        onStartShouldSetResponder={() => true}
        onResponderGrant={this._onClose}
        style={[styles.closeIcon, { marginRight: right, transform: [{ rotateZ: '45deg' }], opacity: this.path }]} >
        <View style={{ position: 'absolute', width: getSize(2), height: getSize(10), borderRadius: getSize(1), backgroundColor: '#fff' }} />
        <View style={{ position: 'absolute', width: getSize(10), height: getSize(2), borderRadius: getSize(1), backgroundColor: '#fff' }} />
      </Animated.View>
    );

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {CloseIcon}
      </View>
    )
  }

  /**
   * 輸入
   */
  _onChangeText = (value) => {
    this.setState({ value });
    if (value && value.trim().length > 0 && Math.round(this.path._value) === 0) {
      this.showCloseIcon();
    } else if (!value && Math.round(this.path._value) === 1) {
      this.dismissCloseIcon();
    }
    this.props.onChangeText && this.props.onChangeText(value);
  }

  /**
   * 获取焦点
   */
  _onFocus = () => {
    this.showCloseIcon();
    this.props.onFocus && this.props.onFocus();
  }

  /**
   * 關閉
   */
  _onClose = () => {
    this.setState({ value: '' });
    Animated.timing(this.path, {
      toValue: 0,
      easing: Easing.ease,
      duration: 50
    }).start();
    this.props.onClose && this.props.onClose();
  }

  /**
   * 顯示關閉按鈕
   */
  showCloseIcon() {
    Animated.spring(this.path, {
      toValue: 1,
      easing: Easing.ease,
      duration: 50
    }).start();
  }

  /**
   *  隱藏關閉按鈕
   */
  dismissCloseIcon() {
    Animated.spring(this.path, {
      toValue: 0,
      easing: Easing.ease,
      duration: 50
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  closeIcon: {
    width: getSize(16),
    height: getSize(16),
    borderRadius: getSize(8),
    backgroundColor: '#c2c3c3',
    justifyContent: 'center',
    alignItems: 'center',
  }
});