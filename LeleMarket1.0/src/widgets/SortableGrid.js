import React from 'react';

import {
  View,
  Animated,
  Image,
  Easing,
  LayoutAnimation,
  PanResponder,
  ViewPropTypes,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

export default class SortableGrid extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //樣式
    onDragStart: PropTypes.func, //開始拖拽
    onDragRelease: PropTypes.func //結束拖拽
  }

  static defaultProps = {
    onDragStart: () => { },
    onDragRelease: ({ oldIndex, newIndex }) => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      children: this._cloneChildren(props),
      floatChildren: undefined
    }
  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <Animated.View {...this.props}>
        {[...this.state.children]}
      </Animated.View>
    )
  }

  _cloneChildren(props) {
    const children = Array.isArray(props.children) ? props.children : props.children ? [props.children] : [];
    let filterChildren = [];
    //1.過濾無效的children, null, undefined之類的
    //2.過濾不需要排序的child
    children.map((child, index) => {
      if (React.isValidElement(child) && child.props.enableDrag === true) {
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
      } else if (React.isValidElement(child) && child.props.dragEnable === false) {
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
    style: ViewPropTypes.style, //樣式
    onLayout: PropTypes.func,
    panHandlers: PropTypes.object,
    onTap: PropTypes.func,
    onLongTap: PropTypes.func,
    onDoubleTap: PropTypes.func,
    enableDrag: PropTypes.bool,
  }

  static defaultProps = {
    enableDrag: true, //默認，開啟拖拽
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { style, onLayout, panHandlers, onTap, onLongTap, onDoubleTap, enableDrag } = this.props;
    if (enableDrag) {
      return (
        <Animated.View
          style={style}
          onLayout={onLayout}
          {...panHandlers} >
          <TouchableNativeFeedback
            style={{ flex: 1, justifyContent: 'center' }}
            delayLongPress={500}
            onPress={onTap}
            onLongPress={onLongTap}>
            {this.props.children}
          </TouchableNativeFeedback>
        </Animated.View>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ ...this.props.style }}
          activeOpacity={0.9}
          onPress={onTap} >
          {this.props.children}
        </TouchableOpacity>
      )
    }
  }
}

SortableGrid.Item = Item;
export { Item };