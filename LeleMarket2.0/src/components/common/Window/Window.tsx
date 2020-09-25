import React, { useState, useImperativeHandle, useRef, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Alert, { AlertHandles } from '../Alert';
import Loader, { LoaderHandles } from '../Loader';
import AlbumView, { AlbumViewHandles } from '../AlbumView';

export interface WindowHandles {
  isVisible: () => boolean;
  show: (view?: React.ReactNode, callback?: Function) => void;
  dismiss: (callback?: Function) => void;
}

const Window: React.ForwardRefRenderFunction<WindowHandles, {}> = (_props, ref) => {
  // 初始化全局Alert
  global.Alert = useRef<AlertHandles>(null);
  // 初始化全局Loader
  global.Loader = useRef<LoaderHandles>(null);
  // 初始化全局AlbumView
  global.AlbumView = useRef<AlbumViewHandles>(null);

  const [overlay, setOverlay] = useState<ReactNode>(null);
  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(
    ref,
    () => ({
      isVisible: () => !!overlay,
      show: (view, callback) => {
        setOverlay(view);
        callback && callback();
      },
      dismiss: (callback) => {
        setOverlay(null);
        callback && callback();
      },
    }),
    [overlay],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {overlay}
      <AlbumView ref={global.AlbumView} />
      <Alert ref={global.Alert} />
      <Loader ref={global.Loader} />
    </View>
  );
};

export default React.forwardRef(Window);
