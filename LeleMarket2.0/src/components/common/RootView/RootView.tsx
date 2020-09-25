import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Window, { WindowHandles } from '../Window';

const RootView: React.FC = ({ children }) => {
  global._windowRef = useRef<WindowHandles>(null);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {children}
      <Window ref={global._windowRef} />
    </View>
  );
};

export default RootView;
