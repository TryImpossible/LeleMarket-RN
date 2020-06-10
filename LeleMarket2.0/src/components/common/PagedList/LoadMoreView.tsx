import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  loadMore: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: _toDP(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    fontSize: Theme.Dimens.textNormalSize,
    color: Theme.Colors.textNormalColor,
    textAlign: 'center',
  },
});

interface LoadMoreViewProps {
  style?: StyleProp<ViewStyle>;
  prompt?: string;
  promptStyle?: StyleProp<TextStyle>;
}

const LoadMoreView: React.FC<LoadMoreViewProps> = ({ style, prompt = '上拉加载更多', promptStyle }) => {
  return (
    <View style={[styles.loadMore, style]}>
      <Text style={[styles.prompt, promptStyle]}>{prompt}</Text>
    </View>
  );
};

export default LoadMoreView;
