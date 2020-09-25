import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import LoadingView, { LoadingViewProps } from '../LoadingView';
import EmptyView, { EmptyViewProps } from '../EmptyView';
import FailureView, { FailureViewProps } from '../FailureView';
import NoNetworkView, { NoNetworkViewProps } from '../NoNetworkView';

export type LoadStateType = 'none' | 'empty' | 'loading' | 'noNetwork' | 'failure';

export interface LoadStateLayoutProps {
  style?: StyleProp<ViewStyle>;
  state?: LoadStateType;
  emptyProps?: EmptyViewProps;
  empty?: React.ReactNode;
  loadingProps?: Omit<LoadingViewProps, 'visible'>;
  loading?: React.ReactNode;
  failurePorps?: FailureViewProps;
  failure?: React.ReactNode;
  noNetworkProps?: NoNetworkViewProps;
  noNetwork?: React.ReactNode;
}

const LoadStateLayout: React.FC<LoadStateLayoutProps> = ({
  children,
  style,
  state = 'none',
  emptyProps,
  empty,
  loadingProps,
  loading,
  failurePorps,
  failure,
  noNetworkProps,
  noNetwork,
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
      {state === 'empty' && (empty || <EmptyView {...emptyProps} />)}
      {state === 'loading' && (loading || <LoadingView visible {...loadingProps} />)}
      {state === 'failure' && (failure || <FailureView {...failurePorps} />)}
      {state === 'noNetwork' && (noNetwork || <NoNetworkView {...noNetworkProps} />)}
    </View>
  );
};

export default LoadStateLayout;
