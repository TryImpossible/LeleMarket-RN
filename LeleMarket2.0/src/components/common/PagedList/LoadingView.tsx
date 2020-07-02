import React from 'react';
import { StyleSheet, View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  loading: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: toDP(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface LoadingViewProps {
  style?: StyleProp<ViewStyle>;
}

const LoadingView: React.FC<LoadingViewProps> = ({ style }) => {
  return (
    <View style={[styles.loading, style]}>
      <ActivityIndicator animating color={Colors.textLightColor} size="small" />
    </View>
  );
};

export default LoadingView;
