import React, { useState, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Animated, TouchableOpacity, StyleProp, ViewStyle, Easing } from 'react-native';

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface OverlayProps {
  style?: StyleProp<ViewStyle>;
  cancelable?: boolean;
}

export interface OverlayHandle {
  show: () => void;
  dismiss: () => void;
}

const Overlay: React.ForwardRefRenderFunction<OverlayHandle, OverlayProps> = (
  { children, style, cancelable = true },
  ref,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const valuePath = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        setVisible(true);
      },
      dismiss: () => setVisible(false),
    };
  });

  React.useEffect(() => {
    Animated.timing(valuePath, {
      toValue: visible ? 1 : 0,
      duration: 200,
      easing: visible ? Easing.in(Easing.cubic) : Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [valuePath, visible]);

  if (!visible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.mask,
        StyleSheet.flatten(style),
        {
          opacity: valuePath.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1] }),
          // transform: [
          //   {
          //     translateY: valuePath.interpolate({
          //       inputRange: [0, 0.5, 1],
          //       outputRange: [__HEIGHT__, __HEIGHT__, 0],
          //     }),
          //   },
          // ],
        },
      ]}
    >
      {cancelable && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
          }}
        />
      )}
      {children}
    </Animated.View>
  );
};

export default React.forwardRef(Overlay);
