import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  loadFail: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: toDP(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    fontSize: Dimens.textNormalSize,
    color: Colors.textNormalColor,
    textAlign: 'center',
  },
});

interface LoadFailViewProps {
  style?: StyleProp<ViewStyle>;
  prompt?: string;
  promptStyle?: StyleProp<TextStyle>;
  onLoadMore?: () => void;
}

const LoadFailView: React.FC<LoadFailViewProps> = ({
  style,
  prompt = '加载失败，点击加载更多',
  promptStyle,
  onLoadMore,
}) => {
  return (
    <TouchableOpacity style={[styles.loadFail, style]} activeOpacity={1} onPress={onLoadMore}>
      <Text style={[styles.prompt, promptStyle]}>{prompt}</Text>
    </TouchableOpacity>
  );
};

export default LoadFailView;
