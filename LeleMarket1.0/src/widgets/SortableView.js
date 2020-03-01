
import React from 'react';

import { View, Animated, Image, Easing, LayoutAnimation, PanResponder, ViewPropTypes, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

export default class SortableView extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //樣式
    onDragStart: PropTypes.func, //開始拖拽
    onDragEnd: PropTypes.func //結束拖拽
  }

  static defaultProps = {
    onDragStart: () => { },
    onDragEnd: ({ oldIndex, newIndex }) => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      children: this._cloneChildren(props),
      shadowChild: undefined,
    }
    // this.path = new Animated.Value(0);
  }

  componentDidMount() {

  }

  render() {
    const { children, shadowChild } = this.props;
    return (
      <Animated.View>
        {children}
        {shadowChild}
      </Animated.View>
    )

    // const a = this.path.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    // const b = this.path.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

    // return (
    //   <View>
    //     <Animated.View onStartShouldSetResponder={() => true} onResponderGrant={() => this._onPress()} style={{ width: 50, height: 50, backgroundColor: 'green', opacity: a }} />
    //     <Animated.View onStartShouldSetResponder={() => true} onResponderGrant={() => this._onPress()} style={{ position: 'absolute', width: 50, height: 50, backgroundColor: 'red', opacity: b }} />
    //   </View>
    // )
  }

  // _onPress() {
  //   console.log(Math.round(this.path._value));
  //   Animated.timing(this.path, {
  //     toValue: Math.round(this.path._value) === 1 ? 0 : 1,
  //     duration: 200,
  //     easing: Easing.linear
  //   }
  //   ).start();
  // }

  renderDraggableView() {
    return null;
  }

  _cloneChildren(props) {
    const { children } = props;
    let filterChildren = [];
    //1.過濾無效的child, null之類的
    //2.過濾不需要排序的child
    children.map((child, index) => {
      if (React.isValidElement(child) && child.props.dragEnable) {
        filterChildren.push(
          React.cloneElement(child, {
            _index: index,
            _onSortableItemLayout: this._onSortableItemLayout,
            _onDragStart: this._onDragStart,
            _dragStartAnimation: this.props.dragStartAnimation, //向子組件仁慈拖拽時的動畫 
            _onDragRelease: this._onDragRelease,
            _onGrantSortableItem: this._onGrantSortableItem,
            _onGrantItemMove: this._onGrantItemMove,
            _onGrantItemRelease: this._onGrantItemRelease,
            _onGrantItemTerminate: this._onGrantItemTerminate,
          })
        )
      } else if (React.isValidElement(child) && !child.props.dragEnable) {
        filterChildren.push(
          React.cloneElement(child)
        )
      }
    });
    return filterChildren;
  }

}


class Item extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style,
    dragEnable: PropTypes.bool, //是否可拖拽
    onTap: PropTypes.func, //單擊事件
  }

  static defaultProps = {
    dragEnable: true, //默認true
    onTap: () => { },
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(1);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0

        this.touchDownTimeStamp = new Date().getTime(); //按下的時間戳

        this.timer = setTimeout(() => {
          this.path.setValue(1.2);
          Animated.timing(this.path, {
            toValue: 1.2,
            duration: 200,
            easing: Easing.ease
          }).start();
        }, 500);
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}

        // console.log(gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。5

        this.touchUpTimeStamp = new Date().getTime(); //鬆開的時間戳
        if (this.touchUpTimeStamp - this.touchDownTimeStamp <= 500) {
          this._clearTimer();
        } else {
          this.path.setValue(1);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }

  render() {
    const scale = this.path;
    const opacity = this.path.interpolate({
      inputRange: [1, 1.2],
      outputRange: [1, 0.8]
    });

    const { children } = this.props;
    console.log('item - children');
    return (
      <Animated.View
        style={{ transform: [{ scale }], opacity }}
        {...this._panResponder.panHandlers}
        onLayout={this._onLayout} >
        {children}
      </Animated.View>
    )
  }

  componentWillUnmount() {
    console.log('--- 銷燬組件 ---');
    this._clearTimer();
  }

  /**
   * 清除定時器
   */
  _clearTimer() {
    this.timer && clearTimeout(this.timer);
  }

  _onLayout(event) {
    console.log(event.nativeEvent);
  }
}

const styels = StyleSheet.create({
  container: {

  }
});

SortableView.Item = Item;
export { Item };