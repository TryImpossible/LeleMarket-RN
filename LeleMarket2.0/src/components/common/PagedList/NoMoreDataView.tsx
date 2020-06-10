import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  noMoreData: {
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

interface NoMoreDataViewProps {
  style?: StyleProp<ViewStyle>;
  prompt?: string;
  promptStyle?: StyleProp<TextStyle>;
}

const NoMoreDataView: React.FC<NoMoreDataViewProps> = ({ style, prompt = '没有更多数据了', promptStyle }) => {
  return (
    <View style={[styles.noMoreData, style]}>
      <Text style={[styles.prompt, promptStyle]}>{prompt}</Text>
    </View>
  );
};

export default NoMoreDataView;
