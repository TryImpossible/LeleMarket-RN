import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { NavigationEvents, NavigationEventCallback } from 'react-navigation';
import LoadStateLayout, { LoadStateLayoutProps } from '../LoadStateLayout';

interface ScreenProps extends LoadStateLayoutProps {
  style?: StyleProp<ViewStyle>;
  onWillFocus?: NavigationEventCallback;
  onDidFocus?: NavigationEventCallback;
  onWillBlur?: NavigationEventCallback;
  onDidBlur?: NavigationEventCallback;
}

const ScreenLayout: React.FC<ScreenProps> = ({
  children,
  style,
  onWillFocus,
  onDidFocus,
  onWillBlur,
  onDidBlur,
  ...restProps
}) => {
  return (
    <View style={[Theme.ScreenLayout.style, style]}>
      <NavigationEvents
        onWillFocus={onWillFocus}
        onDidFocus={onDidFocus}
        onWillBlur={onWillBlur}
        onDidBlur={onDidBlur}
      />
      <LoadStateLayout {...restProps}>{children}</LoadStateLayout>
    </View>
  );
};

export default ScreenLayout;
