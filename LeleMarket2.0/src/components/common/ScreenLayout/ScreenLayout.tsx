import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { NavigationEvents, NavigationEventCallback } from 'react-navigation';
import NavBar from '../NavBar';

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  onWillFocus?: NavigationEventCallback;
  onDidFocus?: NavigationEventCallback;
  onWillBlur?: NavigationEventCallback;
  onDidBlur?: NavigationEventCallback;
  title?: string;
}

const ScreenLayout: React.FC<ScreenProps> = ({
  children,
  style,
  onWillFocus,
  onDidFocus,
  onWillBlur,
  onDidBlur,
  title,
}) => {
  return (
    <View style={[Styles.ScreenLayout.style, style]}>
      <NavigationEvents
        onWillFocus={onWillFocus}
        onDidFocus={onDidFocus}
        onWillBlur={onWillBlur}
        onDidBlur={onDidBlur}
      />
      {title && <NavBar title={title} />}
      {children}
    </View>
  );
};

export default ScreenLayout;
