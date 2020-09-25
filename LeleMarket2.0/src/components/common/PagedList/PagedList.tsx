/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

import React from 'react';
import {
  FlatList,
  FlatListProps,
  SectionListProps,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import EmptyView, { EmptyViewProps } from '../EmptyView';
import Loader from '../LoadingView';
import FailureView from '../FailureView';
import LoadingView from './LoadingView';
import LoadFailView from './LoadFailView';
import LoadMoreView from './LoadMoreView';
import NoMoreDataView from './NoMoreDataView';

export type PullUpStatus = 'pending' | 'loading' | 'loadFail' | 'loadMore' | 'noMoreData' | 'loadCompleted';
export type PullDownStatus = 'pending' | 'refreshing' | 'emptyData' | 'refreshingFail' | 'refreshCompleted';

export interface PagedListProps {
  pullUpStatus?: PullUpStatus;
  pullDownStatus?: PullDownStatus;
  forwardRef?: React.RefObject<FlatList> | React.RefObject<SectionList>;
  emptyProps?: EmptyViewProps;
  renderEmpty?: () => React.ReactNode;
  onLoadMore?: () => void;
  onScrollUp?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollDown?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const PagedList = <P extends object>(WrapComponent: React.ComponentType<P>) => {
  function _buildProps(P: (FlatListProps<any> & PagedListProps) | (SectionListProps<any> & PagedListProps)) {
    let startScrollOffsetY = 0;
    let isScrollUp = false;

    const {
      forwardRef,
      contentContainerStyle,
      pullUpStatus = 'pending',
      pullDownStatus = 'refreshCompleted',
      onRefresh,
      onEndReachedThreshold = 0.2,
      keyExtractor = (_item, index) => String(index),
      initialNumToRender = 20,
      maxToRenderPerBatch = 6,
      showsVerticalScrollIndicator = false,
      emptyProps,
      renderEmpty,
      onLoadMore,
      onScrollBeginDrag,
      // onScrollEndDrag,
      // onMomentumScrollBegin,
      // onMomentumScrollEnd,
      onScroll,
      onScrollUp,
      onScrollDown,
      refreshing,
      onEndReached,
      ListEmptyComponent,
      ListFooterComponent,
      ...restPropsProps
    } = P;

    const props = {};
    Object.assign(props, {
      ref: forwardRef,
      contentContainerStyle: [contentContainerStyle, { flexGrow: 1 }],
      refreshing: pullDownStatus === 'refreshing',
      onRefresh: () => {
        // console.log('onRefresh-status', status)
        if (pullDownStatus === 'refreshing' || pullUpStatus === 'loading') {
          return;
        }
        isScrollUp = false;
        onRefresh && onRefresh();
      },
      onEndReachedThreshold,
      onEndReached: () => {
        // console.log('onEndReached-status', pullUpStatus);
        if (isScrollUp && pullDownStatus === 'refreshCompleted' && pullUpStatus === 'loadMore') {
          isScrollUp = false;
          onLoadMore && onLoadMore();
        }
      },
      ListEmptyComponent: () => {
        if (pullDownStatus === 'pending') {
          return <Loader />;
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
      maxToRenderPerBatch: maxToRenderPerBatch,
      showsVerticalScrollIndicator,
      onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        startScrollOffsetY = event.nativeEvent.contentOffset.y;
        // console.warn('onScrollBeginDrag', startScrollOffsetY);
        onScrollBeginDrag && onScrollBeginDrag(event);
      },
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
      onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {
          nativeEvent: {
            contentOffset: { y: offsetY },
          },
        } = event;
        // console.log(event.nativeEvent)
        // const offsetY = event.nativeEvent.contentOffset.y; // 滑动距离
        // const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView contentSize高度
        // const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
        // if (offsetY + oriageScrollHeight + 200 >= contentSizeHeight) {
        //   // todo:这里需加判断请求中
        //   console.log('上传滑动到底部事件');
        //   if (!loading && status === loadMore) {
        //     onEndReached && onEndReached();
        //   }
        // }

        if (startScrollOffsetY > offsetY) {
          onScrollDown && onScrollDown(event);
        } else if (startScrollOffsetY < offsetY) {
          onScrollUp && onScrollUp(event);
          isScrollUp = true;
        }
        onScroll && onScroll(event);
      },
      ...restPropsProps,
    });
    return props;
  }

  if (WrapComponent.name === 'FlatList') {
    class PagedFlatList extends React.PureComponent<P & FlatListProps<any> & PagedListProps> {
      render() {
        return <WrapComponent {...(_buildProps(this.props) as P)} />;
      }
    }
    // todo: forwardRef转发ref，这里多种情况使用时报ts错误，暂时没找到解决方案
    // return React.forwardRef<FlatList, P & FlatListProps<any> & PagedListProps>((props, ref) => (
    //   <PagedFlatList {...props} forwardRef={ref} />
    // ));
    return PagedFlatList;
  }

  if (WrapComponent.name === 'SectionList') {
    class PagedSectionList extends React.PureComponent<P & SectionListProps<any> & PagedListProps> {
      render() {
        return <WrapComponent {...(_buildProps(this.props) as P)} />;
      }
    }
    // return React.forwardRef<SectionList, P & SectionListProps<any> & PagedListProps>((props, ref) => (
    //   <PagedSectionList {...props} forwardRef={ref} />
    // ));
    return PagedSectionList;
  }

  return class extends React.PureComponent<P & PagedListProps> {
    render() {
      return <WrapComponent {...(this.props as P)} />;
    }
  };
};

export default PagedList;
