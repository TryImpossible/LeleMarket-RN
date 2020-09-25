import React, { useState, useImperativeHandle } from 'react';
import {} from 'react-native';
import LoadingView, { LoadingViewProps } from '../LoadingView';

export interface LoaderHandles {
  show: () => void;
  dismiss: () => void;
}

export interface LoaderProps extends Omit<LoadingViewProps, 'visible'> {}

const Loader: React.ForwardRefRenderFunction<LoaderHandles, LoaderProps> = (props, ref) => {
  const [visible, setVisible] = useState(false);
  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(
    ref,
    () => ({
      show: () => setVisible(true),
      dismiss: () => setVisible(false),
    }),
    [],
  );
  return <LoadingView visible={visible} {...props} />;
};

export default React.forwardRef(Loader);
