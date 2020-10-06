import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import NavBar from '../NavBar';

export interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
}

const Screen: React.FC<ScreenProps> = ({ children, style, title }) => {
  return (
    <View style={[Styles.ScreenLayout.style, style]}>
      {title && <NavBar title={title} />}
      {children}
    </View>
  );
};

export default Screen;
