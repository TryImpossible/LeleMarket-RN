import React from 'react';
import { View, ViewStyle } from 'react-native';
import { NavigationEvents, NavigationEventsProps } from 'react-navigation';
import Theme from 'utilities/Theme';

interface ScreenProps extends NavigationEventsProps {
  style?: ViewStyle;
}

const ScreenLayout: React.FC<ScreenProps> = ({ children, style, ...restProps }) => {
  return (
    <View style={[Theme.ScreenLayout.style, style]}>
      <NavigationEvents {...restProps} />
      {children}
    </View>
  );
};

export default ScreenLayout;
