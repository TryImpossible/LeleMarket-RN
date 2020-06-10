/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

import React from 'react';
import { FlatList, FlatListProps, SectionListProps, SectionList } from 'react-native';
import EmptyView, { EmptyViewProps } from '../EmptyView';
import Loader from '../Loader';
import FailureView from '../FailureView';
import LoadingView from './LoadingView';
import LoadFailView from './LoadFailView';
import LoadMoreView from './LoadMoreView';
import NoMoreDataView from './NoMoreDataView';

export type PullUpStatus = 'pending' | 'loading' | 'loadFail' | 'loadMore' | 'noMoreData' | 'loadCompleted';
export type PullDownStatus = 'pending' | 'refreshing' | 'emptyData' | 'refreshingFail' | 'refreshCompleted';

interface PagedListProps {
  pullUpStatus: PullUpStatus;
  pullDownStatus: PullDownStatus;
  getListRef?: React.RefObject<FlatList> | React.RefObject<SectionList>;
  emptyProps?: EmptyViewProps;
  renderEmpty?: () => React.ReactNode;
  onLoadMore?: (() => void) | null;
}

const PagedList = <P extends object>(WrapComponent: React.ComponentType<P>) => {
  function _buildProps(P: (FlatListProps<any> & PagedListProps) | (SectionListProps<any> & PagedListProps)) {
    const {
      getListRef,
      contentContainerStyle,
      data = [],
      pullUpStatus,
      pullDownStatus,
      onRefresh,
      onEndReachedThreshold = 0.2,
      keyExtractor = (item, index) => String(index),
      initialNumToRender = 20,
      showsVerticalScrollIndicator = false,
      emptyProps,
      renderEmpty,
      onLoadMore,
      // onScrollBeginDrag,
      // onScrollEndDrag,
      // onMomentumScrollBegin,
      // onMomentumScrollEnd,
      refreshing,
      onEndReached,
      ListEmptyComponent,
      ListFooterComponent,
      ...restProps
    } = P;

    const props = {};
    Object.assign(props, {
      ref: getListRef,
      contentContainerStyle: [contentContainerStyle, { flexGrow: 1 }],
      data,
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
        // console.log('onEndReached-status', pullUpStatus);
        if (data && data.length > 0 && pullDownStatus === 'refreshCompleted' && pullUpStatus === 'loadMore') {
          onLoadMore && onLoadMore();
        }
      },
      ListEmptyComponent: () => {
        if (pullDownStatus === 'pending') {
          return <Loader visible />;
        }
        if (pullDownStatus === 'emptyData') {
          return (renderEmpty && renderEmpty()) || <EmptyView {...emptyProps} />;
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

  if (WrapComponent.name === 'SectionList') {
    return class extends React.PureComponent<P & SectionListProps<any> & PagedListProps> {
      render() {
        return <WrapComponent {...(_buildProps(this.props) as P)} />;
      }
    };
  }

  if (WrapComponent.name === 'FlatList') {
    return class extends React.PureComponent<P & FlatListProps<any> & PagedListProps> {
      render() {
        return <WrapComponent {...(_buildProps(this.props) as P)} />;
      }
    };
  }

  return class extends React.PureComponent<P & PagedListProps> {
    render() {
      return <WrapComponent {...(this.props as P)} />;
    }
  };
};

export default PagedList;
