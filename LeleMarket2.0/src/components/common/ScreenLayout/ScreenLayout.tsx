import React from 'react';
import { View, FlexStyle } from 'react-native';
import { NavigationEvents, NavigationEventsProps } from 'react-navigation';
import Theme from 'utilities/Theme';

interface ScreenProps extends NavigationEventsProps {
  style?: FlexStyle;
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
