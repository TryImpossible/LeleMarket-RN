'use strict';

import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import EmptyView, { EmptyViewProps } from '../EmptyView';
import Loader from '../Loader';
import FailureView from '../FailureView';
import LoadingView from './LoadingView';
import LoadFailView from './LoadFailView';
import LoadMoreView from './LoadMoreView';
import NoMoreDataView from './NoMoreDataView';

export type pullUpStatus = 'pending' | 'loading' | 'loadFail' | 'loadMore' | 'noMoreData' | 'loadCompleted';
export type PullDownStatus = 'pending' | 'refreshing' | 'emptyData' | 'refreshingFail' | 'refreshCompleted';

interface PagedFlatListProps<ItemT>
  extends Omit<FlatListProps<ItemT>, 'refreshing' | 'onEndReached' | 'ListEmptyComponent' | 'ListFooterComponent'> {
  pullUpStatus: pullUpStatus;
  pullDownStatus: PullDownStatus;
  getListRef?: React.RefObject<FlatList>;
  emptyProps?: EmptyViewProps;
  empty?: React.ReactNode;
  onLoadMore?: (() => void) | null;
}

class PagedFlatList<ItemT> extends React.PureComponent<PagedFlatListProps<ItemT>> {
  _buildProps() {
    const {
      getListRef,
      contentContainerStyle,
      data,
      pullUpStatus,
      pullDownStatus,
      onRefresh,
      onEndReachedThreshold = 0.2,
      keyExtractor = (item, index) => String(index),
      initialNumToRender = 20,
      showsVerticalScrollIndicator = false,
      onLoadMore,
      // onScrollBeginDrag,
      // onScrollEndDrag,
      // onMomentumScrollBegin,
      // onMomentumScrollEnd,
      ...restProps
    } = this.props;

    const props = {};
    Object.assign(props, {
      ref: getListRef,
      contentContainerStyle: [contentContainerStyle, { flexGrow: 1 }],
      data,
      renderItem: () => null,
      refreshing: pullDownStatus === 'refreshing',
      onRefresh: () => {
        // console.log('onRefresh-status', status)
        if (pullDownStatus === 'refreshing' || pullUpStatus === 'loading') {
          return;
        }
        onRefresh && onRefresh();
      },
      onEndReachedThreshold,
      onEndReached: ({ distanceFromEnd }: { distanceFromEnd: number }) => {
        // console.log('onEndReached-status', pullDownStatus);
        if (data && data.length > 0 && pullDownStatus === 'refreshCompleted' && pullUpStatus === 'loadMore') {
          onLoadMore && onLoadMore();
        }
      },
      ListEmptyComponent: () => {
        if (pullDownStatus === 'pending') {
          return <Loader visible />;
        }
        if (pullDownStatus === 'emptyData') {
          return <EmptyView />;
        }
        if (pullDownStatus === 'refreshingFail') {
          return <FailureView />;
        }
        return null;
      },
      ListFooterComponent: () => {
        if (pullUpStatus === 'loading') {
          return <LoadingView />;
        }
        if (pullUpStatus === 'loadFail') {
          return <LoadFailView onLoadMore={onLoadMore} />;
        }
        if (pullUpStatus === 'loadMore') {
          return <LoadMoreView />;
        }
        if (pullUpStatus === 'noMoreData') {
          return <NoMoreDataView />;
        }
        return null;
      },
      keyExtractor,
      initialNumToRender: initialNumToRender,
      showsVerticalScrollIndicator,
      // onScrollBeginDrag: () => {
      //   this.canAction = true
      //   onScrollBeginDrag && onScrollBeginDrag()
      // },
      // onScrollEndDrag: () => {
      //   this.canAction = false
      //   onScrollEndDrag && onScrollEndDrag()
      // },
      // onMomentumScrollBegin: () => {
      //   this.canAction = true
      //   onMomentumScrollBegin && onMomentumScrollBegin()
      // },
      // onMomentumScrollEnd: () => {
      //   this.canAction = false
      //   onMomentumScrollEnd && onMomentumScrollEnd()
      // },
      // onContentSizeChange: (contentWidth, contentHeight) => {
      //   console.log(contentHeight)
      //   this.contentHeight = contentHeight
      // },
      // onScroll: (event) => {
      //   const {
      //     nativeEvent: {
      //       contentOffset: { y },
      //     },
      //   } = event
      //   // console.log(event.nativeEvent)
      //   const offsetY = event.nativeEvent.contentOffset.y // 滑动距离
      //   const contentSizeHeight = event.nativeEvent.contentSize.height // scrollView contentSize高度
      //   const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height // scrollView高度
      //   if (offsetY + oriageScrollHeight + 200 >= contentSizeHeight) {
      //     // todo:这里需加判断请求中
      //     console.log('上传滑动到底部事件')
      //     if (!loading && status === loadMore) {
      //       onEndReached && onEndReached()
      //     }
      //   }
      // },
      ...restProps,
    });
    return props;
  }

  render() {
    const { data, renderItem } = this.props;
    return <FlatList {...this._buildProps()} data={data} renderItem={renderItem} />;
  }
}

PagedFlatList.name = 'FlatList';

export default PagedFlatList;
