import React, { useRef, isValidElement } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  // UIManager,
  findNodeHandle,
  // View,
} from 'react-native';
import KeyboardSpacer from '../KeyboardSpacer';

export interface KeyboardAvoidingScrollViewProps extends ScrollViewProps {}

const KeyboardAvoidingScrollView: React.FC<KeyboardAvoidingScrollViewProps> = ({ children, ...restProps }) => {
  const _scrollViewRef = useRef<ScrollView>(null);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const target = e.nativeEvent.target;
    // UIManager.measure(target, (x, y, width, height, pageX, pageY) => {
    //   console.log(
    //     'x=' + x + '--y=' + y + '--width=' + width + '--height=' + height + '--pageX=' + pageX + '--pageY=' + pageY,
    //   );
    //   height = height || 15;
    //   setTimeout(() => {
    //     _scrollViewRef.current?.scrollResponderScrollNativeHandleToKeyboard(findNodeHandle(target), height, true);
    //   }, 100);
    // });
    _scrollViewRef.current?.scrollResponderScrollNativeHandleToKeyboard(findNodeHandle(target), 0, true);
  };

  return (
    <ScrollView ref={_scrollViewRef} {...restProps} contentContainerStyle={{ backgroundColor: 'blue' }}>
      {__IOS__
        ? React.Children.map(children, (child) => {
            if (isValidElement(child)) {
              return React.cloneElement<TextInputProps>(child, {
                onFocus: (e) => {
                  onFocus(e);
                  // setTimeout(() => {
                  // _scrollViewRef.current?.scrollTo({ x: 0, y: 300, animated: true });
                  // }, 300);
                  // child.props.onFocus && child.props.onFocus(e);
                  // _scrollViewRef.current?.scrollResponderInputMeasureAndScrollToKeyboard(findNodeHandle(target), 0, true);
                },
              });
            }
            return child;
          })
        : children}
      {__IOS__ && <KeyboardSpacer />}
    </ScrollView>
  );
};

export default KeyboardAvoidingScrollView;
