import React from 'react';
import { StyleSheet, View, Image, Text, ViewStyle } from 'react-native';
import Theme from 'utilities/Theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface FailureViewProps {
  style?: ViewStyle;
}

const FailureView: React.FC<FailureViewProps> = ({ style }) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      <Image source={{}} />
      <Text>记录为空</Text>
    </View>
  );
};
export default FailureView;
