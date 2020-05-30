import React from 'react';
import { StyleSheet, View, FlexStyle } from 'react-native';
import { NavigationEvents, NavigationEventsProps } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface ScreenProps extends NavigationEventsProps {
  style?: FlexStyle;
}

const ScreenLayout: React.FC<ScreenProps> = ({ children, style, ...restProps }) => {
  return (
    <View style={[styles.container, style]}>
      <NavigationEvents {...restProps} />
      {children}
    </View>
  );
};

export default ScreenLayout;
