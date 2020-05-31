import React from 'react';
import { StyleSheet, View, Image, Text, ViewStyle } from 'react-native';
import Theme from 'utilities/Theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface EmptyViewProps {
  style?: ViewStyle;
}

const EmptyView: React.FC<EmptyViewProps> = ({ style }) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      <Image source={{}} />
      <Text>记录为空</Text>
    </View>
  );
};
export default EmptyView;
