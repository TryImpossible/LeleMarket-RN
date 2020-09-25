import React, { useRef, useEffect, useCallback } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  ViewStyle,
  EmitterSubscription,
  LayoutAnimationConfig,
  StyleProp,
  KeyboardEvent,
  Animated,
  UIManager,
} from 'react-native';

const styles = StyleSheet.create({
  keyboardSpacer: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

if (__ANDROID__ && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface KeyboardSpacerProps {
  style?: StyleProp<ViewStyle>;
  onToggle?: (isKeyboardOpened: boolean, keyboardSpace: number) => void;
}

const KeyboardSpacer: React.FC<KeyboardSpacerProps> = ({ style, onToggle }) => {
  const _listenersRef = useRef<EmitterSubscription[]>();
  const _pathValueRef = useRef(new Animated.Value(0)).current;

  const updateKeyboardSpace = useCallback(
    (event: KeyboardEvent) => {
      if (!event.endCoordinates) {
        return;
      }

      let animationConfig: LayoutAnimationConfig = defaultAnimation;
      if (__IOS__) {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);

      const keyboardSpace = __HEIGHT__ - event.endCoordinates.screenY;
      _pathValueRef.setValue(keyboardSpace);
      onToggle && onToggle(true, keyboardSpace);
    },
    [_pathValueRef, onToggle],
  );

  const resetKeyboardSpace = useCallback(
    (event: KeyboardEvent) => {
      let animationConfig: LayoutAnimationConfig = defaultAnimation;
      if (__IOS__) {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);
      _pathValueRef.setValue(0);
      onToggle && onToggle(false, 0);
    },
    [_pathValueRef, onToggle],
  );

  useEffect(() => {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    _listenersRef.current = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];
    return () => {
      _listenersRef.current?.forEach((listener) => listener.remove());
    };
  }, [resetKeyboardSpace, updateKeyboardSpace]);

  return <Animated.View style={[styles.keyboardSpacer, { height: _pathValueRef }, style]} />;
};

export default KeyboardSpacer;
