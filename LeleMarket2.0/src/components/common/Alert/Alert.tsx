import React, { useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react';
import Overlay, { OverlayPopViewHandles } from '../Overlay';
import Layout from './Layout';

export interface AlertHandles {
  isVisible: () => boolean;
  show: (callback?: Function) => void;
  dismiss: (callback?: Function) => void;
  setTitle: (text: string) => AlertHandles;
  setContent: (content: string | React.ReactNode) => AlertHandles;
  setConfirmText: (text: string) => AlertHandles;
  setOnConfirmPress: (callback: Function) => AlertHandles;
  setCancelText: (text: string) => AlertHandles;
  setOnCancelPress: (callback: Function) => AlertHandles;
}

export interface AlertProps {
  title?: string;
  content?: string | React.ReactNode;
  confirmText?: string;
  onConfirmPress?: () => void;
  cancelText?: string;
  onCancelPress?: () => void;
}

const Alert: React.ForwardRefRenderFunction<AlertHandles, AlertProps> = (props, ref) => {
  const _timerRef = useRef<number>();
  const _overlayRef = useRef<OverlayPopViewHandles>(null);
  const [data, setData] = useState<AlertProps>(Object.assign({}, props));
  // 暴露方法给外部调用，类似于类组件的ref. 构造者模式
  useImperativeHandle(
    ref,
    function () {
      return {
        isVisible: () => (_overlayRef.current ? _overlayRef.current.isVisible() : false),
        show: () => {
          setData(Object.assign({}, data));
          _timerRef.current = setTimeout(_overlayRef.current?.show, 50);
        },
        dismiss: () => {
          _overlayRef.current?.dismiss();
        },
        setTitle: function (text) {
          Object.assign(data, { title: text });
          return this;
        },
        setContent: function (text) {
          Object.assign(data, { content: text });
          return this;
        },
        setConfirmText: function (text) {
          Object.assign(data, { confirmText: text });
          return this;
        },
        setOnConfirmPress: function (callback) {
          Object.assign(data, { onConfirmPress: callback });
          return this;
        },
        setCancelText: function (text) {
          Object.assign(data, { cancelText: text });
          return this;
        },
        setOnCancelPress: function (callback) {
          Object.assign(data, { onCancelPress: callback });
          _overlayRef.current?.dismiss();
          return this;
        },
      } as AlertHandles;
    },
    [data],
  );

  useEffect(() => {
    return () => {
      _timerRef.current && clearTimeout(_timerRef.current);
    };
  }, []);

  const {
    title = '提示',
    content = '内容',
    confirmText = '是',
    onConfirmPress,
    cancelText = '否',
    onCancelPress,
  } = data;

  // 取消
  const _onCancelPress = useCallback(() => {
    _overlayRef.current?.dismiss();
    onCancelPress && onCancelPress();
  }, [onCancelPress]);

  // 确认
  const _onConfirmPress = useCallback(() => {
    _overlayRef.current?.dismiss();
    onConfirmPress && onConfirmPress();
  }, [onConfirmPress]);

  return (
    <Overlay.PopView
      ref={_overlayRef}
      onDismissCompleted={() => {
        // 消失时，重置上次弹窗数据
        Object.assign(data, {
          title: '提示',
          content: '内容',
          confirmText: '是',
          onConfirmPress: null,
          cancelText: '否',
          onCancelPress: null,
        });
      }}
    >
      <Layout.Normal
        title={title}
        onClosePress={() => _overlayRef.current?.dismiss()}
        content={content}
        cancelText={cancelText}
        onCancelPress={_onCancelPress}
        confirmText={confirmText}
        onConfirmPress={_onConfirmPress}
      />
    </Overlay.PopView>
  );
};

export default React.forwardRef(Alert);
