import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  progressBar: {
    marginTop: toDP(20),
    borderColor: '#21CB9B',
    borderWidth: 1,
    borderRadius: toDP(10),
    overflow: 'hidden',
  },
});

export interface ProgressBarProps {
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  width: number;
  height: number;
  progress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  style,
  barStyle,
  width = toDP(190),
  height = toDP(16),
  progress = 0,
}) => {
  const pathValue = useRef(new Animated.Value(progress)).current;
  useEffect(() => {
    Animated.spring(pathValue, { toValue: progress * width, useNativeDriver: false }).start();
  }, [pathValue, progress, width]);

  return (
    <View style={[styles.progressBar, style, { width, height, overflow: 'hidden' }]}>
      <Animated.View
        style={[{ backgroundColor: '#21CB9B', borderRadius: toDP(10) }, barStyle, { width: pathValue, height: '100%' }]}
      />
    </View>
  );
};

export default ProgressBar;
