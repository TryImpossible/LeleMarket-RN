import React from 'react';

import { FlatList, ActivityIndicator, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import Svg, { LinearGradient, Defs, Stop, Rect } from "react-native-svg";

import PropTypes from 'prop-types';

export default class AutoLoadMoreList extends BaseWidget {

  static propTypes = {
    getRef: PropTypes.func, //FlatList实例，由于 ref 不能作为Props, 采用 getRef 代替
    status: PropTypes.oneOf(['PENDING', 'LOADING', 'LOADMORE', 'FINISH', 'NOMOREDATA', 'NODATA']), //状态
    LoadingComponent: PropTypes.element, //加载中 -> 展示组件
    LoadingMoreComponent: PropTypes.element, //加载更多 -> 展示组件
    NoMoreDataComponent: PropTypes.element //没有数据 -> 展示组件
  }

  static defaultProps = {
    status: 'PENDING'
  }

  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status && nextProps.status !== this.state.status) {
      this.setState({
        status: nextProps.status
      });
    }
  }

  render() {
    let { getRef, refreshing = false, LoadingComponent, LoadingMoreComponent, NoMoreDataComponent,
      NoDataComponent, ListFooterComponent, onEndReached, ...otherProps } = this.props;
    let { status } = this.state;
    return (
      <FlatList
        ref={ref => getRef && getRef(ref)}
        {...otherProps}
        refreshing={refreshing}
        ListFooterComponent={() => {
          if (status === 'PENDING') { //等待加载
            return null;
          } else if (status === 'LOADING') { //加载中
            return LoadingComponent || <LoadingView />;
          } else if (status === 'LOADMORE') { //加载失败后，手动进行加载
            return LoadingMoreComponent || <LoadingMoreView onPress={onEndReached} />;
          } else if (status === 'FINISH') { //加载完成
            return null;
          } else if (status === 'NOMOREDATA') { //没有更多数据
            return NoMoreDataComponent || <NoMoreDataView />;
          } else if (status === 'NODATA') { //没有数据 
            return NoDataComponent || <NoDataView />;
          }
        }}
        onEndReached={({ distanceFromEnd }) => {
          // distanceFromEnd > 0, 尽量保证是下拉加载 
          // !refreshing, 保证上拉刷新已经完成
          // 'PENDING' 'FINISH' 保证下拉加载不会超频
          if ((status === 'PENDING' || status === 'FINISH') && distanceFromEnd > 0 && !refreshing) onEndReached && onEndReached();
        }} />
    )
  }
}

const LoadingView = (props) => {
  return (
    <View style={styles.listFooterView}>
      <ActivityIndicator animating={true} color={'#333333'} size={'small'} />
    </View>
  )
}

const LoadingMoreView = (props) => {
  let { onPress } = props;
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress} style={styles.listFooterView}>
      <Text style={styles.listFooterText}>{`点击加载更多`}</Text>
    </TouchableOpacity>
  )
}

const LinearGradientLine = (props) => {
  return (
    <Svg width={getSize(60)} height={Const.LINE_WIDTH} >
      <Defs >
        <LinearGradient id='line' x1="0" y1="0" x2="60" y2="0">
          <Stop offset="0.2" stopColor='#d9d9d9' stopOpacity="0.2" />
          <Stop offset="0.4" stopColor='#d9d9d9' stopOpacity="0.4" />
          <Stop offset="0.6" stopColor='#d9d9d9' stopOpacity="0.6" />
          <Stop offset="0.8" stopColor='#d9d9d9' stopOpacity="0.8" />
          <Stop offset="1" stopColor='#d9d9d9' stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x='0' y='0' width={getSize(60)} height={Const.LINE_WIDTH} fill='url(#line)' />
    </Svg>
  )
}

const LinearGradientLine2 = (props) => {
  return (
    <Svg width={getSize(60)} height={Const.LINE_WIDTH} >
      <Defs >
        <LinearGradient id='line' x1="60" y1="0" x2="0" y2="0">
          <Stop offset="0.2" stopColor='#d9d9d9' stopOpacity="0.2" />
          <Stop offset="0.4" stopColor='#d9d9d9' stopOpacity="0.4" />
          <Stop offset="0.6" stopColor='#d9d9d9' stopOpacity="0.6" />
          <Stop offset="0.8" stopColor='#d9d9d9' stopOpacity="0.8" />
          <Stop offset="1" stopColor='#d9d9d9' stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x='0' y='0' width={getSize(60)} height={Const.LINE_WIDTH} fill='url(#line)' />
    </Svg>
  )
}

const NoMoreDataView = (props) => {
  return (
    <View style={styles.listFooterView}>
      <LinearGradientLine />
      <Text style={[styles.listFooterText, { color: '#a7a5a5', marginHorizontal: getSize(3) }]}>{`到底啦`}</Text>
      <LinearGradientLine2 />
    </View>
  )
}

const NoDataView = (props) => {
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} style={styles.listFooterView}>
      <Text style={styles.listFooterText}>{`暂无数据`}</Text>
    </TouchableOpacity>
  )
}

const ListFooterComponent = (props) => {
  let { status } = props;

}

const styles = StyleSheet.create({
  listFooterView: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: getSize(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listFooterText: {
    fontSize: getSize(12),
    color: '#888888',
    textAlign: 'center'
  }
});