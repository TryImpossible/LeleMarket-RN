import React from 'react';
import { StyleSheet, View, Image, Text, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface NoNetworkViewProps {
  style?: ViewStyle;
}

const NoNetworkView: React.FC<NoNetworkViewProps> = ({ style }) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      <Image source={{}} />
      <Text>记录为空</Text>
    </View>
  );
};
export default NoNetworkView;
