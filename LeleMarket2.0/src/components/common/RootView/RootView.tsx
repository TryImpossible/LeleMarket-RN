import React, { useRef } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import Window, { WindowHandles } from '../Window';

const RootView: React.FC = ({ children }) => {
  global._windowRef = useRef<WindowHandles>(null);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
      {children}
      <Window ref={global._windowRef} />
    </View>
  );
};

export default RootView;
